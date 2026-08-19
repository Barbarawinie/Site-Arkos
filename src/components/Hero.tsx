import React from 'react';
import { motion } from 'motion/react';
import { CompactQuoteForm } from './CompactQuoteForm';
import { Sparkles, Building2, Globe2, Stethoscope, ArrowDown } from 'lucide-react';

export const Hero: React.FC = () => {
  const scrollToOperators = () => {
    const el = document.getElementById('operadoras');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-[90vh] pt-28 pb-16 lg:pt-36 lg:pb-24 overflow-hidden bg-[#020B06] text-white flex items-center">
      {/* Background Ambience: Subtle Radial Glow, Fine Grid & Depth */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Soft Radial Glows */}
        <div className="absolute -top-32 left-1/4 w-[600px] h-[600px] bg-emerald-600/15 rounded-full blur-[140px]" />
        <div className="absolute top-1/2 -right-24 w-[500px] h-[500px] bg-[#076633]/20 rounded-full blur-[120px]" />
        <div className="absolute -bottom-32 left-10 w-[400px] h-[400px] bg-teal-600/10 rounded-full blur-[100px]" />

        {/* Subtle Tech Micro-Grid */}
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage: `radial-gradient(rgba(255, 255, 255, 0.4) 1px, transparent 1px)`,
            backgroundSize: '24px 24px',
          }}
        />

        {/* Fine Architectural Accent Lines */}
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent" />
        <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          
          {/* LEFT COLUMN: Headline, Sub, Visual Photography Element (7 cols ~58%) */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-6 sm:space-y-8">
            
            {/* Eyebrow Badge */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-500/30 text-emerald-300 text-xs font-semibold w-fit shadow-lg shadow-black/20"
            >
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              <span>Assessoria Especializada em Planos de Saúde</span>
            </motion.div>

            {/* Main Headline H1 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.1 }}
              className="space-y-3 sm:space-y-4"
            >
              <h1 className="text-3xl sm:text-5xl lg:text-[50px] font-black tracking-tight leading-[1.12] text-white">
                Encontre o plano de saúde certo para o seu perfil, sem perder tempo comparando sozinho.
              </h1>
              <p className="text-base sm:text-lg text-emerald-100/80 max-w-2xl leading-relaxed font-normal">
                A Arkos compara preço, rede, cobertura e condições entre as principais operadoras e mostra, de forma simples, o que realmente faz sentido para o seu perfil.
              </p>
            </motion.div>

            {/* Visual Photography Composition with Illustrative Context Chips */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative pt-1 hidden sm:block"
            >
              <div className="relative rounded-2xl overflow-hidden border border-emerald-500/20 shadow-2xl max-w-xl group">
                <img
                  src="/assets/hero_people.jpg"
                  alt="Profissionais e famílias protegidos pela Arkos"
                  className="w-full h-48 sm:h-56 object-cover object-center brightness-[0.88] transition-transform duration-500 group-hover:scale-[1.02]"
                />
                
                {/* Subtle Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#020B06] via-[#020B06]/30 to-transparent" />

                {/* Illustrative Context Chips (Design Elements) */}
                <div className="absolute bottom-3.5 left-3.5 right-3.5 flex flex-wrap items-center gap-2">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#020B06]/85 backdrop-blur-md border border-emerald-500/30 text-emerald-200 text-xs font-semibold shadow-md">
                    <Building2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Plano Empresarial</span>
                  </div>

                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#020B06]/85 backdrop-blur-md border border-emerald-500/30 text-emerald-200 text-xs font-semibold shadow-md">
                    <Globe2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Abrangência Nacional</span>
                  </div>

                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#020B06]/85 backdrop-blur-md border border-emerald-500/30 text-emerald-200 text-xs font-semibold shadow-md">
                    <Stethoscope className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Rede Ampla</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Link to see operators below */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.35 }}
              className="pt-1"
            >
              <button
                onClick={scrollToOperators}
                className="inline-flex items-center gap-2 text-xs text-emerald-300/80 hover:text-emerald-300 font-medium transition-colors cursor-pointer group"
              >
                <span>Conheça todas as operadoras parceiras</span>
                <ArrowDown className="w-3.5 h-3.5 group-hover:translate-y-0.5 transition-transform" />
              </button>
            </motion.div>

          </div>

          {/* RIGHT COLUMN: Compact Form (5 cols ~42%) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.55, delay: 0.15 }}
            className="lg:col-span-5 flex justify-center lg:justify-end"
          >
            <div className="w-full max-w-[420px]">
              <CompactQuoteForm />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
