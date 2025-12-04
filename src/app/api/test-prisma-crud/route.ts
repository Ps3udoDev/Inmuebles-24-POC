// src/app/api/test-prisma-crud/route.ts
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    // 1) Tipos de inmueble (Casa, Apartamento, etc.)
    const tiposInmueble = await prisma.tipo_inmueble.findMany({
      orderBy: { nombre: "asc" },
    });

    // 2) Inmuebles con algunas relaciones básicas
    const inmuebles = await prisma.inmueble.findMany({
      take: 10, // solo los primeros 10 para probar
      orderBy: { fecha_publicacion: "desc" },
      include: {
        tipo_inmueble: true,
        tipo_transaccion: true,
        ubicacion: true,
        imagen: {
          orderBy: [
            { es_principal: "desc" },
            { orden: "asc" },
          ],
          take: 5, // hasta 5 imágenes para el debug
        },
      },
    });

    // 3) Mapeo simple para que el JSON sea más legible
    const mappedInmuebles = inmuebles.map((i) => ({
      id: i.inmueble_id.toString(),
      titulo: i.titulo,
      descripcion: i.descripcion,
      precio: Number(i.precio),
      moneda: i.moneda,
      estadoPublicacion: i.estado_publicacion,
      fechaPublicacion: i.fecha_publicacion?.toISOString() ?? null,
      tipoInmueble: i.tipo_inmueble?.nombre ?? null,
      tipoTransaccion: i.tipo_transaccion?.nombre ?? null,
      ubicacion: i.ubicacion && {
        callePrincipal: i.ubicacion.calle_principal,
        numero: i.ubicacion.numero,
        ciudad: i.ubicacion.ciudad,
        estadoProvincia: i.ubicacion.estado_provincia,
        pais: i.ubicacion.pais,
        codigoPostal: i.ubicacion.codigo_postal,
      },
      imagenes: i.imagen.map((img) => ({
        id: img.imagen_id.toString(),
        url: img.url,
        esPrincipal: img.es_principal ?? false,
        orden: img.orden ?? 0,
      })),
    }));

    return NextResponse.json({
      success: true,
      tiposInmueble,       // raw de la tabla tipo_inmueble
      inmuebles: mappedInmuebles,
      counts: {
        tiposInmueble: tiposInmueble.length,
        inmuebles: mappedInmuebles.length,
      },
    });
  } catch (error: any) {
    console.error("Error en /api/test-prisma-crud:", error);
    return NextResponse.json(
      {
        success: false,
        error: error.message ?? "Error desconocido",
      },
      { status: 500 },
    );
  }
}
