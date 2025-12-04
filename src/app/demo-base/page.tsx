"use client";

import { useState } from "react";

type ResultadoPrisma = {
  success: boolean;
  message?: string;
  version?: {
    version: string;
    current_database: string;
    current_user: string;
  };
  primeras_tablas?: string[];
  error?: string;
};

export default function DemoBase() {
  const [resultado, setResultado] = useState<ResultadoPrisma | null>(null);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const probarConexionPrisma = async () => {
    setCargando(true);
    setError(null);
    setResultado(null);

    try {
      const res = await fetch("/api/test-prisma");
      const data: ResultadoPrisma = await res.json();

      if (data.success) {
        setResultado(data);
      } else {
        setError(data.error || "Error desconocido");
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 flex items-center justify-center px-4">
      <div className="w-full max-w-3xl rounded-2xl bg-slate-900/80 border border-slate-800 shadow-xl p-6 md:p-8 space-y-6">
        <header className="space-y-2">
          <p className="text-xs font-mono uppercase tracking-[0.2em] text-sky-400/70">
            Debug · Base de datos
          </p>
          <h1 className="text-2xl md:text-3xl font-semibold text-slate-50">
            Prueba de conexión a PostgreSQL con Prisma
          </h1>
          <p className="text-sm text-slate-400">
            Este demo llama al endpoint{" "}
            <code className="rounded bg-slate-800 px-1.5 py-0.5 text-[11px]">
              /api/test-prisma
            </code>{" "}
            que usa <span className="font-semibold text-sky-300">Prisma ORM</span>{" "}
            para conectarse a tu base PostgreSQL.
          </p>
        </header>

        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={probarConexionPrisma}
            disabled={cargando}
            className="inline-flex items-center justify-center rounded-lg bg-sky-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-sky-500 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {cargando ? (
              <span className="inline-flex items-center gap-2">
                <span className="h-3 w-3 animate-spin rounded-full border-[2px] border-white/40 border-t-transparent" />
                Conectando…
              </span>
            ) : (
              "¡PROBAR CONEXIÓN CON PRISMA!"
            )}
          </button>

          {resultado?.success && (
            <span className="inline-flex items-center rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-300 border border-emerald-500/30">
              ✓ Conexión exitosa
            </span>
          )}

          {error && (
            <span className="inline-flex items-center rounded-full bg-rose-500/10 px-3 py-1 text-xs font-medium text-rose-300 border border-rose-500/30">
              ⚠ Error
            </span>
          )}
        </div>

        {error && (
          <div className="rounded-xl border border-rose-500/40 bg-rose-950/40 px-4 py-3 text-sm text-rose-100">
            <p className="font-semibold mb-1">Error al conectar con Prisma</p>
            <p className="text-rose-200">{error}</p>
          </div>
        )}

        {resultado && resultado.success && (
          <div className="space-y-4 rounded-xl border border-emerald-500/30 bg-emerald-950/20 p-4 md:p-5">
            <h2 className="text-lg font-semibold text-emerald-200">
              ✅ ¡Conexión con Prisma funcionando!
            </h2>

            {resultado.version && (
              <div className="grid gap-2 text-sm text-emerald-50/90">
                <div>
                  <span className="font-medium text-emerald-200">
                    Versión de PostgreSQL:
                  </span>
                  <p className="mt-0.5 text-emerald-100/90 break-all">
                    {resultado.version.version}
                  </p>
                </div>
                <div className="flex flex-wrap gap-4">
                  <div>
                    <span className="font-medium text-emerald-200">
                      Base actual:
                    </span>
                    <p className="mt-0.5 text-emerald-100/90">
                      {resultado.version.current_database}
                    </p>
                  </div>
                  <div>
                    <span className="font-medium text-emerald-200">
                      Usuario actual:
                    </span>
                    <p className="mt-0.5 text-emerald-100/90">
                      {resultado.version.current_user}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {resultado.primeras_tablas && (
              <div className="text-sm text-emerald-50/90">
                <p className="font-medium text-emerald-200 mb-1">
                  Primeras tablas encontradas en <code>public</code>:
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {resultado.primeras_tablas.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-0.5 text-xs font-mono"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <details className="mt-2 text-xs text-emerald-100/70">
              <summary className="cursor-pointer select-none text-emerald-200 underline underline-offset-4">
                Ver JSON completo de la respuesta
              </summary>
              <pre className="mt-2 max-h-72 overflow-auto rounded-lg bg-slate-950/60 p-3 text-[11px] leading-snug text-emerald-100">
                {JSON.stringify(resultado, null, 2)}
              </pre>
            </details>
          </div>
        )}

        {!resultado && !error && !cargando && (
          <p className="text-xs text-slate-500">
            Haz clic en el botón para probar la conexión a tu base de datos usando
            Prisma ORM.
          </p>
        )}
      </div>
    </div>
  );
}
