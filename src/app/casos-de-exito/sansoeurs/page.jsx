"use client";
import "./sansoeurs.css";
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

const sansoeursResults = [
  "88K+ €/mes",
  "120% crecimiento",
  "4 meses",
  "95% rentabilidad",
  "2x ingresos",
  "Optimización constante",
  "Escalabilidad",
  "ROI positivo"
];

const SansoeursPage = () => {
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
      <div className="sansoeurs-page" ref={container}>
        <section className="sansoeurs-hero">
          <div className="sansoeurs-hero-bg">
            <img src="/images/cases/case-2.jpg" alt="Sansoeurs Hero Image" />
          </div>

          <div className="container">
            <div className="sansoeurs-header">
              <div className="col-lg">
                <AnimatedH1 delay={1}>De 40K a casi 90K €/mes <br /> en 4 meses</AnimatedH1>
              </div>
              <div className="col-sm">                
              </div>
            </div>

            <div className="sansoeurs-tagline">
              <div className="col-lg">
                
              </div>
              <div className="col-sm">
                <AnimatedCopy delay={1} animateOnScroll={false}>
                  Duplicamos ingresos en 4 meses.
                </AnimatedCopy>
              </div>
            </div>
          </div>
        </section>

        <section className="sansoeurs-copy">
          <div className="container">
            <div className="sansoeurs-copy-wrapper">
            <AnimatedCopy>
            Durante 4 meses consecutivos, gestionamos la inversión publicitaria de Sansour y duplicamos sus ingresos promedio mensuales, pasando de menos de 40.000 € a casi 90.000 € generados por campañas pagadas.
              </AnimatedCopy> 
              <AnimatedCopy tag="h2">El Reto</AnimatedCopy>
              <AnimatedCopy>
                Sansour tenía campañas activas, pero estancadas. Buscaban escalar sin disparar el coste ni comprometer la rentabilidad.
              </AnimatedCopy>              
            </div>
          </div>
        </section>

        <section className="sansoeurs-outro-banner">
          <div className="sansoeurs-outro-img">
            <ParallaxImage src="/images/cases/image-copy-2.png" alt="Sansoeurs Success" speed={0.2} />
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
                <AnimatedCopy tag="h2">Ingresos antes: &lt;40.000€/mes</AnimatedCopy>
                <AnimatedCopy>
                  Al inicio del proyecto, Sansour generaba menos de 40.000 euros mensuales 
                  a través de sus campañas publicitarias, con un crecimiento estancado 
                  y sin perspectivas de mejora significativa.
                </AnimatedCopy>
              </div>
              <div className="metric">
                <AnimatedCopy tag="h3">(02)</AnimatedCopy>
                <AnimatedCopy tag="h2">Ingresos después: 88.582,60 €/mes</AnimatedCopy>
                <AnimatedCopy>
                  Después de 4 meses de optimización constante, logramos que Sansour 
                  generara 88.582,60 euros mensuales, más del doble de sus ingresos 
                  iniciales, manteniendo una rentabilidad excepcional.
                </AnimatedCopy>
              </div>
              <div className="metric">
                <AnimatedCopy tag="h3">(03)</AnimatedCopy>
                <AnimatedCopy tag="h2">Optimización constante sin aumento descontrolado de inversión</AnimatedCopy>
                <AnimatedCopy>
                  Implementamos un sistema de optimización continua que permitió escalar 
                  los resultados sin incrementar desproporcionadamente la inversión 
                  publicitaria, maximizando el ROI y la eficiencia.
                </AnimatedCopy>
              </div>
              <div className="metric">
                <AnimatedCopy tag="h3">(04)</AnimatedCopy>
                <AnimatedCopy tag="h2">Sistema publicitario escalable y rentable</AnimatedCopy>
                <AnimatedCopy>
                  Transformamos las campañas de Sansour en un sistema publicitario 
                  robusto y escalable que hoy forma parte de su core comercial, 
                  garantizando crecimiento sostenible a largo plazo.
                </AnimatedCopy>
              </div>
            </div>
          </div>
        </section>

        <section className="sansoeurs-outro-banner">
          <div className="sansoeurs-outro-img">
            <ParallaxImage src="/images/cases/image-copy-3.avif" alt="Sansoeurs Success" speed={0.2} />
          </div>
        </section>

        <section className="sansoeurs-copy">
          <div className="container">
            <div className="sansoeurs-copy-wrapper">            
              <AnimatedCopy tag="h2">Impacto en el Negocio</AnimatedCopy>
              <AnimatedCopy>
              Sansour pasó de tener campañas sin crecimiento a un sistema publicitario escalable y rentable, que hoy forma parte de su core comercial.
              </AnimatedCopy>

              <div className="sansoeurs-copy-img">
                <div className="sansoeurs-copy-img-wrapper">
                  <ParallaxImage
                    src="/images/cases/case-2.jpg"
                    alt="Sansoeurs Platform Interface"
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

export default SansoeursPage; 