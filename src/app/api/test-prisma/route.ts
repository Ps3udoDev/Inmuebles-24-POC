import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const versionRows =
      await prisma.$queryRawUnsafe<
        { version: string; current_database: string; current_user: string }[]
      >("SELECT version(), current_database(), current_user");

    const tables =
      await prisma.$queryRawUnsafe<{ tablename: string }[]>(
        `
        SELECT tablename FROM pg_tables 
        WHERE schemaname = 'public'
        LIMIT 10
      `
      );

    const info = versionRows[0];

    return NextResponse.json({
      success: true,
      message: "¡Conexión con Prisma exitosa!",
      version: info,
      primeras_tablas: tables.map((t) => t.tablename),
    });
  } catch (error: any) {
    console.error("Error conectando con Prisma:", error);
    return NextResponse.json(
      {
        success: false,
        error: error.message,
      },
      { status: 500 }
    );
  }
}
