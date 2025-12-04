"use client";

import { useState, MouseEvent } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Bed, Bath, Ruler, Heart } from "lucide-react";
import Image from "next/image";

interface PropertyCardProps {
  title: string;
  location: string;
  price: string;
  priceSuffix?: string;        // ej: "/mes"
  bedrooms: number;
  bathrooms: number;
  area: string;                // ej: "110 m²"
  imageUrl: string;
  type: "Venta" | "Alquiler";
  onFavoriteChange?: (isFavorite: boolean) => void;
}

export function PropertyCard({
  title,
  location,
  price,
  priceSuffix,
  bedrooms,
  bathrooms,
  area,
  imageUrl,
  type,
  onFavoriteChange,
}: PropertyCardProps) {
  const [isFavorite, setIsFavorite] = useState(false);

  const handleFavoriteClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setIsFavorite((prev) => {
      const next = !prev;
      onFavoriteChange?.(next);
      return next;
    });
  };

  return (
    <Card className="flex h-full flex-col overflow-hidden rounded-2xl border-none bg-card shadow-sm transition-shadow hover:shadow-lg py-0">
      <div className="relative h-56 w-full">
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 33vw"
        />

        {/* Botón favorito */}
        <button
          type="button"
          onClick={handleFavoriteClick}
          aria-label="Marcar como favorita"
          className="absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/70 shadow-sm backdrop-blur transition hover:bg-white"
        >
          <Heart
            className={`h-5 w-5 ${
              isFavorite ? "fill-red-500 text-red-500" : "text-muted-foreground"
            }`}
          />
        </button>
      </div>

      {/* Contenido */}
      <CardContent className="flex flex-1 flex-col p-6">
        {/* Precio + ubicación */}
        <div className="space-y-1">
          <p className="text-2xl font-bold text-primary">
            {price}
            {priceSuffix && (
              <span className="ml-1 align-baseline text-base font-normal text-muted-foreground">
                {priceSuffix}
              </span>
            )}
          </p>
          <p className="text-sm text-muted-foreground">{location}</p>
        </div>

        {/* Separador */}
        <div className="my-5 h-px w-full bg-border" />

        {/* Métricas */}
        <div className="grid grid-cols-3 gap-4 text-center text-sm">
          <div className="flex flex-col items-center gap-1">
            <Bed className="h-5 w-5 text-primary" />
            <span className="font-medium">{bedrooms} Dorms</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <Bath className="h-5 w-5 text-primary" />
            <span className="font-medium">{bathrooms} Baños</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <Ruler className="h-5 w-5 text-primary" />
            <span className="font-medium">{area}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
