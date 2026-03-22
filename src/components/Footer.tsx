import Link from "next/link";
import { Instagram, MapPin, Phone } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-garden-dark border-t border-garden-text/5 pt-24 pb-12 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-8 mb-20">
          {/* Coluna 1: Brand & Social */}
          <div className="flex flex-col gap-8 text-center md:text-left items-center md:items-start">
            <h2 className="font-serif text-3xl text-garden-text tracking-tighter">
              Garden <span className="italic opacity-60">Brows</span>
            </h2>
            <p className="font-sans text-xs uppercase tracking-[0.3em] text-garden-text/40 leading-loose max-w-62.5">
              Elevando a beleza natural através do olhar e do cuidado.
            </p>
            <div className="flex gap-6">
              <Link
                href="https://instagram.com/acarolgarden"
                target="_blank"
                className="text-garden-text/40 hover:text-garden-text transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5 stroke-[1px]" />
              </Link>
              <Link
                href="https://wa.me/5512996343610"
                target="_blank"
                aria-label="WhatsApp"
                className="text-garden-text/40 hover:text-garden-text transition-colors"
              >
                <Phone className="w-5 h-5 stroke-[1px]" />
              </Link>
            </div>
          </div>

          {/* Coluna 2: Navegação Rápida (Estilo Revista) */}
          <div className="flex flex-col gap-6 items-center">
            <span className="font-sans text-[10px] uppercase tracking-[0.5em] text-garden-text/30 mb-2">
              Explore
            </span>
            <nav className="flex flex-col gap-4 items-center font-serif italic text-lg text-garden-text/70">
              <Link
                href="/posts"
                className="hover:text-garden-text transition-colors"
              >
                Journal
              </Link>
              <Link
                href="/sobre"
                className="hover:text-garden-text transition-colors"
              >
                O Estúdio
              </Link>
              <Link
                href="/procedimentos"
                className="hover:text-garden-text transition-colors"
              >
                Procedimentos
              </Link>
              <Link
                href="/contato"
                className="hover:text-garden-text transition-colors"
              >
                Agendamento
              </Link>
            </nav>
          </div>

          {/* Coluna 3: Localização */}
          <div className="flex flex-col gap-6 items-center md:items-end text-center md:text-right">
            <span className="font-sans text-[10px] uppercase tracking-[0.5em] text-garden-text/30 mb-2">
              Visite-nos
            </span>
            <div className="flex flex-col gap-3 font-sans text-[11px] uppercase tracking-[0.2em] text-garden-text/50">
              <p className="flex items-center justify-center md:justify-end gap-2">
                <MapPin className="w-3 h-3" /> São José dos Campos, SP
              </p>
              <p>Av. Dr. Nelson d&apos;Ávila, 1837, Sala 509</p>
              <p>Jardim São Dimas</p>
            </div>
          </div>
        </div>

        {/* Linha Final de Copyright */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-12 border-t border-garden-text/5 gap-6">
          <p className="text-[9px] uppercase tracking-[0.4em] text-garden-text/50">
            © {currentYear} Garden Brows Studio. All rights reserved.
          </p>
          <div className="flex gap-8 text-[9px] uppercase tracking-[0.4em] text-garden-text/50">
            <Link
              href="/privacy"
              className="hover:text-garden-text transition-colors"
            >
              Privacidade
            </Link>
            <Link
              href="/terms"
              className="hover:text-garden-text transition-colors"
            >
              Termos
            </Link>
          </div>
        </div>
        <div className="mt-8 text-center opacity-50">
          <p className="font-serif italic text-[10px] text-garden-text tracking-widest">
            Ad Maiorem Dei Gloriam
          </p>
        </div>
      </div>
    </footer>
  );
}
