import type { FC } from "react";
import { Logo } from "@/components/shared/logo";
import { Button } from "@/components/ui/button";

export const SiteHeader: FC = () => {
  return (
    <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-4 py-3 sm:px-6 lg:px-8">
        <Logo />

        <nav className="hidden flex-1 items-center justify-end gap-8 md:flex">
          <div className="flex items-center gap-8 text-sm font-medium">
            <a className="nav-link" href="#">
              Comprar
            </a>
            <a className="nav-link" href="#">
              Alquilar
            </a>
            <a className="nav-link" href="#">
              Servicios
            </a>
            <a className="nav-link" href="#">
              Sobre nosotros
            </a>
            <a className="nav-link" href="#">
              Contacto
            </a>
          </div>
          <Button className="h-10 px-4 font-semibold" size="sm">
            Publica tu propiedad
          </Button>
        </nav>
      </div>
    </header>
  );
};
