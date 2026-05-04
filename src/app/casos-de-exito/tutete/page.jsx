"use client";
import "./tutete.css";
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

const tuteteResults = [
  "42K compras",
  "ROAS 40.19",
  "12 meses",
  "Expansión Francia",
  "Estrategias estacionales",
  "Múltiples mercados",
  "Europa",
  "ROI excepcional"
];

const TutetePage = () => {
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
      <div className="tutete-page" ref={container}>
        <section className="tutete-hero">
          <div className="tutete-hero-bg">
            <img src="/images/cases/case 4.jpg" alt="Tutete Hero Image" />
          </div>

          <div className="container">
            <div className="tutete-header">
              <div className="col-lg">
                <AnimatedH1 delay={1}>Más de 42.000 compras generadas <br /> en 12 meses</AnimatedH1>
              </div>
              <div className="col-sm">                
              </div>
            </div>

            <div className="tutete-tagline">
              <div className="col-lg">
                
              </div>
              <div className="col-sm">
                <AnimatedCopy delay={1} animateOnScroll={false}>
                  Con una inversión escalonada en campañas trimestrales, logramos un ROAS promedio mensual de hasta 40.19 y expansión a nuevos mercados europeos.
                </AnimatedCopy>
              </div>
            </div>
          </div>
        </section>

        <section className="tutete-copy">
          <div className="container">
            <div className="tutete-copy-wrapper">
            <AnimatedCopy>
              Gestionamos campañas para Tutete en múltiples mercados de Europa durante todo el 2021. Nuestro enfoque se centró en estrategias de colecciones por temporada y expansión a nuevos mercados para maximizar el alcance y las ventas.
              </AnimatedCopy> 
              <AnimatedCopy tag="h2">El Reto</AnimatedCopy>
              <AnimatedCopy>
                Tutete necesitaba escalar sus ventas en múltiples mercados europeos, implementando estrategias estacionales efectivas y expandiendo su presencia a nuevos países como Francia.
              </AnimatedCopy>
              <AnimatedCopy tag="h2">Nuestra Estrategia</AnimatedCopy>
              <AnimatedCopy>
                • Inversión escalonada en campañas trimestrales<br/>
                • Estrategias de colecciones por temporada (verano, vuelta al cole, invierno, Navidad)<br/>
                • Expansión a nuevos mercados europeos<br/>
                • Optimización continua para maximizar ROAS
              </AnimatedCopy>              
            </div>
          </div>
        </section>

        <section className="tutete-outro-banner">
          <div className="tutete-outro-img">
            <ParallaxImage src="/images/cases/image copy 4.png" alt="Tutete Success" speed={0.2} />
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
                <AnimatedCopy tag="h2">Más de 42.000 compras generadas en 12 meses</AnimatedCopy>
                <AnimatedCopy>
                  Logramos generar más de 42.000 compras a lo largo de 12 meses, 
                  demostrando la efectividad de las estrategias estacionales y 
                  la expansión a múltiples mercados europeos.
                </AnimatedCopy>
              </div>
              <div className="metric">
                <AnimatedCopy tag="h3">(02)</AnimatedCopy>
                <AnimatedCopy tag="h2">ROAS promedio mensual de hasta 40.19</AnimatedCopy>
                <AnimatedCopy>
                  Optimizamos constantemente las campañas para lograr un ROAS promedio 
                  mensual excepcional de hasta 40.19, superando significativamente 
                  los estándares de la industria.
                </AnimatedCopy>
              </div>
              <div className="metric">
                <AnimatedCopy tag="h3">(03)</AnimatedCopy>
                <AnimatedCopy tag="h2">Expansión exitosa a Francia</AnimatedCopy>
                <AnimatedCopy>
                  Implementamos estrategias efectivas para la expansión a nuevos mercados, 
                  logrando una entrada exitosa en Francia y estableciendo una base 
                  sólida para futuras expansiones.
                </AnimatedCopy>
              </div>
              <div className="metric">
                <AnimatedCopy tag="h3">(04)</AnimatedCopy>
                <AnimatedCopy tag="h2">Estrategias estacionales destacadas</AnimatedCopy>
                <AnimatedCopy>
                  Desarrollamos campañas estacionales exitosas, destacando agosto con 
                  6.388 compras (vuelta al cole), mayo con 4.270 compras (Día de la Madre) 
                  y marzo con 4.152 compras (bebés y primavera).
                </AnimatedCopy>
              </div>
            </div>
          </div>
        </section>

        <section className="tutete-outro-banner">
          <div className="tutete-outro-img">
            <ParallaxImage src="/images/cases/image copy 5.png" alt="Tutete Success" speed={0.2} />
          </div>
        </section>

        <section className="tutete-copy">
          <div className="container">
            <div className="tutete-copy-wrapper">            
              <AnimatedCopy tag="h2">Impacto en el Negocio</AnimatedCopy>
              <AnimatedCopy>
              La estrategia consolidó a Tutete como líder en múltiples mercados europeos, estableciendo una base sólida para futuras expansiones y posicionando la marca como referente en productos para bebés y niños.
              </AnimatedCopy>

              <div className="tutete-copy-img">
                <div className="tutete-copy-img-wrapper">
                  <ParallaxImage
                    src="/images/cases/case 4.jpg"
                    alt="Tutete Platform Interface"
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

export default TutetePage; 