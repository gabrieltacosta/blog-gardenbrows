import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Links Oficiais | Garden Brows Studio",
  description: "Acesse o e-book O Valor Que Comunica e fique por dentro das novidades de design de sobrancelhas e cílios.",
};

const links = [
  {
    text: "O Valor Que Comunica",
    href: "https://pay.kiwify.com.br/FC1R11X",
    icon: "/e_books-20.webp",
  },
  {
    text: "Portfólio Profissional: Totalmente editável no Canva",
    href: "https://pay.kiwify.com.br/GHLBoos",
    icon: "/canva.ico",
  },
  {
    text: "Ficha de Avaliação Lash Lifting: Personalizável",
    href: "https://pay.kiwify.com.br/PpsF1pK",
    icon: "/checklist.png",
  },
  {
    text: "Seleção Carol Garden",
    href: "https://collshp.com/selecaocarolgarden?view=storefront",
    icon: "/shopee.ico",
  },
];

export default function LinkPage() {
  return (
    <div className="bg-garden-dark min-h-screen pb-24 pt-32 px-6 md:px-12 flex flex-col items-center">
      
      {/* Cabeçalho */}
      <div className="mb-10 text-center">
        <h1 className="font-serif text-3xl md:text-4xl text-garden-text font-light mb-2">
          Garden Brows Studio
        </h1>
        <p className="text-muted-foreground text-sm">
          Acesse nossos materiais e produtos oficiais
        </p>
      </div>

      {/* Container dos Links - max-w-md para ficar bonito no desktop */}
      <div className="flex flex-col w-full max-w-md gap-4">
        {links.map((l) => (
          <Button
            key={l.text}
            asChild
            // h-auto e py-6 para que a altura do botão se adapte ao texto
            className="bg-garden-olive text-garden-text border border-white/5 shadow-xl shadow-black/40 py-6 px-6 h-auto rounded-xl transition-all duration-300 hover:scale-[1.02] hover:bg-garden-olive hover:brightness-110"
          >
            <Link 
              href={l.href} 
              target="_blank" 
              rel="noopener noreferrer" 
              // Removido o items-center para garantir que o texto não fique espremido
              className="flex items-center justify-start w-full gap-4 no-underline"
            >
              {/* Container do Ícone */}
              <div className="shrink-0 flex items-center justify-center bg-garden-dark/30 p-2 rounded-md">
                <Image
                  src={l.icon}
                  alt={`Ícone ${l.text}`}
                  width={24}
                  height={24}
                  className="object-contain"
                />
              </div>

              {/* Container do Texto - CORREÇÃO AQUI */}
              {/* O flex-1 obriga o texto a ocupar o resto do espaço e respeitar a largura do botão */}
              <p className="flex-1 text-left font-medium leading-tight text-wrap">
                {l.text}
              </p>
            </Link>
          </Button>
        ))}
      </div>
    </div>
  );
}