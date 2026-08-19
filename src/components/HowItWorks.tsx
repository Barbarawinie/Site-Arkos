import React from 'react';
import { motion } from 'motion/react';
import { ClipboardList, GitCompare, CheckCircle2, ArrowRight } from 'lucide-react';

export const HowItWorks: React.FC = () => {
  const steps = [
    {
      step: '01',
      title: 'Envio das informações',
      desc: 'Preenchimento rápido com cidade, quantidade de vidas e tipo de plano desejado.',
      icon: ClipboardList,
    },
    {
      step: '02',
      title: 'Comparativo personalizado',
      desc: 'Triagem das operadoras com análise de rede hospitalar, carências e custos.',
      icon: GitCompare,
    },
    {
      step: '03',
      title: 'Contratação orientada',
      desc: 'Decisão segura com assessoria completa na emissão da proposta e suporte contínuo.',
      icon: CheckCircle2,
    },
  ];

  const scrollToForm = () => {
    const el = document.getElementById('formulario-cotacao');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="como-funciona" className="bg-white text-[#06110C] py-20 sm:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-14 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100/80 text-[#076633] text-xs font-bold tracking-widest uppercase mb-3.5">
            Passo a Passo
          </div>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-[#06110C] mb-4">
            Como funciona a assessoria Arkos
          </h2>
          <p className="text-base sm:text-lg text-gray-600 leading-relaxed max-w-2xl">
            Um processo direto e sem burocracia para comparar e contratar com tranquilidade.
          </p>
        </div>

        {/* 3-Step Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-12">
          {steps.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: idx * 0.1 }}
                className="p-8 rounded-3xl bg-[#F8FAF9] border border-gray-200/90 flex flex-col justify-between hover:border-emerald-500/40 transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-[#076633] flex items-center justify-center font-bold">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-mono font-bold text-gray-400">
                      {item.step}
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold text-[#06110C] tracking-tight mb-2.5">
                    {item.title}
                  </h3>

                  <p className="text-sm text-gray-600 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Action Button */}
        <div className="text-center pt-2">
          <button
            onClick={scrollToForm}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-[#076633] hover:bg-[#098342] text-white font-extrabold text-sm tracking-wide shadow-lg shadow-emerald-950/20 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
          >
            <span>Fazer cotação agora</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
};
