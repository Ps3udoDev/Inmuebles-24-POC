import type { FC } from "react";
import { Card, CardContent } from "@/components/ui/card";

type PropertyCardProps = {
  image: string;
  imageAlt: string;
  price: string;
  priceSuffix?: string;
  location: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  isFavorite?: boolean;
};

export const PropertyCard: FC<PropertyCardProps> = ({
  image,
  imageAlt,
  price,
  priceSuffix,
  location,
  bedrooms,
  bathrooms,
  area,
  isFavorite,
}) => {
  return (
    <Card className="flex h-full flex-col overflow-hidden border-none bg-card shadow-md">
      <div className="relative">
        <img
          src={image}
          alt={imageAlt}
          className="h-56 w-full object-cover"
          loading="lazy"
        />
        <button
          aria-label="Marcar como favorita"
          className="absolute right-3 top-3 inline-flex h-9 w-9 items-center justify-center rounded-full bg-black/30 text-white backdrop-blur transition hover:bg-black/50"
        >
          <span className="material-symbols-outlined text-xl">
            {isFavorite ? "favorite" : "favorite_border"}
          </span>
        </button>
      </div>

      <CardContent className="flex flex-1 flex-col p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-2xl font-bold text-primary">
              {price}
              {priceSuffix && (
                <span className="ml-1 text-base font-normal text-muted-foreground">
                  {priceSuffix}
                </span>
              )}
            </p>
            <p className="text-sm text-muted-foreground">{location}</p>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-3 gap-4 border-t pt-4 text-center text-sm">
          <div className="flex flex-col items-center">
            <span className="material-symbols-outlined mb-1 text-primary">
              bed
            </span>
            <span className="font-medium">{bedrooms} Dorms</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="material-symbols-outlined mb-1 text-primary">
              bathtub
            </span>
            <span className="font-medium">{bathrooms} Baños</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="material-symbols-outlined mb-1 text-primary">
              square_foot
            </span>
            <span className="font-medium">{area} m²</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
