import React from 'react';
import { motion } from 'motion/react';

export const Stats: React.FC = () => {
  const statsList = [
    { value: '15+', label: 'anos', sublabel: 'de mercado e experiência' },
    { value: '15+', label: 'estados', sublabel: 'com atuação e suporte' },
    { value: '5K+', label: 'beneficiários', sublabel: 'atendidos com segurança' },
    { value: '300+', label: 'empresas', sublabel: 'atendidas e parceiras' },
  ];

  return (
    <section className="bg-[#020B06] border-y border-emerald-950/80 text-white py-16 sm:py-20 relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[250px] bg-emerald-600/10 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10">
          {statsList.map((stat, idx) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: idx * 0.1 }}
              className="flex flex-col items-center sm:items-start text-center sm:text-left border-l-0 sm:border-l sm:border-emerald-500/20 sm:pl-6"
            >
              <div className="text-4xl sm:text-6xl font-black text-white tracking-tight mb-1 font-sans">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-emerald-100 to-emerald-300">
                  {stat.value}
                </span>
              </div>
              <div className="text-base sm:text-lg font-bold text-emerald-300 uppercase tracking-wide">
                {stat.label}
              </div>
              <div className="text-xs sm:text-sm text-emerald-100/60 mt-0.5">
                {stat.sublabel}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
