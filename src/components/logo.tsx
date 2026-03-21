"use client";

import Link from "next/link";
import { cn } from "@/lib/utils"; // Assumindo que você tenha essa utilitário de classes

interface HeaderLogoProps {
  className?: string;
  light?: boolean; // Opção para logo claro (no fundo escuro) ou escuro (no fundo claro)
}

export default function HeaderLogo({ className, light = true }: HeaderLogoProps) {
  return (
    <Link 
      href="/" 
      className={cn("flex flex-col gap-0 group", className)}
      aria-label="Studio Garden Brows - Home"
    >
      {/* 1. "Studio" em Fonte Caligráfica (Script) */}
      <span className={cn(
        "font-serif italic font-normal", // Usa var(--font-serif) itálica
        "text-[28px] md:text-[36px]",   // Tamanho grande para dar o destaque
        "ml-0 md:-ml-4 mb-[-8px] md:mb-[-12px]", // Ajuste fino de posicionamento (overlap)
        "transition-colors duration-500",
        light ? "text-garden-text/70 group-hover:text-garden-text" : "text-garden-olive group-hover:text-garden-dark"
      )}>
        Studio
      </span>

      {/* 2. "GARDEN BROWS" em Fonte Serifada (Main) */}
      <div className={cn(
        "font-serif font-bold uppercase tracking-[0.15em]", // var(--font-serif) bold e espaçada
        "text-[32px] md:text-[40px] leading-tight", // Tamanho robusto
        "transition-colors duration-500",
        light ? "text-garden-text" : "text-garden-dark"
      )}>
        <span className="block">Garden</span>
        <span className="block mt-[-5px]">Brows</span>
      </div>
    </Link>
  );
}