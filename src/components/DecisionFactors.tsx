import React from 'react';
import { motion } from 'motion/react';
import { Building2, MapPin, DollarSign, Headphones, CheckCircle2 } from 'lucide-react';

export const DecisionFactors: React.FC = () => {
  return (
    <section id="planos" className="bg-[#F8FAF9] text-[#06110C] py-20 sm:py-28 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-14 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100/80 text-[#076633] text-xs font-bold tracking-widest uppercase mb-3.5">
            Critérios de Avaliação
          </div>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-[#06110C] mb-4">
            O que importa na hora de escolher um plano?
          </h2>
          <p className="text-base sm:text-lg text-gray-600 leading-relaxed max-w-2xl">
            Uma decisão consciente vai além da marca. Analisamos cada detalhe técnico e financeiro para encontrar o equilíbrio perfeito.
          </p>
        </div>

        {/* Visual Asymmetric Composition (Not 4 identical cards) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          
          {/* Item 1: Rede (7 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="md:col-span-7 rounded-3xl bg-white p-7 sm:p-9 border border-gray-200/90 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 w-36 h-36 bg-emerald-50 rounded-full blur-2xl group-hover:bg-emerald-100 transition-colors pointer-events-none" />
            <div>
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-[#076633] flex items-center justify-center mb-5">
                <Building2 className="w-6 h-6" />
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#06110C] tracking-tight mb-2.5">
                Rede
              </h3>
              <p className="text-base text-gray-600 leading-relaxed max-w-lg">
                Hospitais, clínicas e laboratórios que realmente fazem sentido para o perfil e rotina de atendimento.
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-100 flex flex-wrap items-center gap-3 text-xs font-semibold text-emerald-800">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200/60">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                Centros de excelência
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200/60">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                Pronto-atendimento 24h
              </span>
            </div>
          </motion.div>

          {/* Item 2: Abrangência (5 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="md:col-span-5 rounded-3xl bg-white p-7 sm:p-9 border border-gray-200/90 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between relative overflow-hidden group"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-teal-100 text-teal-800 flex items-center justify-center mb-5">
                <MapPin className="w-6 h-6" />
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#06110C] tracking-tight mb-2.5">
                Abrangência
              </h3>
              <p className="text-base text-gray-600 leading-relaxed">
                Planos regionais ou nacionais, ajustados para quem viaja ou busca foco no atendimento local.
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-100 text-xs font-semibold text-teal-800">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 border border-teal-200/60">
                <CheckCircle2 className="w-3.5 h-3.5 text-teal-600" />
                Cobertura geográfica sob medida
              </span>
            </div>
          </motion.div>

          {/* Item 3: Custo-benefício (5 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="md:col-span-5 rounded-3xl bg-white p-7 sm:p-9 border border-gray-200/90 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between relative overflow-hidden group"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-900 flex items-center justify-center mb-5">
                <DollarSign className="w-6 h-6" />
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#06110C] tracking-tight mb-2.5">
                Custo-benefício
              </h3>
              <p className="text-base text-gray-600 leading-relaxed">
                Comparação além da mensalidade: avaliação de coparticipação, reembolso e estabilidade de reajustes.
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-100 text-xs font-semibold text-amber-900">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200/60">
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-700" />
                Equilíbrio financeiro sustentável
              </span>
            </div>
          </motion.div>

          {/* Item 4: Suporte (7 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="md:col-span-7 rounded-3xl bg-white p-7 sm:p-9 border border-gray-200/90 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 w-36 h-36 bg-emerald-50 rounded-full blur-2xl group-hover:bg-emerald-100 transition-colors pointer-events-none" />
            <div>
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-[#076633] flex items-center justify-center mb-5">
                <Headphones className="w-6 h-6" />
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#06110C] tracking-tight mb-2.5">
                Suporte
              </h3>
              <p className="text-base text-gray-600 leading-relaxed max-w-lg">
                Ajuda humanizada durante a cotação, na análise de regras de carência, no processo de contratação e no pós-venda.
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-100 flex flex-wrap items-center gap-3 text-xs font-semibold text-emerald-800">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200/60">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                Orientação na portabilidade
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200/60">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                Acompanhamento pós-adesão
              </span>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
