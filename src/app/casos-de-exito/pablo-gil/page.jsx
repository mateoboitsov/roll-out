"use client";
import "./pablo-gil.css";
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

const pabloGilResults = [
  "15 países",
  "10K+ estudiantes",
  "500% crecimiento",
  "25 cursos",
  "4.9/5 rating",
  "80% retención",
  "50+ instructores",
  "95% satisfacción"
];

const PabloGilPage = () => {
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
      <div className="pablo-gil-page" ref={container}>
        <section className="pablo-gil-hero">
          <div className="pablo-gil-hero-bg">
            <img src="/images/cases/image-copy-9.png" alt="PABLO GIL Hero Image" />
          </div>

                  <div className="container">
            <div className="pablo-gil-header">
              <div className="col-lg">
                <AnimatedH1 delay={1}>+4.3x ROAS en campañas evergreen y +1.100 leads en solo 3 meses</AnimatedH1>
              </div>
              <div className="col-sm">                
              </div>
            </div>

            <div className="pablo-gil-tagline">
              <div className="col-lg">
                
              </div>
              <div className="col-sm">
                <AnimatedCopy delay={1} animateOnScroll={false}>
                   CPL promedio de 3,80 € con estrategia evergreen validada en mercado competitivo
                </AnimatedCopy>
              </div>
            </div>
          </div>
        </section>

        <section className="pablo-gil-copy">
          <div className="container">
            <div className="pablo-gil-copy-wrapper">
            <AnimatedCopy>
              Con casi 40 años de experiencia en los mercados, Pablo Gil es uno de los referentes más importantes en formación financiera y análisis económico en habla hispana. Desde agosto hasta noviembre de 2024, trabajamos en la estrategia de captación evergreen para su marca, optimizando inversión, estructura creativa y segmentación para maximizar resultados en un mercado altamente competitivo.
              </AnimatedCopy> 
              <AnimatedCopy tag="h2">El Reto</AnimatedCopy>
              <AnimatedCopy>
                Pablo Gil necesitaba escalar su captación de leads sin sacrificar rentabilidad, en un contexto con alta saturación publicitaria y una audiencia exigente. El desafío era mantener un ROAS positivo de forma sostenible y generar leads de calidad para sus programas.
              </AnimatedCopy>              
            </div>
          </div>
        </section>

        <section className="pablo-gil-outro-banner">
          <div className="pablo-gil-outro-img">
            <ParallaxImage src="/images/cases/image-copy-12.png" alt="PABLO GIL Success" speed={0.2} />
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
                <AnimatedCopy tag="h2">+1.100 leads generados en 3 meses</AnimatedCopy>
                <AnimatedCopy>
                  Logramos generar más de 1.100 leads de calidad en solo 3 meses, demostrando 
                  la efectividad de nuestra estrategia de captación evergreen y la capacidad de 
                  atraer audiencias cualificadas en un mercado altamente competitivo.
                </AnimatedCopy>
              </div>
              <div className="metric">
                <AnimatedCopy tag="h3">(02)</AnimatedCopy>
                <AnimatedCopy tag="h2">CPL promedio de 3,80 € con ROAS total de 4,3x</AnimatedCopy>
                <AnimatedCopy>
                  Optimizamos la inversión publicitaria para lograr un Costo Por Lead promedio 
                  de solo 3,80 €, manteniendo un ROAS total de 4,3x que supera significativamente 
                  los estándares de la industria de formación financiera.
                </AnimatedCopy>
              </div>
              <div className="metric">
                <AnimatedCopy tag="h3">(03)</AnimatedCopy>
                <AnimatedCopy tag="h2">Estrategia evergreen validada con rendimiento estable</AnimatedCopy>
                <AnimatedCopy>
                  Desarrollamos y validamos una estrategia evergreen que no depende exclusivamente 
                  de lanzamientos, proporcionando un flujo constante de leads cualificados y 
                  resultados predecibles mes a mes.
                </AnimatedCopy>
              </div>
              <div className="metric">
                <AnimatedCopy tag="h3">(04)</AnimatedCopy>
                <AnimatedCopy tag="h2">Creatividades top con +75% de visualización en video</AnimatedCopy>
                <AnimatedCopy>
                  Nuestras creatividades alcanzaron más del 75% de visualización en video, 
                  optimizando la estructura creativa y segmentación para maximizar el engagement 
                  y la conversión en un mercado con alta saturación publicitaria.
                </AnimatedCopy>
              </div>
            </div>
          </div>
        </section>

        <section className="pablo-gil-outro-banner">
          <div className="pablo-gil-outro-img">
            <ParallaxImage src="/images/cases/image-copy-12.png" alt="PABLO GIL Success" speed={0.2} />
          </div>
        </section>

        <section className="pablo-gil-copy">
          <div className="container">
            <div className="pablo-gil-copy-wrapper">            
              <AnimatedCopy tag="h2">Impacto en el Negocio</AnimatedCopy>
              <AnimatedCopy>
              La estrategia implementada permitió a Pablo Gil escalar sus campañas sin depender exclusivamente de lanzamientos. Se consolidó un sistema evergreen rentable, enfocado en atraer leads cualificados, reforzar su autoridad en el sector y establecer una base sólida para futuras acciones de conversión y retención.
              </AnimatedCopy>

              <div className="pablo-gil-copy-img">
                <div className="pablo-gil-copy-img-wrapper">
                  <ParallaxImage
                    src="/images/cases/image-copy-9.png"
                    alt="PABLO GIL Digital Nomad School"
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

export default PabloGilPage; 