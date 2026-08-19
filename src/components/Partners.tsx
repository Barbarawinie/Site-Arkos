import React from 'react';
import { motion } from 'motion/react';
import { PARTNERS_DATA } from '../data/partners';
import { PartnerLogoBadge } from './PartnerLogos';
import { ShieldCheck, Award, ArrowUpRight } from 'lucide-react';

export const Partners: React.FC = () => {
  const scrollToForm = () => {
    const el = document.getElementById('formulario-cotacao');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="operadoras" className="bg-[#F8FAF9] text-[#06110C] py-20 sm:py-28 relative overflow-hidden border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-14 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100/80 text-[#076633] text-xs font-bold tracking-widest uppercase mb-3.5">
            <ShieldCheck className="w-3.5 h-3.5" />
            Portfólio Completo
          </div>

          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-[#06110C] mb-4">
            Trabalhamos com as principais operadoras do mercado.
          </h2>

          <p className="text-base sm:text-lg text-gray-600 leading-relaxed max-w-2xl">
            Analisamos alternativas entre operadoras e seguradoras nacionais e regionais para apresentar as melhores opções para cada perfil e orçamento.
          </p>
        </div>

        {/* Operators Comprehensive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 sm:gap-6 mb-12">
          {PARTNERS_DATA.map((partner, idx) => (
            <motion.div
              key={partner.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              className="p-6 rounded-3xl bg-white border border-gray-200/90 hover:border-emerald-500/50 hover:shadow-lg transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Logo Header Container */}
                <div className="h-14 flex items-center justify-between mb-4 pb-3 border-b border-gray-100">
                  <PartnerLogoBadge
                    id={partner.id}
                    name={partner.name}
                    theme="light"
                    className="h-9"
                  />
                </div>

                <div className="text-[11px] font-bold text-emerald-700 uppercase tracking-wider mb-1.5">
                  {partner.category}
                </div>

                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  {partner.description}
                </p>
              </div>

              <div className="mt-5 pt-3.5 border-t border-gray-100 flex items-center justify-between text-xs">
                <span className="flex items-center gap-1 text-emerald-700 font-medium">
                  <Award className="w-3.5 h-3.5 text-emerald-600" />
                  Homologada ANS
                </span>

                <button
                  onClick={scrollToForm}
                  className="text-emerald-700 font-bold hover:text-emerald-900 flex items-center gap-1 cursor-pointer"
                >
                  <span>Cotar</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ANS Regulation Notice */}
        <div className="p-4 rounded-2xl bg-white border border-gray-200 text-center text-xs text-gray-500 max-w-3xl mx-auto">
          Todas as operadoras apresentadas são autorizadas e regulamentadas pela Agência Nacional de Saúde Suplementar (ANS). A Arkos é uma assessoria e corretora cadastrada junto às respectivas companhias.
        </div>

      </div>
    </section>
  );
};
