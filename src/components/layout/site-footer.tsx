// src/components/layout/site-footer.tsx
import type { FC } from "react";
import { Logo } from "@/components/shared/logo";

export const SiteFooter: FC = () => {
  return (
    <footer className="border-t bg-card">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          <div className="col-span-2 md:col-span-1">
            <Logo />
            <p className="mt-4 text-sm text-muted-foreground">
              Su socio de confianza en el sector inmobiliario.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide">
              Navegación
            </h3>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              <li>
                <a className="footer-link" href="#">
                  Comprar
                </a>
              </li>
              <li>
                <a className="footer-link" href="#">
                  Alquilar
                </a>
              </li>
              <li>
                <a className="footer-link" href="#">
                  Servicios
                </a>
              </li>
              <li>
                <a className="footer-link" href="#">
                  Sobre nosotros
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide">
              Contacto
            </h3>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              <li>Calle Falsa 123, Madrid</li>
              <li>+34 123 456 789</li>
              <li>contacto@casaideal.es</li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide">
              Síganos
            </h3>
            <div className="mt-4 flex gap-4 text-muted-foreground">
              <a href="#" aria-label="Facebook" className="footer-icon">
                {/* Facebook icon simple */}
                <svg
                  aria-hidden="true"
                  className="h-6 w-6"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M22 12C22 6.47715 17.5228 2 12 2C6.47719 2 2 6.47715 2 12C2 17.0225 5.65686 21.1289 10.4375 21.8789V14.8906H8.07812V12H10.4375V9.79688C10.4375 7.46094 11.9301 6.07812 14.0412 6.07812C15.0519 6.07812 16.1094 6.25781 16.1094 6.25781V8.54688H14.8984C13.703 8.54688 13.5625 9.25 13.5625 9.96875V12H16L15.5938 14.8906H13.5625V21.8789C18.3431 21.1289 22 17.0225 22 12Z" />
                </svg>
              </a>
              {/* Twitter & Instagram simplificados */}
              <a href="#" aria-label="Twitter" className="footer-icon">
                <svg
                  aria-hidden="true"
                  className="h-6 w-6"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M8.29 20.251C15.837 20.251 20.214 13.769 20.214 8.29895C20.214 8.10895 20.21 7.91895 20.202 7.73096C21.003 7.17297 21.695 6.45795 22.243 5.64099C21.505 5.96796 20.716 6.18994 19.89 6.29395C20.735 5.78796 21.38 4.992 21.695 4.05896C20.897 4.53198 20.018 4.87396 19.085 5.05701C18.336 4.27002 17.254 3.78894 16.077 3.78894C13.733 3.78894 11.833 5.68896 11.833 8.03296C11.833 8.35394 11.869 8.66504 11.939 8.96399C8.72897 8.802 5.85297 7.24097 3.93103 4.82996C3.58203 5.43097 3.38202 6.13794 3.38202 6.88995C3.38202 8.31195 4.11002 9.55695 5.23401 10.284C4.57199 10.262 3.944 10.0811 3.38998 9.79297C3.38998 9.80994 3.38998 9.82703 3.38998 9.84497C3.38998 11.861 4.81998 13.531 6.71399 13.915C6.37799 14.006 6.024 14.054 5.659 14.054C5.39502 14.054 5.13702 14.0291 4.88602 13.981C5.40997 15.621 6.92603 16.828 8.73999 16.861C7.31903 17.968 5.505 18.617 3.54498 18.617C3.21497 18.617 2.88998 18.598 2.56897 18.562C4.40295 19.748 6.50702 20.251 8.29 20.251Z" />
                </svg>
              </a>
              <a href="#" aria-label="Instagram" className="footer-icon">
                <svg
                  aria-hidden="true"
                  className="h-6 w-6"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 7.375C9.44 7.375 7.375 9.44 7.375 12C7.375 14.56 9.44 16.625 12 16.625C14.56 16.625 16.625 14.56 16.625 12C16.625 9.44 14.56 7.375 12 7.375ZM12 15.125C10.316 15.125 8.875 13.684 8.875 12C8.875 10.316 10.316 8.875 12 8.875C13.684 8.875 15.125 10.316 15.125 12C15.125 13.684 13.684 15.125 12 15.125Z" />
                  <path d="M17.5 6.375C17.9142 6.375 18.25 6.03921 18.25 5.625C18.25 5.21079 17.9142 4.875 17.5 4.875C17.0858 4.875 16.75 5.21079 16.75 5.625C16.75 6.03921 17.0858 6.375 17.5 6.375Z" />
                  <path d="M17.25 3C15.61 3 8.39 3 6.75 3C4.13 3 3 4.13 3 6.75C3 8.39 3 15.61 3 17.25C3 19.87 4.13 21 6.75 21C8.39 21 15.61 21 17.25 21C19.87 21 21 19.87 21 17.25C21 15.61 21 8.39 21 6.75C21 4.13 19.87 3 17.25 3ZM19.5 17.25C19.5 18.798 18.798 19.5 17.25 19.5C15.702 19.5 8.298 19.5 6.75 19.5C5.202 19.5 4.5 18.798 4.5 17.25C4.5 15.702 4.5 8.298 4.5 6.75C4.5 5.202 5.202 4.5 6.75 4.5C8.298 4.5 15.702 4.5 17.25 4.5C18.798 4.5 19.5 5.202 19.5 6.75C19.5 8.298 19.5 15.702 19.5 17.25Z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t pt-6 text-center text-xs text-muted-foreground">
          © 2024 CasaIdeal Inmobiliaria. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
};
