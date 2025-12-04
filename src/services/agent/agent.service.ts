import {
  listarInmuebles,
  obtenerInmueblePorId,
  obtenerTiposInmueble,
  obtenerTiposTransaccion,
  type InmuebleFilters,
  type InmuebleConRelaciones,
} from "@/services/inmueble.service";

export interface ToolCallResult {
  success: boolean;
  data?: unknown;
  error?: string;
}

interface ObtenerInmueblesArgs {
  tipoInmueble?: string;
  tipoTransaccion?: string;
  ubicacionQuery?: string;
  precioMax?: number;
  habitacionesMin?: number;
}

interface ObtenerDetalleArgs {
  inmuebleId: string;
}

interface CalcularROIArgs {
  precioCompra: number;
  precioVenta: number;
}

interface CalcularHipotecaArgs {
  precioInmueble: number;
  entradaInicial: number;
  tasaInteresAnual: number;
  plazoAnios: number;
}

function formatearPrecio(precio: number, moneda: string): string {
  const formatter = new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency: moneda === "USD" ? "USD" : "EUR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
  return formatter.format(precio);
}

function transformarInmuebleParaAgente(inmueble: InmuebleConRelaciones) {
  const precio = Number(inmueble.precio);
  const imagenPrincipal =
    inmueble.imagen.find((img) => img.es_principal) ?? inmueble.imagen[0] ?? null;

  return {
    id: inmueble.inmueble_id.toString(),
    titulo: inmueble.titulo,
    descripcion: inmueble.descripcion,
    precio: formatearPrecio(precio, inmueble.moneda),
    precioNumerico: precio,
    moneda: inmueble.moneda,
    areaM2: inmueble.area_m2 ? Number(inmueble.area_m2) : null,
    habitaciones: inmueble.num_habitaciones,
    banos: inmueble.num_banos,
    tipoInmueble: inmueble.tipo_inmueble.nombre,
    tipoTransaccion: inmueble.tipo_transaccion.nombre,
    ubicacion: {
      direccion: inmueble.ubicacion.calle_principal,
      numero: inmueble.ubicacion.numero,
      ciudad: inmueble.ubicacion.ciudad,
      provincia: inmueble.ubicacion.estado_provincia,
      pais: inmueble.ubicacion.pais,
    },
    ubicacionResumen: inmueble.ubicacion.estado_provincia
      ? `${inmueble.ubicacion.ciudad}, ${inmueble.ubicacion.estado_provincia}`
      : inmueble.ubicacion.ciudad,
    imagenPrincipal: imagenPrincipal?.url ?? null,
    caracteristicas: inmueble.caracteristica_inmueble.map((ci) => ci.caracteristica.nombre),
  };
}

async function ejecutarObtenerInmueblesActivos(
  args: ObtenerInmueblesArgs
): Promise<ToolCallResult> {
  try {
    const filters: InmuebleFilters = {};

    if (args.tipoInmueble) {
      filters.tipoInmueble = args.tipoInmueble;
    }
    if (args.tipoTransaccion) {
      filters.tipoTransaccion = args.tipoTransaccion;
    }
    if (args.ubicacionQuery) {
      filters.ubicacionQuery = args.ubicacionQuery;
    }
    if (args.precioMax) {
      filters.precioMax = args.precioMax;
    }
    if (args.habitacionesMin) {
      filters.habitacionesMin = args.habitacionesMin;
    }

    const result = await listarInmuebles({
      filters,
      pageSize: 10, 
      sortBy: "relevancia",
    });

    const inmuebles = result.inmuebles.map(transformarInmuebleParaAgente);

    return {
      success: true,
      data: {
        total: result.total,
        mostrando: inmuebles.length,
        inmuebles,
      },
    };
  } catch (error) {
    console.error("Error en obtenerInmueblesActivos:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Error al obtener inmuebles",
    };
  }
}

async function ejecutarObtenerDetalleInmueble(
  args: ObtenerDetalleArgs
): Promise<ToolCallResult> {
  try {
    const inmueble = await obtenerInmueblePorId(BigInt(args.inmuebleId));

    if (!inmueble) {
      return {
        success: false,
        error: "Inmueble no encontrado",
      };
    }

    return {
      success: true,
      data: transformarInmuebleParaAgente(inmueble),
    };
  } catch (error) {
    console.error("Error en obtenerDetalleInmueble:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Error al obtener detalle",
    };
  }
}

