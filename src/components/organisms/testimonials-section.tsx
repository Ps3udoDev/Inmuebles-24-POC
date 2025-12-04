import Image from "next/image";

export function TestimonialsSection() {
  return (
    <section className="w-full py-20 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="mb-8 text-3xl font-bold tracking-tight">
          Lo que dicen nuestros clientes
        </h2>
        
        <div className="relative">
          <div className="rounded-xl bg-card p-8 shadow-lg">
            <Image
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCcoGDMImwAwbgqVszDZCPSjOZW8RahG4s9HZaV1M8JOcir-K6ujMyOKpCXbpHQYZT2ARwD25I9kNh2lb5Un1-ltamFL6McKPxHks6oWKfYZLGsBSNKXNsq_B2DPTaztSwt2r97koEZUPQKP-N-Uk7BKqk0AUwIuQQZlDhDfkw0foVT0Rn-GNXAEsTSlVpanhTRd3saSIayFc-te7r-tVPji9r9Xkgi3WW44TjR7dmKFimhzpNAONmLe7w6IpkOuIjzCRBOUJFGSrk"
              alt="Cliente satisfecho"
              width={96}
              height={96}
              className="mx-auto -mt-20 mb-4 h-24 w-24 rounded-full border-4 border-card object-cover"
            />
            <p className="text-sm italic text-muted-foreground">
              &quot;El equipo de CasaIdeal fue increíblemente profesional y nos ayudó a encontrar la casa de nuestros sueños en tiempo récord. ¡No podríamos estar más felices!&quot;
            </p>
            <p className="mt-4 font-semibold">Ana y Carlos García</p>
            <p className="text-xs text-muted-foreground">Compradores satisfechos</p>
          </div>
        </div>
      </div>
    </section>
  );
}