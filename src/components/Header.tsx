"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "./ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { MenuIcon, Instagram } from "lucide-react";
import Logo from "./logo";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

const Header = () => {
  const isMobile = useIsMobile();
  const [isScrolled, setIsScrolled] = useState(false);

  // Efeito para mudar o fundo ao rolar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Journal", href: "/posts" },
    { name: "O Estúdio", href: "/sobre" },
    { name: "Procedimentos", href: "/procedimentos" },
  ];

  return (
    <header
      className={cn(
        "fixed top-0 left-0 w-full z-50 transition-all duration-500",
        isScrolled
          ? "h-20 bg-garden-dark/90 backdrop-blur-lg border-b border-garden-text/5"
          : "h-28 bg-transparent", // Altura maior no topo, mas sem exageros
      )}
    >
      <nav className="h-full max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
        {/* Logo - Agora com hover suave */}
        <div className="flex max-w-[180px] md:max-w-none">
          <Logo light={true} className="scale-[0.7] md:scale-90 origin-left" />
        </div>

        <div className="flex items-center gap-8">
          {isMobile ? (
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-garden-text"
                >
                  <MenuIcon className="w-6 h-6 stroke-[1px]" />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="bg-garden-dark border-none text-garden-text w-full flex flex-col justify-between p-8 md:p-12"
              >
                {/* 1. ACESSIBILIDADE: O SheetHeader e SheetTitle agora estão aqui. 
         Como usamos VisuallyHidden no componente base, eles não aparecem na tela, 
         mas o erro do console some e o site fica acessível. */}
                <SheetHeader>
                  <SheetTitle>Menu de Navegação</SheetTitle>
                  <SheetDescription>
                    Explore as crônicas e procedimentos do Studio Garden Brows
                  </SheetDescription>
                </SheetHeader>

                {/* 2. O CONTEÚDO VISUAL (O que a cliente vê) */}
                <div className="flex flex-col gap-12 mt-16">
                  <div className="flex flex-col gap-2">
                    <span className="font-sans text-[10px] tracking-[0.5em] uppercase text-garden-text/30">
                      Navegação
                    </span>
                    {/* Aqui é um <h2> visual, não o SheetTitle técnico */}
                    <h2 className="font-serif italic text-3xl text-garden-text font-light">
                      Menu
                    </h2>
                  </div>

                  <nav className="flex flex-col gap-6">
                    {navLinks.map((link) => (
                      <SheetClose key={link.name} asChild>
                        <Link
                          href={link.href}
                          className="font-serif text-3xl md:text-4xl font-light hover:italic transition-all duration-500 border-b border-garden-text/5 pb-5 last:border-none"
                        >
                          {link.name}
                        </Link>
                      </SheetClose>
                    ))}
                  </nav>
                </div>

                {/* Footer do Menu - Redes e Contato */}
                <div className="flex flex-col gap-8 pb-12">
                  <div className="h-[1px] w-12 bg-garden-text/20" />
                  <Link
                    href="https://instagram.com/acarolgarden"
                    className="group flex items-center gap-4 text-[11px] uppercase tracking-[0.4em] text-garden-text/40 hover:text-garden-text transition-colors"
                  >
                    <Instagram className="w-4 h-4 stroke-[1px]" />
                    <span>Instagram</span>
                  </Link>
                  <p className="font-sans text-[10px] uppercase tracking-widest text-garden-text/20">
                    Studio Garden Brows © 2026
                  </p>
                </div>
              </SheetContent>
            </Sheet>
          ) : (
            <>
              {/* Menu Desktop - Espaçamento Editorial */}
              <ul className="flex gap-10">
                {navLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-[10px] uppercase tracking-[0.4em] text-garden-text/60 hover:text-garden-text transition-all duration-300"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>

              {/* Botão de Agendamento Sutil */}
              <Button
                variant="outline"
                className="rounded-full border-garden-text/20 text-garden-text bg-transparent hover:bg-garden-text hover:text-garden-dark text-[9px] uppercase tracking-[0.2em] px-8 transition-all duration-500"
              >
                Agendar
              </Button>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
