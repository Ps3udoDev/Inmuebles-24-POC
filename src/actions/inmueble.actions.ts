"use server";

import {
  listarInmuebles,
  obtenerInmueblePorId,
  obtenerTiposInmueble,
  obtenerTiposTransaccion,
  obtenerCiudadesDisponibles,
  type InmuebleListParams,
  type InmuebleConRelaciones,
} from "@/services/inmueble.service";

export interface InmuebleParaUI {
  id: string;
  titulo: string;
  descripcion: string | null;
  precio: number;
  moneda: string;
  priceLabel: string;
  areaM2: number | null;
  numHabitaciones: number | null;
  numBanos: number | null;
  fechaPublicacion: string | null;
  estadoPublicacion: string;
  tipoInmueble: string;
  tipoTransaccion: string;
  ubicacion: {
    callePrincipal: string;
    numero: string | null;
    ciudad: string;
    estadoProvincia: string | null;
    pais: string;
    codigoPostal: string | null;
  };
  locationLabel: string;
  imagenPrincipal: string | null;
  imagenes: Array<{
    id: string;
    url: string;
    esPrincipal: boolean;
    orden: number;
  }>;
  caracteristicas: Array<{
    id: number;
    nombre: string;
    icono: string | null;
  }>;
}

type ErrorResult = {
  success: false;
  error: string;
};

export type ListarInmueblesResult =
  | {
      success: true;
      data: {
        inmuebles: InmuebleParaUI[];
        total: number;
        page: number;
        pageSize: number;
        totalPages: number;
      };
    }
  | ErrorResult;

export type FetchInmueblePorIdResult =
  | { success: true; data: InmuebleParaUI }
  | ErrorResult;

export type FetchOpcionesFiltrosResult =
  | {
      success: true;
      data: {
        tiposInmueble: Array<{ id: number; nombre: string }>;
        tiposTransaccion: Array<{ id: number; nombre: string }>;
        ciudades: string[];
      };
    }
  | ErrorResult;

function formatearPrecio(precio: number, moneda: string): string {
  const currency = moneda || "USD";

  const formatter = new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency: currency === "USD" ? "USD" : currency, 
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  return formatter.format(precio);
}

function transformarInmuebleParaUI(
  inmueble: InmuebleConRelaciones,
): InmuebleParaUI {
  const precio = Number(inmueble.precio);

  const imagenPrincipal =
    inmueble.imagen.find((img) => img.es_principal) ??
    inmueble.imagen[0] ??
    null;

  return {
    id: inmueble.inmueble_id.toString(),
    titulo: inmueble.titulo,
    descripcion: inmueble.descripcion,
    precio,
    moneda: inmueble.moneda,
    priceLabel: formatearPrecio(precio, inmueble.moneda),
    areaM2: inmueble.area_m2 ? Number(inmueble.area_m2) : null,
    numHabitaciones: inmueble.num_habitaciones,
    numBanos: inmueble.num_banos,
    fechaPublicacion: inmueble.fecha_publicacion?.toISOString() ?? null,
    estadoPublicacion: inmueble.estado_publicacion,
    tipoInmueble: inmueble.tipo_inmueble.nombre,
    tipoTransaccion: inmueble.tipo_transaccion.nombre,
    ubicacion: {
      callePrincipal: inmueble.ubicacion.calle_principal,
      numero: inmueble.ubicacion.numero,
      ciudad: inmueble.ubicacion.ciudad,
      estadoProvincia: inmueble.ubicacion.estado_provincia,
      pais: inmueble.ubicacion.pais,
      codigoPostal: inmueble.ubicacion.codigo_postal,
    },
    locationLabel: inmueble.ubicacion.estado_provincia
      ? `${inmueble.ubicacion.ciudad}, ${inmueble.ubicacion.estado_provincia}`
      : inmueble.ubicacion.ciudad,
    imagenPrincipal: imagenPrincipal?.url ?? null,
    imagenes: inmueble.imagen.map((img) => ({
      id: img.imagen_id.toString(),
      url: img.url,
      esPrincipal: img.es_principal ?? false,
      orden: img.orden ?? 0,
    })),
    caracteristicas: inmueble.caracteristica_inmueble.map((ci) => ({
      id: ci.caracteristica.caracteristica_id,
      nombre: ci.caracteristica.nombre,
      icono: ci.caracteristica.icono,
    })),
  };
}

export async function fetchInmuebles(
  params: InmuebleListParams = {},
): Promise<ListarInmueblesResult> {
  try {
    const result = await listarInmuebles(params);

    return {
      success: true,
      data: {
        inmuebles: result.inmuebles.map(transformarInmuebleParaUI),
        total: result.total,
        page: result.page,
        pageSize: result.pageSize,
        totalPages: result.totalPages,
      },
    };
  } catch (error) {
    console.error("Error en fetchInmuebles:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Error desconocido",
    };
  }
}

export async function fetchInmueblePorId(
  id: string,
): Promise<FetchInmueblePorIdResult> {
  try {
    const inmueble = await obtenerInmueblePorId(BigInt(id));

    if (!inmueble) {
      return {
        success: false,
        error: "Inmueble no encontrado",
      };
    }

    return {
      success: true,
      data: transformarInmuebleParaUI(inmueble),
    };
  } catch (error) {
    console.error("Error en fetchInmueblePorId:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Error desconocido",
    };
  }
}

export async function fetchOpcionesFiltros(): Promise<FetchOpcionesFiltrosResult> {
  try {
    const [tiposInmueble, tiposTransaccion, ciudades] = await Promise.all([
      obtenerTiposInmueble(),
      obtenerTiposTransaccion(),
      obtenerCiudadesDisponibles(),
    ]);

    return {
      success: true,
      data: {
        tiposInmueble: tiposInmueble.map((t) => ({
          id: t.tipo_inmueble_id,
          nombre: t.nombre,
        })),
        tiposTransaccion: tiposTransaccion.map((t) => ({
          id: t.tipo_transaccion_id,
          nombre: t.nombre,
        })),
        ciudades,
      },
    };
  } catch (error) {
    console.error("Error en fetchOpcionesFiltros:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Error desconocido",
    };
  }
}
