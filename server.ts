import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Health check endpoint
  app.get("/api/health", (_req, res) => {
    res.json({ 
      status: "ok", 
      service: "Arkos Benefícios API",
      timestamp: new Date().toISOString() 
    });
  });

  // Lead capture endpoint (Section 28)
  app.post("/api/lead", async (req, res) => {
    try {
      const leadData = req.body;
      console.log("[LEAD RECEIVED]", JSON.stringify(leadData, null, 2));

      const webhookUrl = process.env.LEAD_WEBHOOK_URL;
      if (webhookUrl && webhookUrl.trim() !== "") {
        try {
          const webhookRes = await fetch(webhookUrl, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(leadData),
          });
          console.log(`[WEBHOOK FORWARD] Status: ${webhookRes.status}`);
        } catch (webhookErr) {
          console.error("[WEBHOOK FORWARD ERROR]", webhookErr);
          // Do not fail the client request even if webhook fails
        }
      }

      res.status(200).json({
        success: true,
        message: "Lead registrado com sucesso.",
      });
    } catch (err) {
      console.error("[LEAD CAPTURE ERROR]", err);
      res.status(500).json({
        success: false,
        message: "Erro interno ao processar solicitação.",
      });
    }
  });

  // Vite middleware for dev / static serving in production
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Arkos Benefícios server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
