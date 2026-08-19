import React from 'react';
import { motion } from 'motion/react';
import { Building2, Users, User, ArrowRight, Check, Sparkles } from 'lucide-react';
import { PlanAudience } from '../types';

interface AudienceProps {
  onSelectAudience?: (audience: PlanAudience) => void;
}

export const Audience: React.FC<AudienceProps> = ({ onSelectAudience }) => {
  const handleAudienceClick = (audience: PlanAudience) => {
    if (onSelectAudience) {
      onSelectAudience(audience);
    }
    const el = document.getElementById('cotacao');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="planos" className="bg-[#F5F8F6] text-[#0A0A0A] py-20 sm:py-28 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-100 text-[#076633] text-xs font-bold tracking-widest uppercase mb-3">
            Planos Sob Medida
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#06110C] mb-4">
            Um plano para cada momento.
          </h2>
          <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
            Seja para estruturar o benefício da sua equipe, proteger quem você ama ou cuidar da sua própria saúde, temos a solução certa.
          </p>
        </div>

        {/* Editorial 3-Column Showcase with Rich Human Photography */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Card 1: Para sua empresa */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="group flex flex-col rounded-2xl bg-white border border-gray-200/90 overflow-hidden shadow-md hover:shadow-xl hover:border-emerald-500/50 transition-all duration-300"
          >
            {/* Photography with digital overlay */}
            <div className="relative aspect-[16/10] overflow-hidden bg-gray-100">
              <img
                src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=800&q=80"
                alt="Equipe de trabalho em escritório colaborativo"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              
              <div className="absolute top-3 left-3 bg-[#031B10]/90 backdrop-blur-md text-emerald-300 text-xs font-bold px-3 py-1 rounded-lg border border-emerald-500/30 flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>PME & MEI</span>
              </div>

              <div className="absolute bottom-3 left-3 right-3 text-white text-xs font-medium bg-black/40 backdrop-blur-sm px-2.5 py-1 rounded-md">
                A partir de 2 vidas • CNPJ ativo
              </div>
            </div>

            {/* Content */}
            <div className="p-6 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-2xl font-bold text-[#06110C] tracking-tight mb-2">
                  Para sua empresa
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed mb-5">
                  Opções para PME, MEI e empresas de diferentes portes. Condições exclusivas de contratação coletiva empresarial.
                </p>
                
                <ul className="space-y-2 mb-6 text-xs sm:text-sm text-gray-700">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Valores até 40% menores que individual</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Inclusão de sócios, funcionários e dependentes</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Possibilidade de carência zero a partir de 30 vidas</span>
                  </li>
                </ul>
              </div>

              <button
                onClick={() => handleAudienceClick('empresa')}
                className="w-full py-3 px-4 rounded-xl bg-[#076633] hover:bg-[#0d8a47] text-white font-bold text-sm flex items-center justify-center gap-2 shadow-sm transition-all group-hover:shadow-md"
              >
                <span>Cotar para minha empresa</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </motion.div>

          {/* Card 2: Para sua família */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="group flex flex-col rounded-2xl bg-white border border-gray-200/90 overflow-hidden shadow-md hover:shadow-xl hover:border-emerald-500/50 transition-all duration-300"
          >
            {/* Photography with digital overlay */}
            <div className="relative aspect-[16/10] overflow-hidden bg-gray-100">
              <img
                src="https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&w=800&q=80"
                alt="Família reunida com filhos em momento de lazer e carinho"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              
              <div className="absolute top-3 left-3 bg-[#031B10]/90 backdrop-blur-md text-emerald-300 text-xs font-bold px-3 py-1 rounded-lg border border-emerald-500/30 flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-emerald-400" />
                <span>Familiar</span>
              </div>

              <div className="absolute bottom-3 left-3 right-3 text-white text-xs font-medium bg-black/40 backdrop-blur-sm px-2.5 py-1 rounded-md">
                Pediatria, maternidade e hospitais de preferência
              </div>
            </div>

            {/* Content */}
            <div className="p-6 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-2xl font-bold text-[#06110C] tracking-tight mb-2">
                  Para sua família
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed mb-5">
                  Compare opções levando em conta quem realmente vai usar o plano, com foco no cuidado com filhos, cônjuge e idosos.
                </p>
                
                <ul className="space-y-2 mb-6 text-xs sm:text-sm text-gray-700">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Rede de hospitais e pronto-socorro infantil</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Opções com ou sem coparticipação</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Orientação para portabilidade de carências</span>
                  </li>
                </ul>
              </div>

              <button
                onClick={() => handleAudienceClick('familia')}
                className="w-full py-3 px-4 rounded-xl bg-[#076633] hover:bg-[#0d8a47] text-white font-bold text-sm flex items-center justify-center gap-2 shadow-sm transition-all group-hover:shadow-md"
              >
                <span>Cotar para minha família</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </motion.div>

          {/* Card 3: Para você */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="group flex flex-col rounded-2xl bg-white border border-gray-200/90 overflow-hidden shadow-md hover:shadow-xl hover:border-emerald-500/50 transition-all duration-300"
          >
            {/* Photography with digital overlay */}
            <div className="relative aspect-[16/10] overflow-hidden bg-gray-100">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80"
                alt="Pessoa jovem profissional tranquila com smartphone"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              
              <div className="absolute top-3 left-3 bg-[#031B10]/90 backdrop-blur-md text-emerald-300 text-xs font-bold px-3 py-1 rounded-lg border border-emerald-500/30 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-emerald-400" />
                <span>Individual & Adesão</span>
              </div>

              <div className="absolute bottom-3 left-3 right-3 text-white text-xs font-medium bg-black/40 backdrop-blur-sm px-2.5 py-1 rounded-md">
                Elegibilidade profissional • Estudantes • Sindicatos
              </div>
            </div>

            {/* Content */}
            <div className="p-6 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-2xl font-bold text-[#06110C] tracking-tight mb-2">
                  Para você
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed mb-5">
                  Encontre alternativas de acordo com seu perfil, região e elegibilidade por entidade de classe ou contratação direta.
                </p>
                
                <ul className="space-y-2 mb-6 text-xs sm:text-sm text-gray-700">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Planos individuais ou coletivos por adesão</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Telemedicina 24 horas inclusa</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Opções nacionais e regionais</span>
                  </li>
                </ul>
              </div>

              <button
                onClick={() => handleAudienceClick('individual')}
                className="w-full py-3 px-4 rounded-xl bg-[#076633] hover:bg-[#0d8a47] text-white font-bold text-sm flex items-center justify-center gap-2 shadow-sm transition-all group-hover:shadow-md"
              >
                <span>Cotar para mim</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
