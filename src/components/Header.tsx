import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { ArkosLogo } from './ArkosLogo';
import { siteConfig } from '../config/siteConfig';
import { getWhatsAppUrl } from '../utils/whatsapp';

export const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const navLinks = [
    { label: 'Planos', id: 'planos' },
    { label: 'Operadoras', id: 'operadoras' },
    { label: 'Como funciona', id: 'como-funciona' },
    { label: 'Dúvidas', id: 'duvidas' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#020B06]/95 backdrop-blur-md border-b border-emerald-900/40 shadow-xl py-3.5'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a
            href="#"
            className="flex items-center gap-2 group transition-transform duration-200 active:scale-95"
            aria-label="Arkos Benefícios - Início"
          >
            <ArkosLogo variant="light" className="h-8 sm:h-9" />
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map(link => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className="text-sm font-medium text-emerald-100/80 hover:text-white transition-colors relative py-1 hover:after:w-full after:w-0 after:h-0.5 after:bg-emerald-400 after:absolute after:bottom-0 after:left-0 after:transition-all after:duration-200 cursor-pointer"
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Header Action Buttons */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Primary Quote CTA */}
            <button
              onClick={() => scrollToSection('formulario-cotacao')}
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-white bg-[#076633] hover:bg-[#098342] shadow-lg shadow-emerald-950/50 border border-emerald-500/30 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
            >
              <span>Fazer cotação</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => scrollToSection('formulario-cotacao')}
              className="px-3 py-1.5 rounded-lg text-xs font-bold text-white bg-[#076633] border border-emerald-500/30"
            >
              Cotar
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-emerald-200 hover:text-white bg-emerald-950/60 border border-emerald-900/40 cursor-pointer"
              aria-label="Abrir menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#020B06] border-b border-emerald-900/60 px-5 pt-3 pb-6 shadow-2xl"
          >
            <div className="flex flex-col space-y-3.5 pt-2">
              {navLinks.map(link => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className="text-left text-sm font-semibold text-emerald-100/90 hover:text-emerald-400 py-1.5 border-b border-emerald-950/60"
                >
                  {link.label}
                </button>
              ))}

              <div className="pt-2 flex flex-col gap-2.5">
                <button
                  onClick={() => scrollToSection('formulario-cotacao')}
                  className="w-full py-3 rounded-xl bg-[#076633] text-white font-bold text-sm text-center shadow-md flex items-center justify-center gap-2"
                >
                  <span>Fazer cotação</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
