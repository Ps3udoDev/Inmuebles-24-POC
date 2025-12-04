"use client";

import { useState } from "react";

type Caracteristica = {
  caracteristica_id: number;
  nombre: string;
  icono: string | null;
};

type ResultadoCrud = {
  success: boolean;
  message?: string;
  select_inicial?: Caracteristica[];
  creada?: Caracteristica;
  leida?: Caracteristica | null;
  actualizada?: Caracteristica;
  eliminada?: Caracteristica;
  error?: string;
};

export default function DemoCrud() {
  const [resultado, setResultado] = useState<ResultadoCrud | null>(null);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const probarCrud = async () => {
    setCargando(true);
    setError(null);
    setResultado(null);

    try {
      const res = await fetch("/api/test-prisma-crud");
      const data: ResultadoCrud = await res.json();

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
      <div className="w-full max-w-4xl rounded-2xl bg-slate-900/80 border border-slate-800 shadow-xl p-6 md:p-8 space-y-6">
        <header className="space-y-2">
          <p className="text-xs font-mono uppercase tracking-[0.2em] text-sky-400/70">
            Debug · Prisma CRUD
          </p>
          <h1 className="text-2xl md:text-3xl font-semibold text-slate-50">
            Prueba de CRUD con Prisma sobre la tabla <code>caracteristica</code>
          </h1>
          <p className="text-sm text-slate-400">
            Este demo llama al endpoint{" "}
            <code className="rounded bg-slate-800 px-1.5 py-0.5 text-[11px]">
              /api/test-prisma-crud
            </code>{" "}
            y realiza un ciclo completo:{" "}
            <span className="font-semibold text-sky-300">
              SELECT → INSERT → SELECT → UPDATE → DELETE
            </span>
            .
          </p>
        </header>

        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={probarCrud}
            disabled={cargando}
            className="inline-flex items-center justify-center rounded-lg bg-sky-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-sky-500 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {cargando ? (
              <span className="inline-flex items-center gap-2">
                <span className="h-3 w-3 animate-spin rounded-full border-[2px] border-white/40 border-t-transparent" />
                Ejecutando CRUD…
              </span>
            ) : (
              "PROBAR CRUD CON PRISMA"
            )}
          </button>

          {resultado?.success && (
            <span className="inline-flex items-center rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-300 border border-emerald-500/30">
              ✓ Operaciones ejecutadas correctamente
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
            <p className="font-semibold mb-1">Error en el CRUD</p>
            <p className="text-rose-200">{error}</p>
          </div>
        )}

        {resultado && resultado.success && (
          <div className="space-y-6 rounded-xl border border-emerald-500/30 bg-emerald-950/10 p-4 md:p-5 text-sm">
            {/* SELECT inicial */}
            <section>
              <h2 className="font-semibold text-emerald-200 mb-2">
                1. SELECT inicial (primeras características)
              </h2>
              {resultado.select_inicial && resultado.select_inicial.length > 0 ? (
                <ul className="space-y-1">
                  {resultado.select_inicial.map((c) => (
                    <li
                      key={c.caracteristica_id}
                      className="flex items-center justify-between rounded border border-emerald-500/20 bg-emerald-500/5 px-3 py-1.5"
                    >
                      <span className="font-mono text-xs">
                        #{c.caracteristica_id}
                      </span>
                      <span className="flex-1 mx-3 truncate">{c.nombre}</span>
                      <span className="text-xs text-emerald-200/80">
                        {c.icono || "sin icono"}
                      </span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-emerald-100/80">
                  No hay características registradas aún.
                </p>
              )}
            </section>

            {/* INSERT */}
            <section>
              <h2 className="font-semibold text-emerald-200 mb-1">
                2. INSERT → registro creado
              </h2>
              <pre className="rounded bg-slate-950/60 p-3 text-[11px] max-h-40 overflow-auto">
                {JSON.stringify(resultado.creada, null, 2)}
              </pre>
            </section>

            {/* UPDATE */}
            <section>
              <h2 className="font-semibold text-emerald-200 mb-1">
                3. UPDATE → registro actualizado
              </h2>
              <pre className="rounded bg-slate-950/60 p-3 text-[11px] max-h-40 overflow-auto">
                {JSON.stringify(resultado.actualizada, null, 2)}
              </pre>
            </section>

            {/* DELETE */}
            <section>
              <h2 className="font-semibold text-emerald-200 mb-1">
                4. DELETE → registro eliminado
              </h2>
              <pre className="rounded bg-slate-950/60 p-3 text-[11px] max-h-40 overflow-auto">
                {JSON.stringify(resultado.eliminada, null, 2)}
              </pre>
            </section>

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
            Haz clic en el botón para ejecutar operaciones de prueba (SELECT, INSERT,
            UPDATE, DELETE) con Prisma ORM.
          </p>
        )}
      </div>
    </div>
  );
}
