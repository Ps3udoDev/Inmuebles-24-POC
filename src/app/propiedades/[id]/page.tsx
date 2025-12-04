// src/app/propiedades/[id]/page.tsx
"use client";

import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { Header } from "@/components/organisms/header";
import { Footer } from "@/components/organisms/footer";
import { useInmuebleDetalle } from "@/hooks/use-inmueble-detalle";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Loader2,
  ArrowLeft,
  MapPin,
  Bath,
  BedDouble,
  Ruler,
} from "lucide-react";
import { useChatStore } from "@/store/chat.store";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export default function PropertyDetailPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const { inmueble, isLoading, error } = useInmuebleDetalle(params.id);
  const { open, sendMessage, messages } = useChatStore();

  const handleBack = () => {
    router.push("/propiedades");
  };

  const handleContactAgent = () => {
    if (!inmueble) return;

    open();

    const intro = `Hola, estoy interesado en el inmueble "${inmueble.titulo}" (ID ${inmueble.id}), ubicado en ${inmueble.locationLabel}, con precio ${inmueble.priceLabel}.`;

    if (messages.length === 0) {
      sendMessage(intro);
    } else {
      sendMessage(
        `Estoy viendo el inmueble "${inmueble.titulo}" (ID ${inmueble.id}) y tengo dudas sobre esta propiedad.`
      );
    }
  };

  if (isLoading) {
    return (
      <div className="relative flex min-h-screen w-full flex-col">
        <Header />
        <main className="container mx-auto flex-1 px-4 py-8">
          <div className="flex items-center gap-3">
            <Loader2 className="h-6 w-6 animate-spin text-primary" />
            <p>Cargando propiedad...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !inmueble) {
    return (
      <div className="relative flex min-h-screen w-full flex-col">
        <Header />
        <main className="container mx-auto flex-1 px-4 py-8">
          <Button
            variant="ghost"
            size="sm"
            className="mb-4 flex items-center gap-2"
            onClick={handleBack}
          >
            <ArrowLeft className="h-4 w-4" />
            Volver a la lista
          </Button>

          <Card className="max-w-xl">
            <CardHeader>
              <CardTitle>Error al cargar la propiedad</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                {error ?? "No se encontró la propiedad solicitada."}
              </p>
              <Button className="mt-4" onClick={handleBack}>
                Volver a propiedades
              </Button>
            </CardContent>
          </Card>
        </main>
        <Footer />
      </div>
    );
  }

  // --- Imágenes para el carrusel ---
  const fallbackImage = "/placeholder-property.jpg";
  const mainImageUrl =
    inmueble.imagenPrincipal ??
    inmueble.imagenes[0]?.url ??
    fallbackImage;

  const slides: { id: string; url: string }[] = [];

  // Imagen principal primero
  if (mainImageUrl) {
    slides.push({ id: "main", url: mainImageUrl });
  }

  // El resto de imágenes sin duplicar
  inmueble.imagenes.forEach((img) => {
    if (img.url !== mainImageUrl) {
      slides.push({ id: img.id, url: img.url });
    }
  });

  if (slides.length === 0) {
    slides.push({ id: "placeholder", url: fallbackImage });
  }

  return (
    <div className="relative flex min-h-screen w-full flex-col">
      <Header />

      <main className="container mx-auto flex-1 px-4 py-8">
        {/* Breadcrumb + back */}
        <div className="mb-4 flex items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2 text-xs md:text-sm text-muted-foreground">
            <span
              onClick={() => router.push("/")}
              className="cursor-pointer hover:text-primary"
            >
              Inicio
            </span>
            <span>/</span>
            <span
              onClick={() => router.push("/propiedades")}
              className="cursor-pointer hover:text-primary"
            >
              Propiedades
            </span>
            <span>/</span>
            <span className="text-foreground truncate max-w-[220px] md:max-w-none">
              {inmueble.titulo}
            </span>
          </div>

          <Button
            variant="ghost"
            size="sm"
            className="hidden md:inline-flex items-center gap-2"
            onClick={handleBack}
          >
            <ArrowLeft className="h-4 w-4" />
            Volver
          </Button>
        </div>

        {/* Título + precio */}
        <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
          <div className="space-y-2">
            <h1 className="text-3xl md:text-4xl font-black leading-tight tracking-[-0.033em]">
              {inmueble.titulo}
            </h1>
            <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span>{inmueble.locationLabel}</span>
              <Separator orientation="vertical" className="hidden h-4 md:block" />
              <span className="text-xs uppercase tracking-wide">
                {inmueble.tipoInmueble} · {inmueble.tipoTransaccion}
              </span>
            </div>
          </div>

          <div className="flex flex-col items-start md:items-end gap-2">
            <p className="text-3xl md:text-4xl font-bold">
              {inmueble.priceLabel}
            </p>
            <p className="text-xs text-muted-foreground uppercase tracking-wide">
              Precio {inmueble.moneda === "USD" ? "en dólares" : "estimado"}
            </p>
            <Button
              size="sm"
              className="mt-1"
              onClick={handleContactAgent}
            >
              Hablar por chat sobre esta propiedad
            </Button>
          </div>
        </div>

        {/* Carrusel de imágenes */}
        <section className="mb-10">
          <Carousel className="w-full">
            <CarouselContent>
              {slides.map((slide, index) => (
                <CarouselItem key={slide.id ?? index} className="basis-full">
                  <div className="relative h-[260px] md:h-[420px] overflow-hidden rounded-xl">
                    <Image
                      src={slide.url}
                      alt={inmueble.titulo}
                      fill
                      className="h-full w-full object-cover"
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-3" />
            <CarouselNext className="right-3" />
          </Carousel>
        </section>

        {/* Contenido principal (sin sidebar de asesor) */}
        <section className="max-w-6xl space-y-8">
          {/* Características principales */}
          <Card>
            <CardHeader>
              <CardTitle>Características principales</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                <FeatureCard
                  icon={<BedDouble className="h-5 w-5 text-primary" />}
                  label="Dormitorios"
                  value={inmueble.numHabitaciones ?? 0}
                />
                <FeatureCard
                  icon={<Bath className="h-5 w-5 text-primary" />}
                  label="Baños"
                  value={inmueble.numBanos ?? 0}
                />
                <FeatureCard
                  icon={<Ruler className="h-5 w-5 text-primary" />}
                  label="Área construida"
                  value={
                    inmueble.areaM2
                      ? `${inmueble.areaM2.toLocaleString("es-ES")} m²`
                      : "N/D"
                  }
                />
                <FeatureCard
                  icon={<MapPin className="h-5 w-5 text-primary" />}
                  label="Ciudad"
                  value={inmueble.ubicacion.ciudad}
                />
              </div>
            </CardContent>
          </Card>

          {/* Descripción */}
          {inmueble.descripcion && (
            <Card>
              <CardHeader>
                <CardTitle>Descripción</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm leading-relaxed text-muted-foreground whitespace-pre-line">
                  {inmueble.descripcion}
                </p>
              </CardContent>
            </Card>
          )}

          {/* Extras / características */}
          {inmueble.caracteristicas.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Extras y comodidades</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {inmueble.caracteristicas.map((car) => (
                    <Badge
                      key={car.id}
                      variant="outline"
                      className="border-border bg-card text-xs font-medium"
                    >
                      {car.nombre}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Ubicación */}
          <Card>
            <CardHeader>
              <CardTitle>Ubicación</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-1 text-sm">
                <p className="font-medium">{inmueble.locationLabel}</p>
                <p className="text-muted-foreground">
                  {inmueble.ubicacion.callePrincipal}
                  {inmueble.ubicacion.numero
                    ? ` ${inmueble.ubicacion.numero}`
                    : ""}
                  , {inmueble.ubicacion.pais}
                </p>
              </div>
              <div className="h-48 w-full overflow-hidden rounded-lg bg-muted">
                {/* Aquí luego puedes integrar un mapa real */}
                <div className="flex h-full items-center justify-center text-xs text-muted-foreground">
                  Mapa por integrar · {inmueble.ubicacion.ciudad}
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>

      <Footer />
    </div>
  );
}

interface FeatureCardProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
}

function FeatureCard({ icon, label, value }: FeatureCardProps) {
  return (
    <div className="flex flex-col items-center gap-2 rounded-lg bg-muted/40 p-4 text-center">
      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
        {icon}
      </div>
      <span className="text-base font-semibold">{value}</span>
      <span className="text-xs text-muted-foreground">{label}</span>
    </div>
  );
}
