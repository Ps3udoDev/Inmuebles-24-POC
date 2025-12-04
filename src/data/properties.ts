// src/data/properties.ts

export type PropertyType = "Casa" | "Apartamento" | "Chalet" | "Dúplex" | "Piso";
export type ListingType = "Venta" | "Alquiler";

export interface Property {
  id: number;
  title: string;
  location: string;      // ej: "Pozuelo de Alarcón, Madrid"
  city: string;          // ej: "Madrid"
  zone: string;          // ej: "Pozuelo de Alarcón"
  propertyType: PropertyType;
  listingType: ListingType;
  price: number;         // para ordenar
  priceLabel: string;    // para mostrar en la UI (formateado)
  bedrooms: number;
  bathrooms: number;
  area: number;          // m²
  imageUrl: string;
}

export const properties: Property[] = [
  {
    id: 1,
    title: "Chalet luminoso con jardín",
    location: "Pozuelo de Alarcón, Madrid",
    city: "Madrid",
    zone: "Pozuelo de Alarcón",
    propertyType: "Chalet",
    listingType: "Venta",
    price: 650000,
    priceLabel: "€650.000",
    bedrooms: 4,
    bathrooms: 3,
    area: 220,
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDEewPRLx9Kqt9UtkUlrVdqP_qO_3kWt0szLrznB_18GMzd2ghy0t-GAtc8Ap9GDLhTV932tSq0gwkwZ4cHglln4E64Ey2vjZOD4dgv7Zvg8kXIavJouNm2ohY1ak3fx5ld_t0FcLSLm7PCAmplSr3Q_zILDhzFMKG22uOpau_gPLAIXgQqO4YnwNxMgclPxWqKvTY5MxfXI_pcfNTRaycksCz-5RC84osOcFrXy8MzrEh_8Z2EX0ohoSv1l7yHxEyGjFFkSXB_V_Q",
  },
  {
    id: 2,
    title: "Apartamento moderno en zona premium",
    location: "Salamanca, Madrid",
    city: "Madrid",
    zone: "Salamanca",
    propertyType: "Apartamento",
    listingType: "Venta",
    price: 420000,
    priceLabel: "€420.000",
    bedrooms: 2,
    bathrooms: 2,
    area: 110,
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCMd_LtXYvWfGO_slPf2kiBDczEdI3VyoKFyvA-NO80a6Ze8w4LqN1YQo9mxrvChh-j_msGQxvFJyxh5RN2WJYpoyU7dqndINnP1FtR_os7J1oxA8wO0dkYiwP9Z8VxUue4hNq7taMy5qYqxo_tonSh4XY4bygWGhU7sqqeU2U2gHh_wcGIAjQd0jonTBV2Y955bPjt_dkcB2ma03cdaER64um4HUA_DKNQQ_vwtxq_X126rohE8a-4UjDjh4EjYsIczw6UWrgCMq4",
  },
  {
    id: 3,
    title: "Casa en alquiler cerca del mar",
    location: "Sitges, Barcelona",
    city: "Barcelona",
    zone: "Sitges",
    propertyType: "Casa",
    listingType: "Alquiler",
    price: 2500,
    priceLabel: "€2.500 / mes",
    bedrooms: 3,
    bathrooms: 2,
    area: 150,
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBApD0YKAcMQNjc1MwIglXhDqFdgkjvF9g0VDwQggGew5VWVF2kYcIWZ798WZLbJ2OVT4_2VGm01XN2byNDAbrh92M546dAn5KSy5Hnm9nPU2MY-iWPWyHEj4xPbn3EyqKuuc3lUUc-a7Xub7LQbzU494KV3o6IICpiMUmHjl7vbBEffU7nc72fJ0cdWOihJnvWlq20jP1mJ0gzyiuY2lK4RfphKM3Eq4CcT-aRF4G3u4-n8hlaxn_DOkoejl4nblzFKfldvZZ1edM",
  },
  {
    id: 4,
    title: "Villa de diseño con grandes ventanales",
    location: "Marbella, Málaga",
    city: "Málaga",
    zone: "Marbella",
    propertyType: "Chalet",
    listingType: "Venta",
    price: 890000,
    priceLabel: "€890.000",
    bedrooms: 5,
    bathrooms: 4,
    area: 350,
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuD40JZecGLga0hpqqxB9I1SbnXFN7verfUvGKBOxok58m9_oXj-CtAONQNA7IiTFavloLemRTql7Tx6wDbxqzLCaJzxXdSZejwQKFAdEBb_mJQXkmVxmF98RdRW37yCSQPmgOCHlBMH83YwLbIg38b0zPeB2S6uxHu7rW2px9OiGZdQVkVD6it05enF8iHJYitRZIfwVr59-BwEZeAjZ6FX3T2wsTpmy_IJBpWsQO66aV7E-6Rg9hSp7U4hJ8T-MvG2Q2paYVNbjR4",
  },
  {
    id: 5,
    title: "Piso reformado con encanto",
    location: "Gràcia, Barcelona",
    city: "Barcelona",
    zone: "Gràcia",
    propertyType: "Piso",
    listingType: "Venta",
    price: 310000,
    priceLabel: "€310.000",
    bedrooms: 2,
    bathrooms: 1,
    area: 85,
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBS115DcqopS_Xi5oS7Arb90HEloYfBhGPkCeOKOjRmr8OG5S0nQ6RLRvwzZie-nv3PwiVEfa6zn0QVZYxJw9Vn244XC0T1-LnfXXUNz3f0L_C1fofjVuBQrWJyXBbDyaHLSfGtzkI4NvZ7zcgS7kjvDNgWVws-nxDVpphhY-RIHE8bWZQbMU05peH-g11fWhLX6-t_ZZQyGuGT79S8kt30pXpOj6tq6EybZQYbi4aRPienwloKGSKqOkCSLrqnm0SdHgCZwhEotSk",
  },
  {
    id: 6,
    title: "Dúplex acogedor con chimenea",
    location: "Malasaña, Madrid",
    city: "Madrid",
    zone: "Malasaña",
    propertyType: "Dúplex",
    listingType: "Alquiler",
    price: 1800,
    priceLabel: "€1.800 / mes",
    bedrooms: 3,
    bathrooms: 2,
    area: 130,
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBWl12aY5ugWH0z7QrHE5b69PMDdyw2HiUotgWfKdelqZ2TGwWuPhCmD0suDhU2AydUkW4yof6BzxPSzimlDPwSe5SvMzMKEvRzEAiEXOVDD2nPQp_UFon0Ex8D05wzI8Z9MmD6aAsjlj63bP_MEKSxGzyESJkN2qGC3kH2sd7D6_Gs2y8iEf5Kt36UKJU4CViSC87d6uudeJ7BtSdNMVWQxudo593WoAs4-rb1LojFr_QIwBHIHyVvo3Ca9HLXZPbb3GJukqkJIKU",
  },

  // reuso de imágenes con nombres distintos para que la paginación tenga gracia
  {
    id: 7,
    title: "Casa familiar con patio interior",
    location: "Chamberí, Madrid",
    city: "Madrid",
    zone: "Chamberí",
    propertyType: "Casa",
    listingType: "Venta",
    price: 540000,
    priceLabel: "€540.000",
    bedrooms: 3,
    bathrooms: 2,
    area: 180,
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDEewPRLx9Kqt9UtkUlrVdqP_qO_3kWt0szLrznB_18GMzd2ghy0t-GAtc8Ap9GDLhTV932tSq0gwkwZ4cHglln4E64Ey2vjZOD4dgv7Zvg8kXIavJouNm2ohY1ak3fx5ld_t0FcLSLm7PCAmplSr3Q_zILDhzFMKG22uOpau_gPLAIXgQqO4YnwNxMgclPxWqKvTY5MxfXI_pcfNTRaycksCz-5RC84osOcFrXy8MzrEh_8Z2EX0ohoSv1l7yHxEyGjFFkSXB_V_Q",
  },
  {
    id: 8,
    title: "Loft industrial con terraza",
    location: "Poblenou, Barcelona",
    city: "Barcelona",
    zone: "Poblenou",
    propertyType: "Apartamento",
    listingType: "Alquiler",
    price: 2100,
    priceLabel: "€2.100 / mes",
    bedrooms: 1,
    bathrooms: 1,
    area: 95,
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCMd_LtXYvWfGO_slPf2kiBDczEdI3VyoKFyvA-NO80a6Ze8w4LqN1YQo9mxrvChh-j_msGQxvFJyxh5RN2WJYpoyU7dqndINnP1FtR_os7J1oxA8wO0dkYiwP9Z8VxUue4hNq7taMy5qYqxo_tonSh4XY4bygWGhU7sqqeU2U2gHh_wcGIAjQd0jonTBV2Y955bPjt_dkcB2ma03cdaER64um4HUA_DKNQQ_vwtxq_X126rohE8a-4UjDjh4EjYsIczw6UWrgCMq4",
  },
  {
    id: 9,
    title: "Ático con vistas panorámicas",
    location: "Centro, Valencia",
    city: "Valencia",
    zone: "Centro",
    propertyType: "Piso",
    listingType: "Venta",
    price: 390000,
    priceLabel: "€390.000",
    bedrooms: 2,
    bathrooms: 2,
    area: 115,
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBApD0YKAcMQNjc1MwIglXhDqFdgkjvF9g0VDwQggGew5VWVF2kYcIWZ798WZLbJ2OVT4_2VGm01XN2byNDAbrh92M546dAn5KSy5Hnm9nPU2MY-iWPWyHEj4xPbn3EyqKuuc3lUUc-a7Xub7LQbzU494KV3o6IICpiMUmHjl7vbBEffU7nc72fJ0cdWOihJnvWlq20jP1mJ0gzyiuY2lK4RfphKM3Eq4CcT-aRF4G3u4-n8hlaxn_DOkoejl4nblzFKfldvZZ1edM",
  },
];
