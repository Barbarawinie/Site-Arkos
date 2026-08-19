import React from 'react';
import { PARTNERS_DATA } from '../data/partners';
import { PartnerLogoBadge } from './PartnerLogos';

export const PartnerStrip: React.FC = () => {
  return (
    <section id="operadoras" className="bg-[#F8FAF9] border-y border-gray-200/80 py-12 sm:py-16 relative z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Headline & Subheadline */}
        <div className="max-w-2xl mx-auto text-center mb-8 sm:mb-10">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#06110C] tracking-tight mb-2">
            As principais operadoras em um só lugar.
          </h2>
          <p className="text-sm sm:text-base text-gray-600">
            Compare alternativas de diferentes marcas antes de decidir.
          </p>
        </div>

        {/* Responsive Grid of Verified Operator Badges */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-5 items-center justify-items-center">
          {PARTNERS_DATA.slice(0, 12).map(partner => (
            <div
              key={partner.id}
              className="w-full h-20 flex items-center justify-center p-3 rounded-2xl bg-white border border-gray-200/90 shadow-sm hover:shadow-md hover:border-emerald-500/40 transition-all duration-200 hover:-translate-y-0.5"
              title={`${partner.name} - Plano de Saúde`}
            >
              <PartnerLogoBadge
                id={partner.id}
                name={partner.name}
                theme="light"
                className="h-8 sm:h-9"
              />
            </div>
          ))}
        </div>

        <div className="mt-8 text-center text-xs text-gray-500">
          Todas as operadoras parceiras são registradas e regulamentadas pela Agência Nacional de Saúde Suplementar (ANS).
        </div>

      </div>
    </section>
  );
};
