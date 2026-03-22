import { Instagram, Mail } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Agendamento e Concierge",
  description:
    "Entre em contato com o Garden Brows Studio e agende seu momento de cuidado.",
};

export default function ContactPage() {
  return (
    <div className="bg-garden-dark min-h-screen pt-32 pb-24 px-6 md:px-12">
      <div className="max-w-4xl mx-auto text-center mb-20">
        <span className="font-sans text-[10px] tracking-[0.4em] uppercase text-garden-text/40 block mb-6">
          Concierge
        </span>
        <h1 className="font-serif text-5xl md:text-7xl text-garden-text font-light italic mb-8">
          Inicie seu Ritual
        </h1>
        <p className="text-garden-text/50 font-sans tracking-wide uppercase text-[10px]">
          Atendimento exclusivo sob agendamento prévio.
        </p>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Informações Diretas */}
        <div className="bg-garden-olive/5 border border-garden-text/5 p-12 flex flex-col justify-center gap-12">
          <div className="flex flex-col gap-2">
            <span className="text-[10px] uppercase tracking-widest text-garden-text/30">
              Onde estamos
            </span>
            <Link
              href="https://maps.app.goo.gl/FrUMFx9Bn8aPHrtQ7"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Google Maps"
            >
              <p className="font-serif text-xl text-garden-text/80">
                Jardim São Dimas, São José dos Campos — SP
              </p>
              <p className="text-sm text-garden-text/50 font-light">
                Av. Dr. Nelson d&apos;Ávila, 1837, Sala 509
              </p>
            </Link>
          </div>

          <div className="flex flex-col gap-2">
            <span className="text-[10px] uppercase tracking-widest text-garden-text/30">
              Fale Conosco
            </span>
            <Link
              href="https://wa.me/5512996343610"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
            >
              <p className="font-serif text-xl text-garden-text/80 hover:underline">
                (12) 99634-3610
              </p>
            </Link>
            <p className="text-sm text-garden-text/50 font-light italic">
              Disponível via WhatsApp
            </p>
          </div>

          <div className="flex flex-col gap-2 text-garden-text/30">
            <span className="text-[10px] uppercase tracking-widest mb-2">
              Social
            </span>
            <div className="flex gap-6">
              <Link
                href="https://www.instagram.com/acarolgarden"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5 hover:text-garden-text cursor-pointer transition-colors" />
              </Link>
              <Link
                href="mailto:contato@gardenbrows.com.br"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="E-mail"
              >
                <Mail className="w-5 h-5 hover:text-garden-text cursor-pointer transition-colors" />
              </Link>
            </div>
          </div>
        </div>

        {/* Mapa ou Imagem de Impacto do Studio */}
        <div className="relative aspect-square md:aspect-auto overflow-hidden rounded-b-full border border-garden-text/5">
          {/* Aqui você pode colocar um Iframe do Google Maps com filtro CSS para ficar Dark ou uma foto do Studio */}
          <div className="w-full h-full bg-garden-olive/10 flex items-center justify-center italic text-garden-text/20 font-serif">
            [ Foto do Estúdio Garden Brows ]
          </div>
        </div>
      </div>
    </div>
  );
}
