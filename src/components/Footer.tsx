import React from 'react';
import { ArkosLogo } from './ArkosLogo';
import { siteConfig, getGoogleMapsEmbedUrl } from '../config/siteConfig';
import { 
  Phone, 
  Mail, 
  MapPin, 
  MessageCircle, 
  Instagram, 
  Linkedin, 
  ShieldCheck, 
  ArrowUp
} from 'lucide-react';
import { getWhatsAppUrl } from '../utils/whatsapp';

export const Footer: React.FC = () => {
  const mapUrl = getGoogleMapsEmbedUrl(siteConfig.address);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#031B10] text-emerald-100/80 pt-16 pb-12 border-t border-emerald-900/40 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Grid: Info + Navigation + Google Maps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-emerald-900/40">
          
          {/* Col 1: Brand & Bio (4 cols) */}
          <div className="lg:col-span-4">
            <div className="mb-4">
              <ArkosLogo variant="light" className="h-9" />
            </div>
            
            <p className="text-xs sm:text-sm text-emerald-200/70 leading-relaxed mb-6 max-w-sm">
              Assessoria especializada e metodologia Data-Driven para comparar e contratar planos de saúde empresariais, familiares e individuais com segurança.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-3">
              {siteConfig.instagram && (
                <a
                  href={siteConfig.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg bg-emerald-950/80 border border-emerald-800/50 flex items-center justify-center text-emerald-400 hover:text-white hover:bg-emerald-800/60 transition-colors"
                  aria-label="Instagram Arkos"
                >
                  <Instagram className="w-4 h-4" />
                </a>
              )}

              {siteConfig.linkedin && (
                <a
                  href={siteConfig.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg bg-emerald-950/80 border border-emerald-800/50 flex items-center justify-center text-emerald-400 hover:text-white hover:bg-emerald-800/60 transition-colors"
                  aria-label="LinkedIn Arkos"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
              )}

              <a
                href={getWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-emerald-950/80 border border-emerald-800/50 flex items-center justify-center text-emerald-400 hover:text-white hover:bg-emerald-800/60 transition-colors"
                aria-label="WhatsApp Arkos"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Navigation Links (2 cols) */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-4">
              Navegação
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <a href="#planos" className="hover:text-white transition-colors">Planos de Saúde</a>
              </li>
              <li>
                <a href="#diferenciais" className="hover:text-white transition-colors">Por que Arkos</a>
              </li>
              <li>
                <a href="#metodologia" className="hover:text-white transition-colors">Metodologia Data-Driven</a>
              </li>
              <li>
                <a href="#como-funciona" className="hover:text-white transition-colors">Como Funciona</a>
              </li>
              <li>
                <a href="#operadoras" className="hover:text-white transition-colors">Operadoras</a>
              </li>
              <li>
                <a href="#duvidas" className="hover:text-white transition-colors">Dúvidas Frequentes</a>
              </li>
            </ul>
          </div>

          {/* Col 3: Contact Details (3 cols) */}
          <div className="lg:col-span-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-4">
              Atendimento & Contato
            </h4>
            
            <ul className="space-y-3 text-xs sm:text-sm">
              {siteConfig.whatsapp && (
                <li className="flex items-start gap-2.5">
                  <MessageCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="block text-emerald-300 font-semibold">WhatsApp</span>
                    <a
                      href={getWhatsAppUrl()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-white transition-colors"
                    >
                      {siteConfig.displayWhatsapp || siteConfig.whatsapp}
                    </a>
                  </div>
                </li>
              )}

              {siteConfig.email && (
                <li className="flex items-start gap-2.5">
                  <Mail className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="block text-emerald-300 font-semibold">E-mail</span>
                    <a
                      href={`mailto:${siteConfig.email}`}
                      className="hover:text-white transition-colors break-all"
                    >
                      {siteConfig.email}
                    </a>
                  </div>
                </li>
              )}

              {siteConfig.address && (
                <li className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="block text-emerald-300 font-semibold">Endereço</span>
                    <span className="text-emerald-200/70">{siteConfig.address}</span>
                  </div>
                </li>
              )}
            </ul>
          </div>

          {/* Col 4: Google Maps Embed (3 cols) */}
          <div className="lg:col-span-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-4">
              Localização
            </h4>

            {mapUrl ? (
              <div className="rounded-xl overflow-hidden border border-emerald-800/60 shadow-lg h-36 bg-emerald-950/80">
                <iframe
                  title="Localização Arkos Benefícios"
                  src={mapUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            ) : (
              <div className="rounded-xl p-4 bg-emerald-950/40 border border-emerald-900 text-xs text-emerald-300/60">
                {/* TODO: Configure address in siteConfig.ts to render map */}
                Endereço sob consulta.
              </div>
            )}
          </div>

        </div>

        {/* Bottom Disclaimer & Legal */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-emerald-300/60">
          <div className="text-center sm:text-left">
            <p>© {new Date().getFullYear()} {siteConfig.name} • CNPJ: {siteConfig.cnpj}. Todos os direitos reservados.</p>
            <p className="mt-0.5 text-[11px] text-emerald-400/50">
              A Arkos Benefícios é uma corretora e assessoria autorizada pelas operadoras e seguradoras parceiras.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-1 text-emerald-400 hover:text-white transition-colors cursor-pointer"
            >
              <span>Voltar ao topo</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
