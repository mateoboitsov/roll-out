import "./home.css";
import { Suspense } from "react";
import HomeClient from "./HomeClient";

export const metadata = {
  title: "Inicio",
  description: "Roll Out Studios - Estudio creativo especializado en marketing digital estratégico. Pensamos con estrategia y ejecutamos con creatividad para crear marcas fuertes y lograr ventas constantes.",
  keywords: [
    "marketing digital",
    "estrategia creativa", 
    "lanzamientos digitales",
    "infoproductos",
    "ecommerce",
    "consultoría marketing",
    "Portugal",
    "Roll Out Studios"
  ],
  openGraph: {
    title: "Roll Out Studios - Marketing Digital Estratégico",
    description: "Pensamos con estrategia y ejecutamos con creatividad para crear marcas fuertes y lograr ventas constantes.",
    images: [
      {
        url: '/images/studio/hero.jpeg',
        width: 1200,
        height: 630,
        alt: 'Roll Out Studios - Hero Image',
      }
    ],
  },
  twitter: {
    title: "Roll Out Studios - Marketing Digital Estratégico",
    description: "Pensamos con estrategia y ejecutamos con creatividad para crear marcas fuertes y lograr ventas constantes.",
  },
  alternates: {
    canonical: '/',
  },
};

export default function Home() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HomeClient />
    </Suspense>
  );
}
