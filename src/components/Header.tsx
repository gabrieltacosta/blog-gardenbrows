"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "./ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
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
          ? "py-4 bg-garden-dark/80 backdrop-blur-lg border-b border-garden-text/5"
          : "py-8 bg-transparent",
      )}
    >
      <nav className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
        {/* Logo - Agora com hover suave */}
        <div className="flex">
          <Link href="/" className="hover:opacity-70 transition-opacity">
            <Logo />
          </Link>
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
                className="bg-garden-dark border-garden-text/10 text-garden-text w-[300px]"
              >
                <SheetHeader className="mb-12">
                  <SheetTitle className="font-serif italic text-2xl text-left text-garden-text font-light">
                    Menu
                  </SheetTitle>
                </SheetHeader>

                <div className="flex flex-col gap-8">
                  {navLinks.map((link) => (
                    <SheetClose key={link.name} asChild>
                      <Link
                        href={link.href}
                        className="font-serif text-3xl font-light hover:italic transition-all"
                      >
                        {link.name}
                      </Link>
                    </SheetClose>
                  ))}
                  <hr className="border-garden-text/10" />
                  <Link
                    href="https://instagram.com"
                    className="flex items-center gap-3 text-[10px] uppercase tracking-[0.3em] text-garden-text/50"
                  >
                    <Instagram className="w-4 h-4" /> Instagram
                  </Link>
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
