import { QuoteFormData } from '../types';
import { siteConfig } from '../config/siteConfig';

export function buildWhatsAppMessage(data: {
  name: string;
  whatsapp?: string;
  cpfCnpj?: string;
  city: string;
  livesCount?: string;
}): string {
  const lines: string[] = [
    'Olá, equipe Arkos! Fiz uma solicitação pelo site.',
    '',
    `Nome: ${data.name.trim()}`,
  ];

  if (data.whatsapp) {
    lines.push(`WhatsApp: ${data.whatsapp.trim()}`);
  }

  if (data.cpfCnpj) {
    const cleanDigits = data.cpfCnpj.replace(/\D/g, '');
    const typeLabel = cleanDigits.length > 11 ? 'CNPJ' : 'CPF';
    lines.push(`${typeLabel}: ${data.cpfCnpj.trim()}`);
  }

  if (data.city) {
    lines.push(`Cidade: ${data.city.trim()}`);
  }

  if (data.livesCount) {
    lines.push(`Quantidade de vidas: ${data.livesCount}`);
  }

  lines.push('');
  lines.push('Gostaria de receber um comparativo das operadoras.');

  return lines.join('\n');
}

export function getWhatsAppUrl(customMessage?: string, phoneNumber?: string): string {
  const number = (phoneNumber || siteConfig.whatsapp || '5511939533606').replace(/\D/g, '');
  const message = customMessage || 'Olá! Vim pelo site da Arkos e gostaria de fazer uma cotação.';
  return `https://api.whatsapp.com/send?phone=${number}&text=${encodeURIComponent(message)}`;
}
