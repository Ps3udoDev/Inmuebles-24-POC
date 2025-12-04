"use client";

import useSWR from "swr";
import {
  fetchInmueblePorId,
  type InmuebleParaUI,
} from "@/actions/inmueble.actions";

interface UseInmuebleDetalleState {
  inmueble: InmuebleParaUI | null;
  isLoading: boolean;
  error: string | null;
  refresh: () => void;
}

export function useInmuebleDetalle(id?: string): UseInmuebleDetalleState {
  const { data, error, isLoading, mutate } = useSWR(
    id ? ["inmueble-detalle", id] : null,
    async ([, inmuebleId]) => {
      const result = await fetchInmueblePorId(inmuebleId as string);
      return result;
    },
    {
      revalidateOnFocus: false,
    }
  );

  let errorMessage: string | null = null;
  let inmueble: InmuebleParaUI | null = null;

  if (data) {
    if (data.success) {
      inmueble = data.data;
    } else {
      errorMessage = data.error;
    }
  }

  if (error && !errorMessage) {
    errorMessage = error instanceof Error ? error.message : "Error al cargar inmueble";
  }

  return {
    inmueble,
    isLoading,
    error: errorMessage,
    refresh: () => mutate(),
  };
}
