import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, HelpCircle, MessageCircle } from 'lucide-react';
import { FAQ_DATA } from '../data/faq';
import { getWhatsAppUrl } from '../utils/whatsapp';

export const FAQ: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>(FAQ_DATA[0].id);

  const toggleItem = (id: string) => {
    setOpenId(prev => (prev === id ? null : id));
  };

  return (
    <section id="duvidas" className="bg-white text-[#0A0A0A] py-20 sm:py-28 border-b border-gray-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-100 text-[#076633] text-xs font-bold tracking-widest uppercase mb-4">
            <HelpCircle className="w-3.5 h-3.5" />
            Tire Suas Dúvidas
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#06110C] mb-4">
            Perguntas Frequentes
          </h2>

          <p className="text-base text-gray-600">
            Respostas diretas sobre cotação, contratação e como a Arkos simplifica a sua escolha.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-3.5 mb-12">
          {FAQ_DATA.map((item) => {
            const isOpen = openId === item.id;
            return (
              <div
                key={item.id}
                className="border border-gray-200 rounded-2xl overflow-hidden transition-colors bg-[#F5F8F6]/50 hover:border-emerald-500/40"
              >
                <button
                  type="button"
                  onClick={() => toggleItem(item.id)}
                  aria-expanded={isOpen}
                  className="w-full text-left px-5 py-4 sm:py-5 flex items-center justify-between gap-4 font-bold text-base sm:text-lg text-[#06110C] focus:outline-none"
                >
                  <span>{item.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-emerald-700 shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180 text-emerald-600' : ''
                    }`}
                  />
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: 'easeInOut' }}
                    >
                      <div className="px-5 pb-5 pt-1 text-sm sm:text-base text-gray-600 leading-relaxed border-t border-gray-200/60 bg-white">
                        {item.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Still have questions helper box */}
        <div className="p-6 rounded-2xl bg-emerald-50/70 border border-emerald-200/80 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h4 className="font-bold text-[#06110C] text-base mb-1">
              Ainda tem alguma dúvida específica?
            </h4>
            <p className="text-xs sm:text-sm text-gray-600">
              Converse diretamente com nosso time consultivo pelo WhatsApp.
            </p>
          </div>

          <a
            href={getWhatsAppUrl('Olá! Gostaria de tirar uma dúvida sobre planos de saúde.')}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 rounded-xl bg-[#076633] hover:bg-[#0d8a47] text-white font-bold text-xs sm:text-sm shrink-0 flex items-center gap-2 shadow-sm transition-all"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Falar com especialista</span>
          </a>
        </div>

      </div>
    </section>
  );
};
