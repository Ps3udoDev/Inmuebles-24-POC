"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

export function HeroSection() {
  return (
    <section className="w-full py-20 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div
          className="flex min-h-[480px] flex-col gap-8 rounded-xl bg-cover bg-center bg-no-repeat items-center justify-center p-8"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.25) 0%, rgba(0, 0, 0, 0.65) 100%), url("https://lh3.googleusercontent.com/aida-public/AB6AXuAl5VxZbgJjPPzKioSJ-sWt0378H9Q2fWPg5ZU4FVTT6SghFn5WSWIKPy-7wXl089_yyBuJ61wgorr9l6DsuN0i7w_ng9-gxxARWWSqd1HJXyvTW7uzw_n4ZaXNTLTPy2vpK3UnOzgoNqnswNGdkpav6RDB0FGwLcZbyji0aX8nZAgA20XgEclUwrdZOIaB-jXMunf6vONDhxLmmyrMylzRXb0Vd8av3nosLR5Sod3O2cNLLrcIJXHt3bCWFazfrBltvbRc7e_6w6A")`,
          }}
        >
          <div className="flex flex-col gap-2 text-center max-w-2xl">
            <h1 className="text-white text-4xl font-black leading-tight tracking-tight sm:text-5xl">
              Tu hogar ideal te espera
            </h1>
            <h2 className="text-white/90 text-base font-normal leading-normal">
              Encuentra la propiedad de tus sueños con nuestra ayuda experta. Busca entre miles de listados para comprar o alquilar.
            </h2>
          </div>
          
          <div className="flex flex-wrap gap-3 justify-center">
            <Button 
              asChild 
              size="lg" 
              className="h-12 min-w-[180px] bg-primary text-primary-foreground hover:bg-primary/90 font-bold"
            >
              <Link href="/propiedades">Buscar propiedades</Link>
            </Button>
          </div>
        </div>

        {/* Barra de filtros */}
        <div className="-mt-16 relative z-10 mx-auto max-w-5xl rounded-xl bg-card/95 backdrop-blur-sm p-5 shadow-lg">
          <div className="flex flex-col items-center gap-4 md:flex-row md:justify-between">
            {[
              "Tipo de propiedad",
              "Área",
              "Rango de precio",
              "Comprar / Alquilar",
            ].map((label) => (
              <button
                key={label}
                className="flex h-10 items-center gap-2 rounded-md bg-muted px-4 text-sm font-medium text-foreground/90 transition hover:bg-muted/80 w-full md:w-auto justify-between"
                type="button"
              >
                <span>{label}</span>
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            ))}
            <Button className="h-10 min-w-[120px] font-semibold w-full md:w-auto">
              Buscar
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}