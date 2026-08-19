import React from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Stats } from './components/Stats';
import { DecisionFactors } from './components/DecisionFactors';
import { Partners } from './components/Partners';
import { DataDriven } from './components/DataDriven';
import { HowItWorks } from './components/HowItWorks';
import { FinalCTA } from './components/FinalCTA';
import { FAQ } from './components/FAQ';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';

export default function App() {
  return (
    <div className="min-h-screen bg-[#020B06] text-[#06110C] font-sans antialiased selection:bg-[#076633] selection:text-white flex flex-col">
      {/* 1. Header */}
      <Header />

      <main className="flex-1">
        {/* 2. Hero + Formulário Compacto */}
        <Hero />

        {/* 3. Números Institucionais */}
        <Stats />

        {/* 4. O que importa na hora de escolher um plano? */}
        <DecisionFactors />

        {/* 5. Seção Única de Operadoras Parceiras */}
        <Partners />

        {/* 6. Metodologia Data-Driven Simplificada */}
        <DataDriven />

        {/* 7. Como Funciona */}
        <HowItWorks />

        {/* 8. CTA Final */}
        <FinalCTA />

        {/* 9. FAQ */}
        <FAQ />
      </main>

      {/* 10. Footer */}
      <Footer />

      {/* 11. WhatsApp Flutuante com ícone oficial */}
      <FloatingWhatsApp />
    </div>
  );
}
