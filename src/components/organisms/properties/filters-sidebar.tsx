"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";

interface FiltersSidebarProps {
  propertyType: string;
  listingType: string;
  locationQuery: string;
  tiposInmueble?: Array<{ id: number; nombre: string }>;
  tiposTransaccion?: Array<{ id: number; nombre: string }>;
  onPropertyTypeChange: (value: string) => void;
  onListingTypeChange: (value: string) => void;
  onLocationQueryChange: (value: string) => void;
  onClear: () => void;
}

const DEFAULT_TIPOS_INMUEBLE = [
  { id: 1, nombre: "Casa" },
  { id: 2, nombre: "Apartamento" },
  { id: 3, nombre: "Chalet" },
  { id: 4, nombre: "Dúplex" },
  { id: 5, nombre: "Piso" },
];

const DEFAULT_TIPOS_TRANSACCION = [
  { id: 1, nombre: "Venta" },
  { id: 2, nombre: "Alquiler" },
];

export function FiltersSidebar({
  propertyType,
  listingType,
  locationQuery,
  tiposInmueble,
  tiposTransaccion,
  onPropertyTypeChange,
  onListingTypeChange,
  onLocationQueryChange,
  onClear,
}: FiltersSidebarProps) {
  const opcionesTipoInmueble = tiposInmueble ?? DEFAULT_TIPOS_INMUEBLE;
  const opcionesTipoTransaccion = tiposTransaccion ?? DEFAULT_TIPOS_TRANSACCION;

  return (
    <aside className="w-full lg:w-1/4 xl:w-1/5">
      <div className="sticky top-24">
        <h2 className="pb-3 pt-5 text-[22px] font-bold leading-tight tracking-[-0.015em]">
          Filtros
        </h2>

        <div className="space-y-6">
          <div className="flex flex-col">
            <p className="pb-2 text-base font-medium leading-normal">
              Tipo de propiedad
            </p>
            <Select
              value={propertyType}
              onValueChange={onPropertyTypeChange}
            >
              <SelectTrigger className="h-14 w-full rounded-lg border border-border bg-card px-[15px] text-base font-normal leading-normal text-foreground">
                <SelectValue placeholder="Selecciona un tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Todos">Todos</SelectItem>
                {opcionesTipoInmueble.map((tipo) => (
                  <SelectItem key={tipo.id} value={tipo.nombre}>
                    {tipo.nombre}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col">
            <p className="pb-2 text-base font-medium leading-normal">
              Tipo de transacción
            </p>
            <Select
              value={listingType}
              onValueChange={onListingTypeChange}
            >
              <SelectTrigger className="h-14 w-full rounded-lg border border-border bg-card px-[15px] text-base font-normal leading-normal text-foreground">
                <SelectValue placeholder="Selecciona una opción" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Todos">Todos</SelectItem>
                {opcionesTipoTransaccion.map((tipo) => (
                  <SelectItem key={tipo.id} value={tipo.nombre}>
                    {tipo.nombre}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col">
            <p className="pb-2 text-base font-medium leading-normal">
              Ciudad / zona
            </p>
            <Input
              type="text"
              value={locationQuery}
              onChange={(e) => onLocationQueryChange(e.target.value)}
              placeholder="Ej: Madrid, Salamanca"
              className="rounded-lg border border-border bg-card px-[15px] text-base font-normal leading-normal text-foreground placeholder:text-muted-foreground/70"
            />
          </div>

          <div className="flex flex-col gap-3 pt-4">
            <button
              type="button"
              className="flex h-12 w-full items-center justify-center rounded-lg border border-border bg-transparent px-4 text-base font-medium leading-normal text-foreground transition-colors hover:bg-muted"
              onClick={onClear}
            >
              Limpiar filtros
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
}

export type PropertyTypeFilter = string;
export type ListingTypeFilter = string;
