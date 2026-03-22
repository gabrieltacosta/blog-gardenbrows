import { Instagram, Mail } from "lucide-react";

export const metadata = {
  title: "Agendamento e Concierge",
  description: "Entre em contato com o Garden Brows Studio e agende seu momento de cuidado.",
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
            <span className="text-[10px] uppercase tracking-widest text-garden-text/30">Onde estamos</span>
            <p className="font-serif text-xl text-garden-text/80">Jardins, São Paulo — SP</p>
            <p className="text-sm text-garden-text/50 font-light">Av. das Nações, Edifício Garden, Sala 202</p>
          </div>

          <div className="flex flex-col gap-2">
            <span className="text-[10px] uppercase tracking-widest text-garden-text/30">Fale Conosco</span>
            <p className="font-serif text-xl text-garden-text/80 hover:underline">
              (11) 99999-9999
            </p>
            <p className="text-sm text-garden-text/50 font-light italic">Disponível via WhatsApp</p>
          </div>

          <div className="flex flex-col gap-2 text-garden-text/30">
            <span className="text-[10px] uppercase tracking-widest mb-2">Social</span>
            <div className="flex gap-6">
               <Instagram className="w-5 h-5 hover:text-garden-text cursor-pointer transition-colors" />
               <Mail className="w-5 h-5 hover:text-garden-text cursor-pointer transition-colors" />
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