export const siteConfig = {
  name: "Arkos Benefícios",
  legalName: "Arkos Benefícios",
  slogan: "Assessoria especializada e cotação de planos de saúde.",
  // Primary contact information
  whatsapp: "5511939533606", // +55 11 93953-3606
  displayWhatsapp: "(11) 93953-3606",
  phone: "(11) 93953-3606",
  email: "comercial@arkosbeneficios.com.br",
  address: "Praxx Itatiba, Sala 1311 - Itatiba, SP",
  cnpj: "52.755.160/0001-44",
  instagram: "https://instagram.com/arkosbeneficios",
  linkedin: "https://linkedin.com/company/arkos-beneficios",
  workingHours: "Segunda a Sexta, das 08h30 às 18h",
};

// Generates Google Maps embed URL safely
export function getGoogleMapsEmbedUrl(address: string): string {
  if (!address || address.trim() === "") return "";
  return `https://www.google.com/maps?q=${encodeURIComponent(address)}&output=embed`;
}
