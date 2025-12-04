// src/app/propiedades/page.tsx
"use client";

import { useMemo } from "react";
import { useRouter } from "next/navigation";
import { Header } from "@/components/organisms/header";
import { Footer } from "@/components/organisms/footer";
import { FiltersSidebar } from "@/components/organisms/properties/filters-sidebar";
import { PropertyListCard } from "@/components/molecules/property-list-card";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
    PaginationEllipsis,
} from "@/components/ui/pagination";
import { useChatStore } from "@/store/chat.store";
import { Button } from "@/components/ui/button";
import { useInmuebles, type SortOption } from "@/hooks/use-inmuebles";
import { Loader2 } from "lucide-react";
import type { InmuebleParaUI } from "@/actions/inmueble.actions";

// 🖼️ Imágenes por defecto (todas deben estar permitidas en next.config.js)
const DEFAULT_IMAGES: string[] = [
    "https://lh3.googleusercontent.com/aida-public/AB6AXuDEewPRLx9Kqt9UtkUlrVdqP_qO_3kWt0szLrznB_18GMzd2ghy0t-GAtc8Ap9GDLhTV932tSq0gwkwZ4cHglln4E64Ey2vjZOD4dgv7Zvg8kXIavJouNm2ohY1ak3fx5ld_t0FcLSLm7PCAmplSr3Q_zILDhzFMKG22uOpau_gPLAIXgQqO4YnwNxMgclPxWqKvTY5MxfXI_pcfNTRaycksCz-5RC84osOcFrXy8MzrEh_8Z2EX0ohoSv1l7yHxEyGjFFkSXB_V_Q",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuCMd_LtXYvWfGO_slPf2kiBDczEdI3VyoKFyvA-NO80a6Ze8w4LqN1YQo9mxrvChh-j_msGQxvFJyxh5RN2WJYpoyU7dqndINnP1FtR_os7J1oxA8wO0dkYiwP9Z8VxUue4hNq7taMy5qYqxo_tonSh4XY4bygWGhU7sqqeU2U2gHh_wcGIAjQd0jonTBV2Y955bPjt_dkcB2ma03cdaER64um4HUA_DKNQQ_vwtxq_X126rohE8a-4UjDjh4EjYsIczw6UWrgCMq4",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuBApD0YKAcMQNjc1MwIglXhDqFdgkjvF9g0VDwQggGew5VWVF2kYcIWZ798WZLbJ2OVT4_2VGm01XN2byNDAbrh92M546dAn5KSy5Hnm9nPU2MY-iWPWyHEj4xPbn3EyqKuuc3lUUc-a7Xub7LQbzU494KV3o6IICpiMUmHjl7vbBEffU7nc72fJ0cdWOihJnvWlq20jP1mJ0gzyiuY2lK4RfphKM3Eq4CcT-aRF4G3u4-n8hlaxn_DOkoejl4nblzFKfldvZZ1edM",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuD40JZecGLga0hpqqxB9I1SbnXFN7verfUvGKBOxok58m9_oXj-CtAONQNA7IiTFavloLemRTql7Tx6wDbxqzLCaJzxXdSZejwQKFAdEBb_mJQXkmVxmF98RdRW37yCSQPmgOCHlBMH83YwLbIg38b0zPeB2S6uxHu7rW2px9OiGZdQVkVD6it05enF8iHJYitRZIfwVr59-BwEZeAjZ6FX3T2wsTpmy_IJBpWsQO66aV7E-6Rg9hSp7U4hJ8T-MvG2Q2paYVNbjR4",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuBS115DcqopS_Xi5oS7Arb90HEloYfBhGPkCeOKOjRmr8OG5S0nQ6RLRvwzZie-nv3PwiVEfa6zn0QVZYxJw9Vn244XC0T1-LnfXXUNz3f0L_C1fofjVuBQrWJyXBbDyaHLSfGtzkI4NvZ7zcgS7kjvDNgWVws-nxDVpphhY-RIHE8bWZQbMU05peH-g11fWhLX6-t_ZZQyGuGT79S8kt30pXpOj6tq6EybZQYbi4aRPienwloKGSKqOkCSLrqnm0SdHgCZwhEotSk",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuBWl12aY5ugWH0z7QrHE5b69PMDdyw2HiUotgWfKdelqZ2TGwWuPhCmD0suDhU2AydUkW4yof6BzxPSzimlDPwSe5SvMzMKEvRzEAiEXOVDD2nPQp_UFon0Ex8D05wzI8Z9MmD6aAsjlj63bP_MEKSxGzyESJkN2qGC3kH2sd7D6_Gs2y8iEf5Kt36UKJU4CViSC87d6uudeJ7BtSdNMVWQxudo593WoAs4-rb1LojFr_QIwBHIHyVvo3Ca9HLXZPbb3GJukqkJIKU"
];

