import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Metadata } from "next";
// IMPORTAR O NOVO COMPONENTE
import Avatar from "@/components/Avatar";

export const metadata: Metadata = {
  title: "Links Oficiais | Garden Brows Studio",
  description:
    "Acesse o e-book O Valor Que Comunica e fique por dentro das novidades de design de sobrancelhas e cílios.",
};

const links = [
  {
    text: "O Valor Que Comunica",
    href: "https://pay.kiwify.com.br/FC1R11X",
    icon: "/ebook.webp",
  },
  {
    text: "Portfólio Profissional: Totalmente editável no Canva",
    href: "https://pay.kiwify.com.br/GHLBoos",
    icon: "/canva.webp",
  },
  {
    text: "Ficha de Avaliação Lash Lifting: Personalizável",
    href: "https://pay.kiwify.com.br/PpsF1pK",
    icon: "/checklist.webp",
  },
  {
    text: "Seleção Carol Garden",
    href: "https://collshp.com/selecaocarolgarden?view=storefront",
    icon: "/shopee.webp",
  },
];

export default function LinkPage() {
  return (
    <div className="bg-garden-dark min-h-screen pb-24 pt-32 px-6 md:px-12 flex flex-col items-center">
      {/* Cabeçalho com o Avatar - NOVA ESTRUTURA */}
      <div className="mb-12 text-center flex flex-col items-center gap-6 w-full max-w-sm">
        {/* Adiciona o componente Avatar com a imagem desejada */}
        <Avatar
          src="/carol-garden.webp" // TROQUE PELO CAMINHO DA SUA IMAGEM
          alt="Foto de Perfil Carol Garden - Garden Brows Studio"
          size={96} // Tamanho (96px = h-24 no Tailwind)
        />

        <div className="space-y-1.5">
          <h1 className="font-serif text-3xl md:text-4xl text-garden-text font-light tracking-wide">
            Garden Brows Studio
          </h1>
          <Link href="https://www.instagram.com/acarolgarden/" target="_blank" rel="noopener noreferrer">
            <span className="text-muted-foreground text-sm font-medium hover:text-garden-olive">
              @acarolgarden
            </span>
          </Link>
          <p className="text-garden-text/70 text-sm leading-relaxed text-balance pt-2">
            Especialista em olhar e embelezamento facial. <br />
            Confira meus materiais e produtos oficiais abaixo.
          </p>
        </div>
      </div>

      {/* Container dos Links - Sem alterações */}
      <div className="flex flex-col w-full max-w-md gap-4">
        {links.map((l) => (
          <Button
            key={l.text}
            asChild
            className="bg-garden-olive text-garden-text border border-white/5 shadow-xl shadow-black/40 py-6 px-6 h-auto rounded-xl transition-all duration-300 hover:scale-[1.02] hover:bg-garden-olive hover:brightness-110"
          >
            <Link
              href={l.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-start w-full gap-4 no-underline"
            >
              <div className="shrink-0 flex items-center justify-center bg-garden-dark/30 p-2 rounded-md">
                <Image
                  src={l.icon}
                  alt={`Ícone ${l.text}`}
                  width={24}
                  height={24}
                  className="object-contain"
                />
              </div>
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
