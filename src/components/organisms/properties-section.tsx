import { PropertyCard } from "@/components/molecules/property-card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const featuredProperties = [
  {
    id: 1,
    title: "Villa Moderna con Piscina",
    location: "Pozuelo de Alarcón, Madrid",
    price: "€ 1,250,000",
    bedrooms: 4,
    bathrooms: 3,
    area: "350 m²",
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDKw65pwGGZCLM1rCQYTTE2F1jXboD0Hu9t_orlm1Ym7OfVEmNrsERiW7Bzw8U8_2TG1iU5G8GTNKQksPZ0O3VUR44RXftQmz6pckiSQpg0qQYYgmqzqY8WvTD5C_eOF8bnNQdrtevAsNv1GYC3yr7bnkhq6aXk-s3O0usZulTn77kK6sqHKL3XBpYGloZ_skb4ALdIYZnXg53MNnmsteUm5RUpoxXciBTu1tbH1qmtNHvYQatUovbTP228kNU_dezImMSkx_WWYlE",
    type: "Venta" as const,
  },
  {
    id: 2,
    title: "Apartamento Céntrico",
    location: "Salamanca, Madrid",
    price: "€ 2,500/mes",
    bedrooms: 2,
    bathrooms: 2,
    area: "120 m²",
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuB_XpMWzVUJgSPU3LknG1xEPuWR28VAO8dKMtylTMm1XMjHVi3v1Bf-b9QIBFfwCZR_KXbD1Ii0G_LYkoP9kICtgwlKLKeLPWqqX7SCcqhb4pTWEhG-R-Jf1vycMi3F2wb9QF7F4AB5OD5NLDqMdMa1vKx0NYtGbff0G5Ke36HPHBW5wRCFiWhI7kcYXbPPevmxkdrAHbL1--u8ZCcnA-ptHZUpNZqQxSzIdjKG2vWZiCm9ZfjpfY2bcgUO9jxodouSYwXnbcNqBgY",
    type: "Alquiler" as const,
  },
  {
    id: 3,
    title: "Casa de Campo con Jardín",
    location: "Las Rozas, Madrid",
    price: "€ 850,000",
    bedrooms: 5,
    bathrooms: 4,
    area: "420 m²",
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAcPBpxrwP07OhbfStfTfbMWPkly5jdz6b0vnUfp17biW3AZOv7ISrxKdJYqaRTN52RZcl1hPY26B9i-maJcT9E000J1EYzihxykJw4V8S55o-3fVeJj_QcV50oe58JYu9k3Mc4WlcnyDBr5ggcU3Y7OvmK0waQTwfmoISZO0jW21hBeEIgpDWyDbjiSEsDTb3hqCwtjKDTi4gpSE2JiP3PCn2P5MeJilzestsQ3MMANmjwf_HoK8GVr2yK06oOzVIxS922kmtPmY0",
    type: "Venta" as const,
  },
];

export function PropertiesSection() {
  return (
    <section className="w-full py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight mb-3">
            Propiedades Destacadas
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore nuestra selección de las mejores propiedades disponibles en
            este momento.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {featuredProperties.map((property) => (
            <PropertyCard key={property.id} {...property} />
          ))}
        </div>
        
        <div className="text-center">
          <Button asChild variant="outline" size="lg">
            <Link href="/propiedades">Ver Todas las Propiedades</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
