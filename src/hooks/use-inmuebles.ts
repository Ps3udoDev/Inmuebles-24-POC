"use client";

import { useCallback, useMemo, useState } from "react";
import useSWR from "swr";
import {
  fetchInmuebles,
  fetchOpcionesFiltros,
  type InmuebleParaUI,
} from "@/actions/inmueble.actions";
import type { InmuebleFilters } from "@/services/inmueble.service";

export type SortOption = "relevancia" | "precio-asc" | "precio-desc" | "fecha-desc";

interface UseInmueblesFilters {
  tipoInmueble: string;
  tipoTransaccion: string;
  ubicacionQuery: string;
  sortBy: SortOption;
}

interface UseInmueblesReturn {
  inmuebles: InmuebleParaUI[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
  isLoading: boolean;
  error: string | null;
  filters: UseInmueblesFilters;
  opcionesFiltros: {
    tiposInmueble: Array<{ id: number; nombre: string }>;
    tiposTransaccion: Array<{ id: number; nombre: string }>;
    ciudades: string[];
  } | null;

  setTipoInmueble: (value: string) => void;
  setTipoTransaccion: (value: string) => void;
  setUbicacionQuery: (value: string) => void;
  setSortBy: (value: SortOption) => void;
  setPage: (page: number) => void;
  clearFilters: () => void;
  refresh: () => void;
}

const DEFAULT_FILTERS: UseInmueblesFilters = {
  tipoInmueble: "Todos",
  tipoTransaccion: "Todos",
  ubicacionQuery: "",
  sortBy: "relevancia",
};

const DEFAULT_PAGE_SIZE = 6;

type InmueblesKey = ["inmuebles", UseInmueblesFilters, number];

export function useInmuebles(): UseInmueblesReturn {
  const [filters, setFilters] = useState<UseInmueblesFilters>(DEFAULT_FILTERS);
  const [page, setPageState] = useState<number>(1);

  const {
    data: opcionesData,
    error: opcionesError,
  } = useSWR(
    "inmuebles/opciones",
    async () => {
      const result = await fetchOpcionesFiltros();
      if (!result.success) {
        throw new Error(result.error);
      }
      return result.data;
    },
    {
      revalidateOnFocus: false,
    }
  );

  const inmueblesKey: InmueblesKey = ["inmuebles", filters, page];

  const {
    data: inmueblesData,
    error: inmueblesError,
    isLoading,
    isValidating,
    mutate,
  } = useSWR(
    inmueblesKey,
    async ([, filters, page]: InmueblesKey) => {
      const apiFilters: InmuebleFilters = {};

      if (filters.tipoInmueble !== "Todos") {
        apiFilters.tipoInmueble = filters.tipoInmueble;
      }

      if (filters.tipoTransaccion !== "Todos") {
        apiFilters.tipoTransaccion = filters.tipoTransaccion;
      }

      if (filters.ubicacionQuery.trim()) {
        apiFilters.ubicacionQuery = filters.ubicacionQuery.trim();
      }

      const result = await fetchInmuebles({
        filters: apiFilters,
        sortBy: filters.sortBy,
        page,
        pageSize: DEFAULT_PAGE_SIZE,
      });

      if (!result.success) {
        throw new Error(result.error);
      }

      return result.data;
    }
  );

  const setTipoInmueble = useCallback((value: string) => {
    setFilters((prev) => ({ ...prev, tipoInmueble: value }));
    setPageState(1);
  }, []);

  const setTipoTransaccion = useCallback((value: string) => {
    setFilters((prev) => ({ ...prev, tipoTransaccion: value }));
    setPageState(1);
  }, []);

  const setUbicacionQuery = useCallback((value: string) => {
    setFilters((prev) => ({ ...prev, ubicacionQuery: value }));
    setPageState(1);
  }, []);

  const setSortBy = useCallback((value: SortOption) => {
    setFilters((prev) => ({ ...prev, sortBy: value }));
    setPageState(1);
  }, []);

  const setPage = useCallback((nextPage: number) => {
    setPageState(nextPage);
  }, []);

  const clearFilters = useCallback(() => {
    setFilters(DEFAULT_FILTERS);
    setPageState(1);
  }, []);

  const refresh = useCallback(() => {
    void mutate();
  }, [mutate]);

  const errorMessage = useMemo(() => {
    if (inmueblesError) return inmueblesError.message;
    if (opcionesError) return opcionesError.message;
    return null;
  }, [inmueblesError, opcionesError]);

  const total = inmueblesData?.total ?? 0;
  const pageSize = inmueblesData?.pageSize ?? DEFAULT_PAGE_SIZE;
  const totalPages = inmueblesData?.totalPages ?? 1;
  const currentPage = inmueblesData?.page ?? page;

  return {
    inmuebles: inmueblesData?.inmuebles ?? [],
    total,
    page: currentPage,
    pageSize,
    totalPages,
    isLoading: isLoading || isValidating,
    error: errorMessage,

    filters,

    opcionesFiltros: opcionesData ?? null,

    setTipoInmueble,
    setTipoTransaccion,
    setUbicacionQuery,
    setSortBy,
    setPage,
    clearFilters,
    refresh,
  };
}
