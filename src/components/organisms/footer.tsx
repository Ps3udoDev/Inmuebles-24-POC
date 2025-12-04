import Link from "next/link";
import { Logo } from "@/components/atoms/logo";
import { Facebook, Twitter, Instagram } from "lucide-react";

const navigation = {
  navegacion: [
    { name: "Comprar", href: "/comprar" },
    { name: "Alquilar", href: "/alquilar" },
    { name: "Servicios", href: "/servicios" },
    { name: "Sobre Nosotros", href: "/nosotros" },
  ],
  contacto: [
    { label: "Calle Falsa 123, Madrid" },
    { label: "+34 123 456 789" },
    { label: "info@casaideal.com" },
  ],
  social: [
    {
      name: "Facebook",
      href: "#",
      icon: Facebook,
    },
    {
      name: "Twitter",
      href: "#",
      icon: Twitter,
    },
    {
      name: "Instagram",
      href: "#",
      icon: Instagram,
    },
  ],
};

export function Footer() {
  return (
    <footer className="bg-card border-t">
      <div className="mx-auto max-w-7xl py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-4">
              <Logo className="text-primary" />
              <h2 className="text-lg font-bold">CasaIdeal Inmobiliaria</h2>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
              Su socio de confianza en el sector inmobiliario.
            </p>
          </div>
          
          <div>
            <h3 className="font-bold tracking-wider uppercase text-sm">
              Navegación
            </h3>
            <ul className="mt-4 space-y-2">
              {navigation.navegacion.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold tracking-wider uppercase text-sm">
              Contacto
            </h3>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              {navigation.contacto.map((item, index) => (
                <li key={index}>{item.label}</li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold tracking-wider uppercase text-sm">
              Síganos
            </h3>
            <div className="flex space-x-4 mt-4">
              {navigation.social.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  <span className="sr-only">{item.name}</span>
                  <item.icon className="h-6 w-6" />
                </Link>
              ))}
            </div>
          </div>
        </div>
        
        <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} CasaIdeal Inmobiliaria. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