// 🔧 Helper: imagen estable por inmueble
function getInmuebleImage(inmueble: InmuebleParaUI): string {
    // 1) Si ya tenemos imagenPrincipal, usarla
    if (inmueble.imagenPrincipal) {
        return inmueble.imagenPrincipal;
    }

    // 2) Si hay imágenes en el array, usar la primera
    if (inmueble.imagenes.length > 0) {
        return inmueble.imagenes[0].url;
    }

    // 3) Fallback determinístico: hash sencillo del id para elegir una default
    if (DEFAULT_IMAGES.length === 0) {
        return "/placeholder-property.jpg";
    }

    const hash = Array.from(inmueble.id).reduce(
        (acc, char) => acc + char.charCodeAt(0),
        0
    );
    const index = hash % DEFAULT_IMAGES.length;
    return DEFAULT_IMAGES[index];
}

export default function PropertiesPage() {
    const { open } = useChatStore();
    const router = useRouter();

    const {
        inmuebles,
        total,
        page,
        totalPages,
        isLoading,
        error,
        filters,
        opcionesFiltros,
        setTipoInmueble,
        setTipoTransaccion,
        setUbicacionQuery,
        setSortBy,
        setPage,
        clearFilters,
    } = useInmuebles();

    const pageItems: (number | "...")[] = useMemo(() => {
        if (totalPages <= 5) {
            return Array.from({ length: totalPages }, (_, i) => i + 1);
        }

        if (page <= 3) {
            return [1, 2, 3, 4, "...", totalPages];
        }

        if (page >= totalPages - 2) {
            return [1, "...", totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
        }

        return [1, "...", page - 1, page, page + 1, "...", totalPages];
    }, [page, totalPages]);

    const handlePageChange = (nextPage: number) => {
        if (nextPage < 1 || nextPage > totalPages) return;
        setPage(nextPage);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <div className="relative flex min-h-screen w-full flex-col">
            <Header />

            <main className="container mx-auto flex-1 px-4 py-8">
                <div className="flex flex-col gap-8 lg:flex-row">
                    <FiltersSidebar
                        propertyType={filters.tipoInmueble}
                        listingType={filters.tipoTransaccion}
                        locationQuery={filters.ubicacionQuery}
                        tiposInmueble={opcionesFiltros?.tiposInmueble}
                        tiposTransaccion={opcionesFiltros?.tiposTransaccion}
                        onPropertyTypeChange={setTipoInmueble}
                        onListingTypeChange={setTipoTransaccion}
                        onLocationQueryChange={setUbicacionQuery}
                        onClear={clearFilters}
                    />

                    <section className="w-full lg:w-3/4 xl:w-4/5">
                        <h1 className="mb-6 text-4xl font-black leading-tight tracking-[-0.033em]">
                            Encuentra tu casa ideal
                        </h1>

                        <div className="mb-6 flex flex-col gap-4 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between">
                            <p>
                                {isLoading ? "Cargando..." : `${total} propiedades encontradas`}
                            </p>

                            <select
                                className="h-11 rounded-lg border border-border bg-card px-3 text-sm font-normal text-foreground outline-none focus:border-primary focus:ring-0"
                                value={filters.sortBy}
                                onChange={(e) => setSortBy(e.target.value as SortOption)}
                            >
                                <option value="relevancia">Ordenar por: Relevancia</option>
                                <option value="precio-asc">Ordenar por: Precio más bajo</option>
                                <option value="precio-desc">Ordenar por: Precio más alto</option>
                                <option value="fecha-desc">Ordenar por: Más recientes</option>
                            </select>

                            <Button
                                type="button"
                                className="h-11 px-4 text-sm font-semibold"
                                onClick={open}
                            >
                                Hablar con un agente
                            </Button>
                        </div>

                        {error && (
                            <div className="mb-6 rounded-lg border border-destructive/50 bg-destructive/10 p-4 text-destructive">
                                <p className="text-sm font-medium">Error al cargar propiedades</p>
                                <p className="text-sm">{error}</p>
                            </div>
                        )}

                        {isLoading ? (
                            <div className="flex h-64 items-center justify-center">
                                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                            </div>
                        ) : (
                            <>
                                {/* Grid */}
                                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
                                    {inmuebles.length === 0 ? (
                                        <div className="col-span-full py-12 text-center">
                                            <p className="text-lg font-medium text-foreground">
                                                No se encontraron propiedades
                                            </p>
                                            <p className="mt-1 text-sm text-muted-foreground">
                                                Intenta ajustar los filtros de búsqueda
                                            </p>
                                            <Button
                                                variant="outline"
                                                className="mt-4"
                                                onClick={clearFilters}
                                            >
                                                Limpiar filtros
                                            </Button>
                                        </div>
                                    ) : (
                                        inmuebles.map((inmueble) => (
                                            <PropertyListCard
                                                key={inmueble.id}
                                                title={inmueble.titulo}
                                                location={inmueble.locationLabel}
                                                priceLabel={inmueble.priceLabel}
                                                bedrooms={inmueble.numHabitaciones ?? 0}
                                                bathrooms={inmueble.numBanos ?? 0}
                                                area={inmueble.areaM2 ?? 0}
                                                imageUrl={getInmuebleImage(inmueble)}
                                                onViewDetails={() =>
                                                    router.push(`/propiedades/${inmueble.id}`)
                                                }
                                            />
                                        ))
                                    )}
                                </div>

                                {totalPages > 1 && (
                                    <div className="mt-10 flex justify-center">
                                        <Pagination>
                                            <PaginationContent>
                                                <PaginationItem>
                                                    <PaginationPrevious
                                                        href="#"
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            handlePageChange(page - 1);
                                                        }}
                                                        className={
                                                            page === 1
                                                                ? "pointer-events-none opacity-50"
                                                                : ""
                                                        }
                                                    />
                                                </PaginationItem>

                                                {pageItems.map((item, idx) =>
                                                    item === "..." ? (
                                                        <PaginationItem key={`ellipsis-${idx}`}>
                                                            <PaginationEllipsis />
                                                        </PaginationItem>
                                                    ) : (
                                                        <PaginationItem key={item}>
                                                            <PaginationLink
                                                                href="#"
                                                                isActive={item === page}
                                                                onClick={(e) => {
                                                                    e.preventDefault();
                                                                    handlePageChange(item);
                                                                }}
                                                            >
                                                                {item}
                                                            </PaginationLink>
                                                        </PaginationItem>
                                                    )
                                                )}

                                                <PaginationItem>
                                                    <PaginationNext
                                                        href="#"
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            handlePageChange(page + 1);
                                                        }}
                                                        className={
                                                            page === totalPages
                                                                ? "pointer-events-none opacity-50"
                                                                : ""
                                                        }
                                                    />
                                                </PaginationItem>
                                            </PaginationContent>
                                        </Pagination>
                                    </div>
                                )}
                            </>
                        )}
                    </section>
                </div>
            </main>

            <Footer />
        </div>
    );
}
