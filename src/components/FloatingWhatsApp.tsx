import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Send, ShieldCheck, ArrowRight, FileText } from 'lucide-react';
import { siteConfig } from '../config/siteConfig';
import { buildWhatsAppMessage } from '../utils/whatsapp';

export const FloatingWhatsApp: React.FC = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  // Form State
  const [name, setName] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [cpfCnpj, setCpfCnpj] = useState('');
  const [city, setCity] = useState('');
  const [livesCount, setLivesCount] = useState('1 pessoa');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 1200);

    const handleScroll = () => {
      if (window.scrollY > 150) {
        setIsVisible(true);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  if (!isVisible) return null;

  // Phone formatting
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

  // CPF / CNPJ formatting
  const handleCpfCnpjChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, '').slice(0, 14);
    let formatted = raw;
    if (raw.length <= 11) {
      formatted = raw
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    } else {
      formatted = raw
        .replace(/^(\d{2})(\d)/, '$1.$2')
        .replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
        .replace(/\.(\d{3})(\d)/, '.$1/$2')
        .replace(/(\d{4})(\d)/, '$1-$2');
    }
    setCpfCnpj(formatted);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !whatsapp.trim() || !city.trim() || !cpfCnpj.trim()) {
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

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsOpen(false);
    }, 400);

    // Reliable navigation
    window.open(waUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end">
      
      {/* Modal / Popup Card requesting info before WhatsApp redirect */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.94 }}
            transition={{ duration: 0.25 }}
            className="w-[92vw] sm:w-[380px] max-w-[390px] mb-4 bg-white rounded-3xl shadow-2xl border border-gray-200/90 overflow-hidden text-[#06110C]"
          >
            {/* Header */}
            <div className="bg-[#020B06] text-white p-5 flex items-center justify-between border-b border-emerald-900/40">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#25D366] flex items-center justify-center text-white shrink-0 shadow-md">
                  <svg
                    viewBox="0 0 24 24"
                    className="w-6 h-6 fill-white"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.04 14.69 2 12.04 2M12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.15 12.04 20.15C10.56 20.15 9.11 19.76 7.85 19L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 15 3.8 13.47 3.8 11.91C3.81 7.37 7.5 3.67 12.05 3.67M8.53 7.33C8.37 7.33 8.1 7.39 7.87 7.64C7.65 7.89 7.02 8.48 7.02 9.68C7.02 10.88 7.89 12.04 8.01 12.2C8.13 12.37 9.71 14.81 12.14 15.86C14.16 16.73 14.57 16.56 15.02 16.52C15.46 16.47 16.45 15.93 16.66 15.35C16.86 14.77 16.86 14.27 16.8 14.17C16.74 14.07 16.58 14.01 16.34 13.89C16.1 13.77 14.92 13.19 14.7 13.11C14.48 13.03 14.32 12.99 14.16 13.23C13.99 13.47 13.52 14.02 13.38 14.18C13.23 14.35 13.09 14.37 12.85 14.25C12.61 14.13 11.83 13.87 10.91 13.05C10.19 12.41 9.7 11.62 9.56 11.38C9.42 11.14 9.54 11.01 9.67 10.89C9.78 10.78 9.92 10.6 10.04 10.45C10.16 10.31 10.2 10.21 10.28 10.05C10.36 9.89 10.32 9.74 10.26 9.62C10.2 9.5 9.72 8.33 9.52 7.85C9.33 7.38 9.13 7.44 8.97 7.43C8.83 7.43 8.67 7.33 8.53 7.33Z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-extrabold text-sm text-white">Atendimento Arkos</h4>
                  <p className="text-[11px] text-emerald-400 flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    Online • Resposta imediata
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-white p-1 rounded-lg transition-colors cursor-pointer"
                aria-label="Fechar formulário"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content & Form */}
            <div className="p-5">
              <p className="text-xs text-gray-600 mb-3.5">
                Informe os dados abaixo para direcionarmos seu comparativo ao especialista de plantão:
              </p>

              <form onSubmit={handleFormSubmit} className="space-y-3">
                {/* Nome */}
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-600 mb-1">
                    Nome Completo
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="Seu nome"
                    className="w-full h-10 px-3 rounded-xl bg-gray-50 border border-gray-200 text-xs text-gray-900 placeholder:text-gray-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600 transition-all"
                  />
                </div>

                {/* WhatsApp */}
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-600 mb-1">
                    WhatsApp
                  </label>
                  <input
                    type="tel"
                    required
                    value={whatsapp}
                    onChange={handlePhoneChange}
                    placeholder="(11) 99999-9999"
                    className="w-full h-10 px-3 rounded-xl bg-gray-50 border border-gray-200 text-xs text-gray-900 placeholder:text-gray-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600 transition-all"
                  />
                </div>

                {/* CPF ou CNPJ */}
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-600 mb-1">
                    CPF ou CNPJ
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      value={cpfCnpj}
                      onChange={handleCpfCnpjChange}
                      placeholder="000.000.000-00 ou CNPJ"
                      className="w-full h-10 px-3 pr-8 rounded-xl bg-gray-50 border border-gray-200 text-xs text-gray-900 placeholder:text-gray-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600 transition-all font-mono"
                    />
                    <FileText className="w-3.5 h-3.5 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>

                {/* Grid: Cidade + Vidas */}
                <div className="grid grid-cols-2 gap-2.5">
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-600 mb-1">
                      Cidade / UF
                    </label>
                    <input
                      type="text"
                      required
                      value={city}
                      onChange={e => setCity(e.target.value)}
                      placeholder="Ex: Itatiba, SP"
                      className="w-full h-10 px-3 rounded-xl bg-gray-50 border border-gray-200 text-xs text-gray-900 placeholder:text-gray-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-600 mb-1">
                      Vidas
                    </label>
                    <select
                      value={livesCount}
                      onChange={e => setLivesCount(e.target.value)}
                      className="w-full h-10 px-2.5 rounded-xl bg-gray-50 border border-gray-200 text-xs text-gray-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600 transition-all font-medium"
                    >
                      <option value="1 pessoa">1 pessoa</option>
                      <option value="2 pessoas">2 pessoas</option>
                      <option value="3 a 5 vidas">3 a 5 vidas</option>
                      <option value="6 a 29 vidas">6 a 29 vidas</option>
                      <option value="30+ vidas">30+ vidas</option>
                    </select>
                  </div>
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-11 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] active:scale-[0.99] text-white font-extrabold text-xs tracking-wide shadow-md shadow-emerald-950/20 flex items-center justify-center gap-2 transition-all cursor-pointer mt-2"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Iniciar conversa no WhatsApp</span>
                </button>

                <p className="text-[10px] text-center text-gray-400 pt-0.5">
                  Atendimento seguro com número oficial Arkos (+55 11 93953-3606).
                </p>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Trigger Button */}
      <motion.button
        type="button"
        onClick={() => setIsOpen(prev => !prev)}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        className="w-14 h-14 sm:w-15 sm:h-15 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white flex items-center justify-center shadow-2xl shadow-emerald-950/80 transition-all relative focus:outline-none ring-4 ring-emerald-500/25 cursor-pointer"
        aria-label="Falar com a Arkos pelo WhatsApp"
        title="Falar com a Arkos pelo WhatsApp"
      >
        {isOpen ? (
          <X className="w-7 h-7 text-white" />
        ) : (
          <>
            {/* Official WhatsApp SVG Icon */}
            <svg
              viewBox="0 0 24 24"
              className="w-8 h-8 fill-white"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.04 14.69 2 12.04 2M12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.15 12.04 20.15C10.56 20.15 9.11 19.76 7.85 19L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 15 3.8 13.47 3.8 11.91C3.81 7.37 7.5 3.67 12.05 3.67M8.53 7.33C8.37 7.33 8.1 7.39 7.87 7.64C7.65 7.89 7.02 8.48 7.02 9.68C7.02 10.88 7.89 12.04 8.01 12.2C8.13 12.37 9.71 14.81 12.14 15.86C14.16 16.73 14.57 16.56 15.02 16.52C15.46 16.47 16.45 15.93 16.66 15.35C16.86 14.77 16.86 14.27 16.8 14.17C16.74 14.07 16.58 14.01 16.34 13.89C16.1 13.77 14.92 13.19 14.7 13.11C14.48 13.03 14.32 12.99 14.16 13.23C13.99 13.47 13.52 14.02 13.38 14.18C13.23 14.35 13.09 14.37 12.85 14.25C12.61 14.13 11.83 13.87 10.91 13.05C10.19 12.41 9.7 11.62 9.56 11.38C9.42 11.14 9.54 11.01 9.67 10.89C9.78 10.78 9.92 10.6 10.04 10.45C10.16 10.31 10.2 10.21 10.28 10.05C10.36 9.89 10.32 9.74 10.26 9.62C10.2 9.5 9.72 8.33 9.52 7.85C9.33 7.38 9.13 7.44 8.97 7.43C8.83 7.43 8.67 7.33 8.53 7.33Z" />
            </svg>
            <span className="absolute top-0.5 right-0.5 w-3.5 h-3.5 bg-emerald-200 rounded-full border-2 border-[#031B10] animate-pulse" />
          </>
        )}
      </motion.button>
    </div>
  );
};
