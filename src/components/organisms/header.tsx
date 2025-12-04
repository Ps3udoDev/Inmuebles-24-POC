"use client";

import Link from "next/link";
import { Logo } from "@/components/atoms/logo";
import { Button } from "@/components/ui/button";

const navLinks = [
  { href: "/comprar", label: "Comprar" },
  { href: "/alquilar", label: "Alquilar" },
  { href: "/servicios", label: "Servicios" },
  { href: "/nosotros", label: "Sobre Nosotros" },
  { href: "/contacto", label: "Contacto" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-sm border-b">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 py-3">
        <Link href="/" className="flex items-center gap-4 text-foreground hover:text-primary transition-colors">
          <Logo />
          <h2 className="text-lg font-bold leading-tight tracking-tight">
            CasaIdeal Inmobiliaria
          </h2>
        </Link>
        
        <nav className="hidden md:flex flex-1 justify-end gap-8">
          <div className="flex items-center gap-9">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium hover:text-primary transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
          
          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold">
            Publica tu Propiedad
          </Button>
        </nav>
      </div>
    </header>
  );
}
