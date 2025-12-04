import prisma from "@/lib/prisma";
import type { Prisma } from "@/lib/generated/prisma/client";

export interface InmuebleFilters {
  tipoInmueble?: string;
  tipoTransaccion?: string;
  ubicacionQuery?: string;
  precioMin?: number;
  precioMax?: number;
  habitacionesMin?: number;
  banosMin?: number;
}

export interface InmuebleListParams {
  filters?: InmuebleFilters;
  sortBy?: "relevancia" | "precio-asc" | "precio-desc" | "fecha-desc";
  page?: number;
  pageSize?: number;
}

export interface InmuebleListResult {
  inmuebles: InmuebleConRelaciones[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export type InmuebleConRelaciones = Prisma.inmuebleGetPayload<{
  include: {
    tipo_inmueble: true;
    tipo_transaccion: true;
    ubicacion: true;
    imagen: true;
    caracteristica_inmueble: {
      include: {
        caracteristica: true;
      };
    };
  };
}>;

export async function listarInmuebles(
  params: InmuebleListParams = {}
): Promise<InmuebleListResult> {
  const {
    filters = {},
    sortBy = "relevancia",
    page = 1,
    pageSize = 6,
  } = params;

  const where: Prisma.inmuebleWhereInput = {
    estado_publicacion: {
      equals: "activo",
      mode: "insensitive",
    },
  };

  if (filters.tipoInmueble && filters.tipoInmueble !== "Todos") {
    where.tipo_inmueble = {
      nombre: filters.tipoInmueble,
    };
  }

  if (filters.tipoTransaccion && filters.tipoTransaccion !== "Todos") {
    where.tipo_transaccion = {
      nombre: filters.tipoTransaccion,
    };
  }

  if (filters.ubicacionQuery?.trim()) {
    const query = filters.ubicacionQuery.trim();
    where.ubicacion = {
      OR: [
        { ciudad: { contains: query, mode: "insensitive" } },
        { estado_provincia: { contains: query, mode: "insensitive" } },
        { calle_principal: { contains: query, mode: "insensitive" } },
      ],
    };
  }

  if (filters.precioMin !== undefined || filters.precioMax !== undefined) {
    where.precio = {};
    if (filters.precioMin !== undefined) {
      (where.precio as Prisma.DecimalFilter).gte = filters.precioMin;
    }
    if (filters.precioMax !== undefined) {
      (where.precio as Prisma.DecimalFilter).lte = filters.precioMax;
    }
  }

  if (filters.habitacionesMin !== undefined) {
    where.num_habitaciones = {
      gte: filters.habitacionesMin,
    };
  }

  if (filters.banosMin !== undefined) {
    where.num_banos = {
      gte: filters.banosMin,
    };
  }

  let orderBy:
    | Prisma.inmuebleOrderByWithRelationInput
    | Prisma.inmuebleOrderByWithRelationInput[];

  switch (sortBy) {
    case "precio-asc":
      orderBy = { precio: "asc" };
      break;
    case "precio-desc":
      orderBy = { precio: "desc" };
      break;
    case "fecha-desc":
      orderBy = { fecha_publicacion: "desc" };
      break;
    case "relevancia":
    default:
      orderBy = [
        { fecha_publicacion: "desc" },
        { precio: "asc" },
      ];
      break;
  }

  const [inmuebles, total] = await Promise.all([
    prisma.inmueble.findMany({
      where,
      orderBy,
      skip: (page - 1) * pageSize,
      take: pageSize,
      include: {
        tipo_inmueble: true,
        tipo_transaccion: true,
        ubicacion: true,
        imagen: {
          orderBy: [{ es_principal: "desc" }, { orden: "asc" }],
        },
        caracteristica_inmueble: {
          include: {
            caracteristica: true,
          },
        },
      },
    }),
    prisma.inmueble.count({ where }),
  ]);

  return {
    inmuebles,
    total,
    page,
    pageSize,
    totalPages: Math.max(1, Math.ceil(total / pageSize)),
  };
}

export async function obtenerInmueblePorId(
  inmuebleId: bigint | number
): Promise<InmuebleConRelaciones | null> {
  return prisma.inmueble.findUnique({
    where: {
      inmueble_id: BigInt(inmuebleId),
    },
    include: {
      tipo_inmueble: true,
      tipo_transaccion: true,
      ubicacion: true,
      imagen: {
        orderBy: [{ es_principal: "desc" }, { orden: "asc" }],
      },
      caracteristica_inmueble: {
        include: {
          caracteristica: true,
        },
      },
    },
  });
}

export async function obtenerTiposInmueble() {
  return prisma.tipo_inmueble.findMany({
    orderBy: { nombre: "asc" },
  });
}

export async function obtenerTiposTransaccion() {
  return prisma.tipo_transaccion.findMany({
    orderBy: { nombre: "asc" },
  });
}

export async function obtenerCiudadesDisponibles(): Promise<string[]> {
  const ubicaciones = await prisma.ubicacion.findMany({
    where: {
      inmueble: {
        estado_publicacion: {
          equals: "activo",
          mode: "insensitive",
        },
      },
    },
    select: {
      ciudad: true,
    },
    distinct: ["ciudad"],
    orderBy: { ciudad: "asc" },
  });

  return ubicaciones.map((u) => u.ciudad);
}
