"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "./ui/button";
import { X } from "lucide-react";

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Quando o componente monta, verifica no navegador se o usuário já respondeu
    const consent = localStorage.getItem("cookie_consent");
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = (type: "all" | "essential") => {
    // Salva a escolha no navegador para não perguntar de novo
    localStorage.setItem("cookie_consent", type);
    setIsVisible(false);

    if (type === "all") {
      // DICA: É aqui que você dispararia o evento para carregar o Google Analytics
      // Exemplo: window.dispatchEvent(new Event("accept_all_cookies"));
    }
  };

  // Se o usuário já aceitou/recusou, o componente não renderiza nada
  if (!isVisible) return null;

  return (
    // Como você usa o plugin tw-animate-css, adicionei um animate-fade-in (ajuste se a classe exata for diferente no seu plugin)
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 sm:p-6 animate-fade-in">
      {/* Usando as suas cores do tema "Garden" e bordas do seu :root */}
      <div className="relative mx-auto max-w-4xl rounded-xl border border-border bg-garden-dark p-6 shadow-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <Button className="absolute top-1 right-1"
          variant="ghost"
          size="icon"
          onClick={() => setIsVisible(false)}
          aria-label="Fechar"
        >
          <X />
        </Button>

        <div className="flex-1 space-y-2 mt-2 md:mt-0">
          <h3 className="text-lg font-semibold text-garden-text">
            Nós valorizamos sua privacidade 🍪
          </h3>
          <p className="text-sm text-muted-foreground">
            Usamos cookies essenciais para o funcionamento do blog (como lembrar
            seus dados para futuros comentários) e cookies analíticos para
            entender o que você mais gosta de ler. Saiba mais em nossa{" "}
            <Link
              href="/privacy"
              className="underline hover:text-garden-text transition-colors"
            >
              Política de Privacidade
            </Link>{" "}
            e nos{" "}
            <Link
              href="/terms"
              className="underline hover:text-garden-text transition-colors"
            >
              Termos de Uso
            </Link>
            .
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <Button
            onClick={() => handleAccept("essential")}
            className="rounded-md border border-border px-4 py-2 text-sm font-medium text-garden-text hover:bg-garden-olive transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background"
          >
            Apenas Essenciais
          </Button>
          <Button
            onClick={() => handleAccept("all")}
            className="rounded-md bg-garden-olive px-4 py-2 text-sm font-medium text-garden-text hover:opacity-90 transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background"
          >
            Aceitar Todos
          </Button>
        </div>
      </div>
    </div>
  );
}
