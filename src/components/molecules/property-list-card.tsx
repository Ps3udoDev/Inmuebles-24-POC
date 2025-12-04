// src/components/molecules/property-list-card.tsx

import { Bed, Bath, Ruler } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

interface PropertyListCardProps {
  title: string;
  location: string;
  priceLabel: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  imageUrl: string;
  onViewDetails?: () => void;
}

export function PropertyListCard({
  title,
  location,
  priceLabel,
  bedrooms,
  bathrooms,
  area,
  imageUrl,
  onViewDetails,
}: PropertyListCardProps) {
  return (
    <div className="group flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card shadow-sm transition-shadow hover:shadow-lg">
      <div className="overflow-hidden">
        <div className="relative h-56 w-full">
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="mb-4 flex-1">
          <p className="text-2xl font-bold text-foreground">{priceLabel}</p>
          <p className="mt-1 text-sm text-muted-foreground">{title}</p>
          <p className="text-sm text-muted-foreground/90">{location}</p>

          <div className="mt-3 flex items-center gap-4 text-sm text-foreground/80">
            <span className="flex items-center gap-1.5">
              <Bed className="h-4 w-4 text-primary" />
              {bedrooms} hab.
            </span>
            <span className="flex items-center gap-1.5">
              <Bath className="h-4 w-4 text-primary" />
              {bathrooms} baños
            </span>
            <span className="flex items-center gap-1.5">
              <Ruler className="h-4 w-4 text-primary" />
              {area} m²
            </span>
          </div>
        </div>

        <Button
          type="button"
          className="mt-2 h-11 w-full text-sm font-bold"
          onClick={onViewDetails}
        >
          Ver detalles
        </Button>
      </div>
    </div>
  );
}
