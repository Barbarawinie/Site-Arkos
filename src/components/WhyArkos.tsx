import React from 'react';
import { motion } from 'motion/react';
import { Layers, Compass, FileCheck, Headphones, Sparkles, CheckCircle2 } from 'lucide-react';

export const WhyArkos: React.FC = () => {
  const differentials = [
    {
      icon: Layers,
      title: 'Mais opções',
      description: 'Comparação ampla e imparcial entre as principais operadoras e seguradoras do mercado.'
    },
    {
      icon: Compass,
      title: 'Escolha com contexto',
      description: 'Preço, rede de hospitais, abrangência geográfica e seu perfil de uso analisados em conjunto.'
    },
    {
      icon: FileCheck,
      title: 'Menos burocracia',
      description: 'Cuidamos da parte chata: documentação, regras de contratação e orientações de carência.'
    },
    {
      icon: Headphones,
      title: 'Acompanhamento',
      description: 'A relação não termina na assinatura. Nosso suporte continua com você para tirar dúvidas e apoiar no dia a dia.'
    }
  ];

  return (
    <section id="diferenciais" className="bg-white text-[#0A0A0A] py-20 sm:py-28 border-y border-gray-200/80 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Editorial Content (6 cols) */}
          <div className="lg:col-span-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-100 text-[#076633] text-xs font-bold tracking-widest uppercase mb-4">
              Por que a Arkos
            </div>
            
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#06110C] leading-[1.12] mb-5">
              Escolher um plano não precisa ser complicado.
            </h2>
            
            <p className="text-base sm:text-lg text-gray-600 leading-relaxed mb-8">
              Você conta o que procura. A Arkos ajuda a comparar as opções e entender o que realmente faz diferença antes de escolher.
            </p>

            {/* List of 4 key pillars */}
            <div className="space-y-6">
              {differentials.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: idx * 0.08 }}
                    className="flex items-start gap-4"
                  >
                    <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200/60 flex items-center justify-center text-[#076633] shrink-0 mt-0.5 shadow-sm">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-[#06110C] mb-1">
                        {item.title}
                      </h3>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Editorial Photography + Real Life Overlay (6 cols) */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-gray-200 bg-[#031B10]">
              <img
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=900&q=80"
                alt="Profissional avaliando opções em ambiente moderno"
                className="w-full h-full object-cover min-h-[460px] opacity-90"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#06110C]/80 via-transparent to-transparent" />

              {/* Floating UI Simulation Badge 1 */}
              <div className="absolute top-6 left-6 bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-xl border border-gray-100 max-w-[260px]">
                <div className="flex items-center gap-2 mb-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
                  <span className="text-[11px] uppercase font-bold tracking-wider text-emerald-700">
                    Análise em tempo real
                  </span>
                </div>
                <p className="text-xs font-bold text-gray-900 leading-snug">
                  Comparação de rede hospitalar e coparticipação
                </p>
              </div>

              {/* Floating UI Simulation Badge 2 */}
              <div className="absolute bottom-6 right-6 left-6 sm:left-auto bg-[#031B10]/90 backdrop-blur-md rounded-2xl p-4 border border-emerald-500/30 text-white shadow-2xl">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-400 shrink-0">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white">
                      Decisão orientada por dados
                    </div>
                    <div className="text-[11px] text-emerald-300/80">
                      Sem pressão comercial. 100% consultivo.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
