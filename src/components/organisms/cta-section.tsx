import { Button } from "@/components/ui/button";
import Link from "next/link";

export function CTASection() {
  return (
    <section className="w-full bg-primary/90 px-4 py-20 text-primary-foreground sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-5xl flex-col items-center text-center">
        <h2 className="text-3xl font-bold">
          ¿Listo para encontrar su próximo hogar?
        </h2>
        <p className="mt-4 max-w-2xl text-sm text-primary-foreground/80">
          Encuentra la propiedad de tus sueños con nuestra ayuda experta. Busca entre miles de listados para comprar o alquilar.
        </p>
        <Button
          asChild
          className="mt-8 h-12 min-w-[180px] bg-[#181611] text-white hover:bg-black font-bold"
          size="lg"
        >
          <Link href="/contacto">Buscar propiedades</Link>
        </Button>
      </div>
    </section>
  );
}