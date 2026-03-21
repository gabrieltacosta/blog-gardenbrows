import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export const metadata = {
  title: "Procedimentos e Rituais",
  description: "Explore nossos serviços: Design de Sobrancelhas, Lash Lift, Brow Lamination e Micropigmentação Labial.",
};

const procedimentos = [
  {
    title: "Design de Sobrancelhas",
    description: "O mapeamento facial que respeita a sua estrutura óssea para um olhar harmônico e autêntico.",
    image: "/procedimentos/design.jpg", // Certifique-se de ter as imagens na pasta public
    details: ["Mapeamento Geométrico", "Simetria Facial", "Pinçamento de Alta Precisão"]
  },
  {
    title: "Lash Lift",
    description: "Curvatura e hidratação dos seus cílios naturais, proporcionando um efeito de máscara sem extensões artificiais.",
    image: "/procedimentos/lashlift.jpg",
    details: ["Efeito Curvado Natural", "Nutrição com Vitaminas", "Durabilidade de 6 a 8 semanas"]
  },
  {
    title: "Brow Lamination",
    description: "Alinhamento dos fios para sobrancelhas mais encorpadas, selvagens e modernas.",
    image: "/procedimentos/lamination.jpg",
    details: ["Controle de Fios Rebeldes", "Aspecto de Sobrancelha Cheia", "Estilo Editorial"]
  },
  {
    title: "Micropigmentação Labial",
    description: "Revitalização da cor e definição do contorno labial com aspecto de saúde e suavidade.",
    image: "/procedimentos/labial.jpg",
    details: ["Efeito Batom Suave", "Correção de Assimetrias", "Pigmentos Hipoalergênicos"]
  }
];

export default function ProcedimentosPage() {
  return (
    <div className="bg-garden-dark min-h-screen pt-32 pb-24 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        
        {/* Header da Página */}
        <div className="max-w-3xl mb-24">
          <span className="font-sans text-[10px] tracking-[0.5em] uppercase text-garden-text/40 block mb-6">
            O Menu de Beleza
          </span>
          <h1 className="font-serif text-5xl md:text-7xl text-garden-text font-light italic leading-tight mb-8">
            Rituais de <br /> Transformação.
          </h1>
          <p className="font-sans text-lg text-garden-text/60 font-light leading-relaxed">
            Cada procedimento na **Garden Brows** é uma oração feita com as mãos, focada em revelar a 
            perfeição que já existe em você.
          </p>
        </div>

        {/* Grid de Procedimentos Estilo Revista */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-24">
          {procedimentos.map((proc, index) => (
            <div key={proc.title} className="group flex flex-col gap-8">
              {/* Moldura de Arco sutil no topo das fotos */}
              <div className="relative aspect-[4/5] overflow-hidden rounded-t-[200px] border border-garden-text/5 bg-garden-olive/5">
                <Image 
                  src={proc.image}
                  alt={proc.title}
                  fill
                  className="object-cover grayscale-[30%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000"
                />
              </div>

              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-4">
                  <span className="font-serif italic text-2xl text-garden-text/30">0{index + 1}</span>
                  <h2 className="font-serif text-3xl text-garden-text font-light">{proc.title}</h2>
                </div>
                
                <p className="font-sans text-sm text-garden-text/60 leading-relaxed font-light min-h-[60px]">
                  {proc.description}
                </p>

                <ul className="flex flex-wrap gap-x-6 gap-y-2 mb-4">
                  {proc.details.map(detail => (
                    <li key={detail} className="text-[9px] uppercase tracking-widest text-garden-text/40 flex items-center gap-2">
                      <span className="w-1 h-1 rounded-full bg-garden-text/20" />
                      {detail}
                    </li>
                  ))}
                </ul>

                <Link 
                  href="/contato"
                  className="flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-garden-text hover:gap-4 transition-all duration-300"
                >
                  Consultar Disponibilidade <ChevronRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action Final */}
        <div className="mt-32 p-16 bg-garden-olive/5 border border-garden-text/5 text-center rounded-t-full">
           <p className="font-serif italic text-2xl text-garden-text/80 mb-8">
             &ldquo;A beleza é o esplendor da verdade.&rdquo;
           </p>
           <Link    
             href="/contato"
             className="inline-block border border-garden-text/20 px-12 py-4 text-[10px] uppercase tracking-[0.4em] text-garden-text hover:bg-garden-text hover:text-garden-dark transition-all"
           >
             Agendar Experiência
           </Link>
        </div>
      </div>
    </div>
  );
}