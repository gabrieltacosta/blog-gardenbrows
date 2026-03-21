import Link from "next/link";
import { ChevronLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="bg-garden-dark min-h-screen flex items-center justify-center px-6">
      <div className="max-w-2xl w-full text-center flex flex-col items-center gap-12">
        {/* Elemento Visual Sutil: Um arco vazio */}
        <div className="relative w-32 h-48 border border-garden-text/10 rounded-t-full flex items-center justify-center">
          <span className="font-serif italic text-4xl text-garden-text/10 select-none">
            G
          </span>
        </div>

        <div className="space-y-6">
          <span className="font-sans text-[10px] tracking-[0.5em] uppercase text-garden-text/30 block">
            Página não encontrada
          </span>

          <h1 className="font-serif text-4xl md:text-6xl text-garden-text font-light italic leading-tight">
            Este caminho ainda <br /> não foi traçado.
          </h1>

          <p className="font-sans text-sm text-garden-text/50 font-light leading-relaxed max-w-md mx-auto">
            Talvez a beleza que você procura esteja em outro lugar do nosso
            Journal. Que tal retornar ao início e recomeçar sua jornada?
          </p>
        </div>

        {/* Botão de Retorno com Hover Editorial */}
        <Link
          href="/"
          className="group flex items-center gap-3 border border-garden-text/20 px-10 py-4 text-[10px] uppercase tracking-[0.4em] text-garden-text hover:bg-garden-text hover:text-garden-dark transition-all duration-500"
        >
          <ChevronLeft className="w-3 h-3 group-hover:-translate-x-1 transition-transform" />
          Voltar ao Início
        </Link>

        {/* Citação de Fé Discreta */}
        <p className="mt-12 font-serif italic text-[11px] text-garden-text/20 tracking-widest">
          &ldquo;Em tudo, buscai a face do Senhor.&rdquo;
        </p>
      </div>
    </div>
  );
}
