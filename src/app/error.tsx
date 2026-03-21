"use client";

import { useEffect } from "react";
import Link from "next/link";
import { RefreshCcw, Home } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Aqui você poderia logar o erro em um serviço como Sentry ou apenas no console
    console.error(error);
  }, [error]);

  return (
    <div className="bg-garden-dark min-h-screen flex items-center justify-center px-6 text-center">
      <div className="max-w-xl flex flex-col items-center gap-10">
        {/* Ícone de Alerta Minimalista */}
        <div className="w-16 h-16 rounded-full border border-garden-text/10 flex items-center justify-center animate-pulse">
          <span className="font-serif italic text-2xl text-garden-text/30">
            !
          </span>
        </div>

        <div className="space-y-4">
          <span className="font-sans text-[10px] tracking-[0.4em] uppercase text-garden-text/40 block">
            Ops, algo se perdeu
          </span>
          <h1 className="font-serif text-4xl md:text-5xl text-garden-text font-light italic leading-tight">
            Um breve momento <br /> de pausa.
          </h1>
          <p className="font-sans text-sm text-garden-text/50 font-light leading-relaxed max-w-sm mx-auto">
            Houve uma pequena falha ao carregar este conteúdo. Que tal tentarmos
            novamente?
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          {/* Botão de Tentar Novamente */}
          <button
            onClick={() => reset()}
            className="flex items-center justify-center gap-3 bg-garden-text text-garden-dark px-10 py-4 text-[10px] uppercase tracking-[0.4em] hover:bg-white transition-all duration-300 shadow-xl"
          >
            <RefreshCcw className="w-3 h-3" />
            Tentar Novamente
          </button>

          {/* Botão de Home */}
          <Link
            href="/"
            className="flex items-center justify-center gap-3 border border-garden-text/20 px-10 py-4 text-[10px] uppercase tracking-[0.4em] text-garden-text hover:bg-garden-text/5 transition-all duration-300"
          >
            <Home className="w-3 h-3" />
            Voltar ao Início
          </Link>
        </div>

        <p className="font-serif italic text-[11px] text-garden-text/20 tracking-widest mt-8">
          &ldquo;Paciência e oração tudo alcançam.&rdquo;
        </p>
      </div>
    </div>
  );
}