function ejecutarCalcularROI(args: CalcularROIArgs): ToolCallResult {
  const { precioCompra, precioVenta } = args;

  if (precioCompra <= 0) {
    return {
      success: false,
      error: "El precio de compra debe ser mayor a cero",
    };
  }

  const roi = ((precioVenta - precioCompra) / precioCompra) * 100;
  const ganancia = precioVenta - precioCompra;

  return {
    success: true,
    data: {
      precioCompra,
      precioVenta,
      ganancia,
      roiPorcentaje: roi.toFixed(2),
      resumen:
        roi >= 0
          ? `La inversión tendría un ROI del ${roi.toFixed(2)}%, con una ganancia de ${formatearPrecio(ganancia, "EUR")}`
          : `La inversión tendría una pérdida del ${Math.abs(roi).toFixed(2)}%, perdiendo ${formatearPrecio(Math.abs(ganancia), "EUR")}`,
    },
  };
}

function ejecutarCalcularHipoteca(args: CalcularHipotecaArgs): ToolCallResult {
  const { precioInmueble, entradaInicial, tasaInteresAnual, plazoAnios } = args;

  if (entradaInicial >= precioInmueble) {
    return {
      success: false,
      error: "La entrada inicial no puede ser mayor o igual al precio del inmueble",
    };
  }

  const principal = precioInmueble - entradaInicial;
  const tasaMensual = tasaInteresAnual / 100 / 12;
  const numPagos = plazoAnios * 12;

  const cuotaMensual =
    (principal * (tasaMensual * Math.pow(1 + tasaMensual, numPagos))) /
    (Math.pow(1 + tasaMensual, numPagos) - 1);

  const totalPagado = cuotaMensual * numPagos;
  const totalIntereses = totalPagado - principal;

  return {
    success: true,
    data: {
      precioInmueble: formatearPrecio(precioInmueble, "EUR"),
      entradaInicial: formatearPrecio(entradaInicial, "EUR"),
      cantidadFinanciada: formatearPrecio(principal, "EUR"),
      tasaInteresAnual: `${tasaInteresAnual}%`,
      plazoAnios,
      cuotaMensual: formatearPrecio(cuotaMensual, "EUR"),
      totalAPagar: formatearPrecio(totalPagado, "EUR"),
      totalIntereses: formatearPrecio(totalIntereses, "EUR"),
      resumen: `Con una entrada de ${formatearPrecio(entradaInicial, "EUR")} y financiando ${formatearPrecio(principal, "EUR")} a ${plazoAnios} años al ${tasaInteresAnual}%, la cuota mensual sería de aproximadamente ${formatearPrecio(cuotaMensual, "EUR")}`,
    },
  };
}

async function ejecutarObtenerTiposDisponibles(): Promise<ToolCallResult> {
  try {
    const [tiposInmueble, tiposTransaccion] = await Promise.all([
      obtenerTiposInmueble(),
      obtenerTiposTransaccion(),
    ]);

    return {
      success: true,
      data: {
        tiposInmueble: tiposInmueble.map((t) => t.nombre),
        tiposTransaccion: tiposTransaccion.map((t) => t.nombre),
      },
    };
  } catch (error) {
    console.error("Error en obtenerTiposDisponibles:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Error al obtener tipos",
    };
  }
}

export async function ejecutarToolCall(
  functionName: string,
  args: Record<string, unknown>
): Promise<string> {
  let result: ToolCallResult;

  switch (functionName) {
    case "obtenerInmueblesActivos":
      result = await ejecutarObtenerInmueblesActivos(args as ObtenerInmueblesArgs);
      break;

    case "obtenerDetalleInmueble":
      result = await ejecutarObtenerDetalleInmueble(args as unknown as ObtenerDetalleArgs);
      break;

    case "calcularROI":
      result = ejecutarCalcularROI(args as unknown as CalcularROIArgs);
      break;

    case "calcularHipoteca":
      result = ejecutarCalcularHipoteca(args as unknown as CalcularHipotecaArgs);
      break;

    case "obtenerTiposDisponibles":
      result = await ejecutarObtenerTiposDisponibles();
      break;

    default:
      result = {
        success: false,
        error: `Herramienta desconocida: ${functionName}`,
      };
  }

  return JSON.stringify(result);
}
