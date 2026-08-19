import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, ArrowRight } from 'lucide-react';

export const DataDriven: React.FC = () => {
  const steps = [
    {
      num: '01',
      title: 'Perfil',
      desc: 'Mapeamento de localidade, quantidade de vidas e preferências essenciais.',
    },
    {
      num: '02',
      title: 'Comparação',
      desc: 'Cruzamento automatizado com o portfólio das operadoras credenciadas.',
    },
    {
      num: '03',
      title: 'Análise',
      desc: 'Avaliação técnica de rede hospitalar, carências e custo-benefício real.',
    },
    {
      num: '04',
      title: 'Escolha',
      desc: 'Apresentação de opções objetivas para uma decisão informada e segura.',
    },
    {
      num: '05',
      title: 'Acompanhamento',
      desc: 'Orientação no processo de contratação e suporte contínuo no pós-venda.',
    },
  ];

  return (
    <section id="metodologia" className="bg-[#020B06] text-white py-20 sm:py-28 relative overflow-hidden border-t border-emerald-950/80">
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-emerald-600/10 rounded-full blur-[130px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950 border border-emerald-500/30 text-emerald-400 text-xs font-bold tracking-widest uppercase mb-3.5">
            <Sparkles className="w-3.5 h-3.5" />
            Metodologia Data-Driven
          </div>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white mb-4">
            Mais informação para uma escolha melhor.
          </h2>
          <p className="text-base sm:text-lg text-emerald-100/70 leading-relaxed max-w-2xl">
            Um fluxo consultivo e estruturado para filtrar o que realmente importa sem burocracia.
          </p>
        </div>

        {/* Continuous 5-Step Process Line */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 relative">
          {steps.map((step, idx) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              className="p-6 rounded-2xl bg-white/[0.04] border border-white/10 hover:border-emerald-500/40 transition-colors flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800/40">
                    {step.num}
                  </span>
                  {idx < steps.length - 1 && (
                    <ArrowRight className="hidden lg:block w-4 h-4 text-emerald-500/40" />
                  )}
                </div>

                <h3 className="text-xl font-bold text-white tracking-tight mb-2">
                  {step.title}
                </h3>

                <p className="text-xs sm:text-sm text-emerald-100/60 leading-relaxed">
                  {step.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
