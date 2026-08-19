import React from 'react';
import { ArrowRight, MessageCircle, ShieldCheck } from 'lucide-react';
import { getWhatsAppUrl } from '../utils/whatsapp';

export const FinalCTA: React.FC = () => {
  const scrollToForm = () => {
    const el = document.getElementById('formulario-cotacao');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="bg-[#020B06] text-white py-20 sm:py-28 relative overflow-hidden border-t border-emerald-950/80">
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[300px] bg-emerald-600/10 rounded-full blur-[130px]" />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white mb-5 leading-tight">
          Mais opções. Menos dúvida.
        </h2>

        <p className="text-base sm:text-lg text-emerald-100/75 max-w-xl mx-auto mb-9 leading-relaxed font-normal">
          Planos de saúde das principais operadoras, com orientação especializada para comparar e escolher melhor.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto mb-10">
          <button
            onClick={scrollToForm}
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-[#076633] hover:bg-[#098342] text-white font-extrabold text-sm tracking-wide shadow-xl shadow-emerald-950/60 transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Fazer cotação</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={scrollToForm}
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white/[0.07] hover:bg-white/[0.12] text-emerald-300 font-bold text-sm border border-emerald-500/30 shadow-lg transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2.5 cursor-pointer"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Falar no WhatsApp</span>
          </button>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-5 text-xs text-emerald-300/70">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            Cotação 100% gratuita
          </span>
          <span>•</span>
          <span>Sem compromisso</span>
          <span>•</span>
          <span>Atendimento em todo o Brasil</span>
        </div>
      </div>
    </section>
  );
};
