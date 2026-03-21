import Link from "next/link";
import { ReactNode } from "react";
import Header from "./header";


interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {


  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {children}
      </main>

      <footer className="container mx-auto flex flex-col md:flex-row w-full items-center justify-between px-4 py-6 border-t mt-8 gap-4">
        <div>
          <p className="text-center text-muted-foreground text-xs md:text-sm lg:text-lg italic">
            &copy; {new Date().getFullYear()} Blog - Studio Garden Brows&reg;.
            Todos os direitos reservados.
          </p>
        </div>
        <div className="flex items-center gap-4">
        <Link
          href="/privacy"
          className="text-muted-foreground text-xs md:text-sm italic hover:underline ml-2"
        >
          Política de Privacidade
        </Link>
      </div>
      </footer>
    </div>
  );
}
