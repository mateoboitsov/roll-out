"use client";
import "./ser-closer.css";
import { useEffect, useRef, useState } from "react";

import AnimatedH1 from "../../../components/AnimatedH1/AnimatedH1";
import AnimatedCopy from "../../../components/AnimatedCopy/AnimatedCopy";
import ParallaxImage from "../../../components/ParallaxImage/ParallaxImage";
import Footer from "../../../components/Footer/Footer";

import { ReactLenis } from "@studio-freight/react-lenis";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const serCloserResults = [
  "150% engagement",
  "300% reconocimiento",
  "80% conversión",
  "25K seguidores",
  "4.8/5 rating",
  "200% crecimiento",
  "50+ colaboraciones",
  "95% satisfacción"
];

const SerCloserPage = () => {
  const container = useRef();
  const [windowWidth, setWindowWidth] = useState(0);
  const scrollTriggerRef = useRef(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setWindowWidth(window.innerWidth);
    }
  }, []);

  useGSAP(
    () => {
      if (scrollTriggerRef.current) {
        scrollTriggerRef.current.kill();
        scrollTriggerRef.current = null;
      }

      const handleResize = () => {
        setWindowWidth(window.innerWidth);
      };

      window.addEventListener("resize", handleResize);

      const timeoutId = setTimeout(() => {
        if (windowWidth > 900) {
          const resultsSection = document.querySelector(".results");
          const resultsHeader = document.querySelector(".results-header");
          const metrics = document.querySelector(".metrics");

          if (resultsSection && resultsHeader && metrics) {
            ScrollTrigger.refresh();

            scrollTriggerRef.current = ScrollTrigger.create({
              trigger: resultsSection,
              start: "top top",
              endTrigger: metrics,
              end: "bottom top+=300",
              pin: resultsHeader,
              pinSpacing: false,
              onEnter: () => {
                gsap.to(resultsHeader, { duration: 0.1, ease: "power1.out" });
              },
            });
          }
        }
      }, 100);

      return () => {
        window.removeEventListener("resize", handleResize);
        clearTimeout(timeoutId);

        if (scrollTriggerRef.current) {
          scrollTriggerRef.current.kill();
        }
      };
    },
    { dependencies: [windowWidth], scope: container }
  );

  useEffect(() => {
    const refreshTimeout = setTimeout(() => {
      ScrollTrigger.refresh(true);
    }, 300);

    return () => {
      clearTimeout(refreshTimeout);
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  return (
    <ReactLenis root>
      <div className="ser-closer-page" ref={container}>
        <section className="ser-closer-hero">
          <div className="ser-closer-hero-bg">
            <img src="/images/cases/image-copy-8.png" alt="SER CLOSER Hero Image" />
          </div>

          <div className="container">
            <div className="ser-closer-header">
              <div className="col-lg">
                <AnimatedH1 delay={1}>+660.000 € en ingresos en 9 meses y crecimiento sostenido del ROAS</AnimatedH1>
              </div>
              <div className="col-sm">                
              </div>
            </div>

            <div className="ser-closer-tagline">
              <div className="col-lg">
                
              </div>
              <div className="col-sm">
                <AnimatedCopy delay={1} animateOnScroll={false}>
                  ROAS promedio de 3.66 con más de 158.000 € en inversión gestionada
                </AnimatedCopy>
              </div>
            </div>
          </div>
        </section>

        <section className="ser-closer-copy">
          <div className="container">
            <div className="ser-closer-copy-wrapper">
            <AnimatedCopy>
              Con Ser Closer, trabajamos más allá de las campañas publicitarias: nos convertimos en su partner estratégico para escalar el negocio. En 9 meses, gestionamos más de 150.000 € en inversión publicitaria, logrando un ROAS promedio de 3.66 y superando los 660.000 € en ingresos directos.
              </AnimatedCopy> 
              <AnimatedCopy tag="h2">El Reto</AnimatedCopy>
              <AnimatedCopy>
                Ser Closer necesitaba un acompañamiento integral para escalar sus ventas sin perder eficiencia. El objetivo era claro: aumentar ingresos mes a mes manteniendo un costo controlado y elevando los ratios de conversión de leads a ventas.
              </AnimatedCopy>              
            </div>
          </div>
        </section>

        <section className="ser-closer-outro-banner">
          <div className="ser-closer-outro-img">
            <ParallaxImage src="/images/cases/image-copy-10.avif" alt="SER CLOSER Success" speed={0.2} />
          </div>
        </section>

        <section className="results">
          <div className="results-header">
            <div className="container">
              <div className="results-header-content">
                <div className="col-lg">
                  <AnimatedH1 animateOnScroll={true}>
                    Resultados <br /> Clave
                  </AnimatedH1>
                </div>
                <div className="col-sm">
                  {/* Div vacío para mantener la estructura */}
                </div>
              </div>
            </div>
          </div>

          <div className="metrics">
            <div className="col-lg"></div>
            <div className="col-sm">
              <div className="metric">
                <AnimatedCopy tag="h3">(01)</AnimatedCopy>
                <AnimatedCopy tag="h2">+664.442 € en ingresos acumulados</AnimatedCopy>
                <AnimatedCopy>
                  Logramos generar más de 664.442 € en ingresos acumulados durante el período de 
                  9 meses, demostrando la efectividad de nuestra estrategia de performance marketing 
                  y la capacidad de escalar el negocio de manera sostenible.
                </AnimatedCopy>
              </div>
              <div className="metric">
                <AnimatedCopy tag="h3">(02)</AnimatedCopy>
                <AnimatedCopy tag="h2">158.322 € en inversión gestionada con ROAS 3.66</AnimatedCopy>
                <AnimatedCopy>
                  Gestionamos más de 158.322 € en inversión publicitaria con un ROAS promedio de 3.66, 
                  superando significativamente los estándares de la industria y manteniendo la rentabilidad 
                  incluso con presupuestos más altos.
                </AnimatedCopy>
              </div>
              <div className="metric">
                <AnimatedCopy tag="h3">(03)</AnimatedCopy>
                <AnimatedCopy tag="h2">+3.450 llamadas generadas con picos de 574 en un mes</AnimatedCopy>
                <AnimatedCopy>
                  Generamos más de 3.450 llamadas de calidad, con picos de hasta 574 llamadas en un 
                  solo mes, optimizando continuamente la asistencia y el cierre de ventas en múltiples etapas.
                </AnimatedCopy>
              </div>
              <div className="metric">
                <AnimatedCopy tag="h3">(04)</AnimatedCopy>
                <AnimatedCopy tag="h2">Optimización continua de conversión y escalabilidad</AnimatedCopy>
                <AnimatedCopy>
                  Implementamos un sistema de optimización continua que elevó los ratios de conversión 
                  de leads a ventas, permitiendo escalar la operación comercial sin fricciones y 
                  manteniendo la eficiencia operativa.
                </AnimatedCopy>
              </div>
            </div>
          </div>
        </section>

        <section className="ser-closer-outro-banner">
          <div className="ser-closer-outro-img">
            <ParallaxImage src="/images/cases/image-copy-10.avif" alt="SER CLOSER Success" speed={0.2} />
          </div>
        </section>

        <section className="ser-closer-copy">
          <div className="container">
            <div className="ser-closer-copy-wrapper">            
              <AnimatedCopy tag="h2">Impacto en el Negocio</AnimatedCopy>
              <AnimatedCopy>
              Gracias a una gestión continua y estratégica, Ser Closer escaló su operación comercial sin fricciones, manteniendo la rentabilidad incluso con presupuestos más altos y dinámicas de cierre complejas. La sinergia entre marketing y ventas fue clave para este crecimiento sólido.
              </AnimatedCopy>

              <div className="ser-closer-copy-img">
                <div className="ser-closer-copy-img-wrapper">
                  <ParallaxImage
                    src="/images/cases/image-copy-8.png"
                    alt="SER CLOSER Brand Identity"
                    speed={0.2}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </ReactLenis>
  );
};

export default SerCloserPage; 