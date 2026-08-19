import React, { useState } from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, ShieldCheck, ArrowRight, FileText } from 'lucide-react';
import { siteConfig } from '../config/siteConfig';
import { buildWhatsAppMessage } from '../utils/whatsapp';

interface CompactQuoteFormProps {
  className?: string;
  onSuccess?: () => void;
}

export const CompactQuoteForm: React.FC<CompactQuoteFormProps> = ({
  className = '',
  onSuccess,
}) => {
  const [name, setName] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [cpfCnpj, setCpfCnpj] = useState('');
  const [city, setCity] = useState('');
  const [livesCount, setLivesCount] = useState('1 pessoa');
  const [lgpdAccepted, setLgpdAccepted] = useState(true);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Phone mask (XX) XXXXX-XXXX
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, '').slice(0, 11);
    let formatted = raw;
    if (raw.length > 2 && raw.length <= 7) {
      formatted = `(${raw.slice(0, 2)}) ${raw.slice(2)}`;
    } else if (raw.length > 7) {
      formatted = `(${raw.slice(0, 2)}) ${raw.slice(2, 7)}-${raw.slice(7)}`;
    }
    setWhatsapp(formatted);
  };

  // CPF / CNPJ mask (auto detects 11 vs 14 digits)
  const handleCpfCnpjChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, '').slice(0, 14);
    let formatted = raw;
    if (raw.length <= 11) {
      // CPF format: 000.000.000-00
      formatted = raw
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    } else {
      // CNPJ format: 00.000.000/0001-00
      formatted = raw
        .replace(/^(\d{2})(\d)/, '$1.$2')
        .replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
        .replace(/\.(\d{3})(\d)/, '.$1/$2')
        .replace(/(\d{4})(\d)/, '$1-$2');
    }
    setCpfCnpj(formatted);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !whatsapp.trim() || !city.trim() || !cpfCnpj.trim() || !lgpdAccepted) {
      return;
    }

    const message = buildWhatsAppMessage({
      name,
      whatsapp,
      cpfCnpj,
      city,
      livesCount,
    });

    const cleanPhone = siteConfig.whatsapp.replace(/\D/g, '');
    const waUrl = `https://api.whatsapp.com/send?phone=${cleanPhone}&text=${encodeURIComponent(message)}`;

    setIsSubmitted(true);
    if (onSuccess) onSuccess();

    // Trigger redirect reliably
    window.open(waUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div
      id="formulario-cotacao"
      className={`bg-white/95 backdrop-blur-md rounded-2xl p-6 sm:p-7 shadow-2xl shadow-black/40 border border-white/20 text-[#06110C] ${className}`}
    >
      <div className="mb-4">
        <div className="flex items-center justify-between gap-2 mb-1">
          <h3 className="text-xl sm:text-2xl font-black tracking-tight text-[#06110C]">
            Faça sua cotação
          </h3>
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-[11px] font-semibold">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            Gratuito
          </span>
        </div>
        <p className="text-xs text-gray-500">
          Receba um comparativo personalizado das operadoras.
        </p>
      </div>

      {isSubmitted ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="py-8 text-center space-y-4"
        >
          <div className="w-14 h-14 bg-emerald-100 text-[#076633] rounded-full flex items-center justify-center mx-auto shadow-inner">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <div>
            <h4 className="text-lg font-bold text-gray-900">Solicitação pronta no WhatsApp!</h4>
            <p className="text-xs text-gray-600 mt-1 max-w-xs mx-auto">
              Se a conversa não abriu automaticamente, clique no botão abaixo:
            </p>
          </div>
          <div className="pt-2">
            <a
              href={`https://api.whatsapp.com/send?phone=${siteConfig.whatsapp.replace(/\D/g, '')}&text=${encodeURIComponent(buildWhatsAppMessage({ name, whatsapp, cpfCnpj, city, livesCount }))}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#076633] hover:bg-[#098342] text-white text-xs font-bold shadow-md transition-all"
            >
              <span>Abrir WhatsApp</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
          <button
            type="button"
            onClick={() => setIsSubmitted(false)}
            className="block mx-auto text-xs font-semibold text-emerald-700 hover:text-emerald-900 underline pt-2 cursor-pointer"
          >
            Fazer outra cotação
          </button>
        </motion.div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-3.5">
          {/* Nome */}
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-700 mb-1">
              Nome Completo
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="Seu nome completo"
              className="w-full h-11 px-3.5 rounded-xl bg-gray-50/80 border border-gray-200 text-sm text-gray-900 placeholder:text-gray-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent transition-all"
            />
          </div>

          {/* WhatsApp */}
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-700 mb-1">
              WhatsApp
            </label>
            <input
              type="tel"
              required
              value={whatsapp}
              onChange={handlePhoneChange}
              placeholder="(11) 99999-9999"
              className="w-full h-11 px-3.5 rounded-xl bg-gray-50/80 border border-gray-200 text-sm text-gray-900 placeholder:text-gray-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent transition-all"
            />
          </div>

          {/* CPF ou CNPJ */}
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-700 mb-1 flex items-center justify-between">
              <span>CPF ou CNPJ</span>
              <span className="text-[10px] text-gray-400 font-normal lowercase">físico ou empresarial</span>
            </label>
            <div className="relative">
              <input
                type="text"
                required
                value={cpfCnpj}
                onChange={handleCpfCnpjChange}
                placeholder="000.000.000-00 ou CNPJ"
                className="w-full h-11 px-3.5 pr-10 rounded-xl bg-gray-50/80 border border-gray-200 text-sm text-gray-900 placeholder:text-gray-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent transition-all font-mono"
              />
              <FileText className="w-4 h-4 text-gray-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          {/* Grid: Cidade + Quantidade de Vidas */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-700 mb-1">
                Cidade / UF
              </label>
              <input
                type="text"
                required
                value={city}
                onChange={e => setCity(e.target.value)}
                placeholder="Ex: Itatiba, SP"
                className="w-full h-11 px-3.5 rounded-xl bg-gray-50/80 border border-gray-200 text-sm text-gray-900 placeholder:text-gray-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent transition-all"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-700 mb-1">
                Vidas
              </label>
              <select
                value={livesCount}
                onChange={e => setLivesCount(e.target.value)}
                className="w-full h-11 px-3 rounded-xl bg-gray-50/80 border border-gray-200 text-sm text-gray-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent transition-all font-medium"
              >
                <option value="1 pessoa">1 pessoa</option>
                <option value="2 pessoas">2 pessoas</option>
                <option value="3 a 5 vidas">3 a 5 vidas</option>
                <option value="6 a 29 vidas">6 a 29 vidas</option>
                <option value="30 a 99 vidas">30 a 99 vidas</option>
                <option value="100+ vidas">100+ vidas</option>
              </select>
            </div>
          </div>

          {/* LGPD */}
          <div className="flex items-start gap-2 pt-1">
            <input
              type="checkbox"
              id="lgpd"
              required
              checked={lgpdAccepted}
              onChange={e => setLgpdAccepted(e.target.checked)}
              className="mt-0.5 h-3.5 w-3.5 rounded text-[#076633] focus:ring-emerald-500 border-gray-300 cursor-pointer"
            />
            <label htmlFor="lgpd" className="text-[11px] text-gray-500 leading-tight cursor-pointer">
              Concordo com o contato para envio da cotação conforme política de privacidade.
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full h-12 rounded-xl bg-[#076633] hover:bg-[#098342] active:scale-[0.99] text-white font-extrabold text-sm tracking-wide shadow-lg shadow-emerald-900/30 flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <span>Solicitar cotação no WhatsApp</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          {/* Microcopy */}
          <p className="text-[11px] text-center text-gray-500 pt-1 leading-snug">
            A Arkos entra em contato com o comparativo detalhado das operadoras.
          </p>
        </form>
      )}
    </div>
  );
};
