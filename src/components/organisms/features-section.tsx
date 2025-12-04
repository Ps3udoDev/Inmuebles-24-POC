export function FeaturesSection() {
  const services = [
    {
      icon: "real_estate_agent",
      title: "Venta de propiedades",
      desc: "Le ayudamos a encontrar el comprador perfecto y a conseguir el mejor precio.",
    },
    {
      icon: "apartment",
      title: "Gestión de alquileres",
      desc: "Gestionamos todo el proceso, desde la búsqueda de inquilinos hasta la administración.",
    },
    {
      icon: "gavel",
      title: "Asesoramiento legal",
      desc: "Expertos que le acompañan en cada paso de la transacción.",
    },
  ];

  return (
    <section className="w-full bg-card px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl text-center">
        <h2 className="text-3xl font-bold tracking-tight">
          Nuestros servicios
        </h2>
        <p className="mt-4 mx-auto max-w-2xl text-sm text-muted-foreground">
          Ofrecemos un conjunto completo de servicios para facilitar su experiencia inmobiliaria.
        </p>

        <div className="mt-12 grid gap-10 md:grid-cols-3">
          {services.map((service) => (
            <div key={service.title} className="flex flex-col items-center">
              <div className="mb-4 inline-flex rounded-full bg-primary/20 p-5">
                <span className="material-symbols-outlined text-4xl text-primary">
                  {service.icon}
                </span>
              </div>
              <h3 className="mb-2 text-lg font-semibold">
                {service.title}
              </h3>
              <p className="text-sm text-muted-foreground">{service.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}