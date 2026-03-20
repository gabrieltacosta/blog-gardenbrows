"use client";

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
import { Home, LayoutList, MenuIcon, Rss } from "lucide-react";
import Logo from "./logo";
import { useIsMobile } from "@/hooks/use-mobile";

const Header = () => {
  const isMobile = useIsMobile();
  return (
    <header className="border-b">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between">
          <div className="flex">
            <Link href="/">
              <Logo />
            </Link>
          </div>
          <div className="flex items-center">
            {isMobile ? (
              <Sheet>
                <SheetTrigger>
                  <MenuIcon />
                </SheetTrigger>
                <SheetContent className="p-4">
                  <SheetHeader>
                    <SheetTitle className="flex justify-center items-center">
                      Menu
                    </SheetTitle>
                  </SheetHeader>
                  <SheetClose asChild>
                    <Button asChild variant="outline">
                      <Link
                        href={"/"}
                        className="text-foreground text-sm flex gap-2 items-center"
                      >
                        <Home className="w-4 h-4" />
                        Home
                      </Link>
                    </Button>
                  </SheetClose>
                  <SheetClose asChild>
                    <Button asChild variant="outline">
                      <Link href={"/posts"}>
                        <Rss className="w-4 h-4" />
                        Posts
                      </Link>
                    </Button>
                  </SheetClose>
                  <SheetClose asChild>
                    <Button asChild variant="outline">
                      <Link href={"/about"}>
                      <LayoutList />
                      Sobre</Link>
                    </Button>
                  </SheetClose>
                </SheetContent>
              </Sheet>
            ) : (
              <ul className="flex gap-4">
                <li>Home</li>
                <li>Posts</li>
                <li>Sobre</li>
              </ul>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
