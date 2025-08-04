"use client";
import "./nuria-coll.css";
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

const nuriaCollResults = [
  "60K leads",
  "400K € facturación",
  "CPL < 1€",
  "1.040 ventas",
  "ROI 8X",
  "50K € inversión",
  "Salud digital",
  "Comunidad sólida"
];

const NuriaCollPage = () => {
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
      <div className="nuria-coll-page" ref={container}>
        <section className="nuria-coll-hero">
          <div className="nuria-coll-hero-bg">
            <img src="/images/cases/case 3.JPG" alt="Nuria Coll Hero Image" />
          </div>

          <div className="container">
            <div className="nuria-coll-header">
              <div className="col-lg">
                <AnimatedH1 delay={1}>60.000 leads y más de 400.000€ <br /> en facturación</AnimatedH1>
              </div>
              <div className="col-sm">                
              </div>
            </div>

            <div className="nuria-coll-tagline">
              <div className="col-lg">
                
              </div>
              <div className="col-sm">
                <AnimatedCopy delay={1} animateOnScroll={false}>
                  Con una inversión de solo 50.000 €, ayudamos a Nuria Coll a captar 60.000 leads y generar más de 400.000 € en ventas, posicionando su marca como líder digital en salud y bienestar.
                </AnimatedCopy>
              </div>
            </div>
          </div>
        </section>

        <section className="nuria-coll-copy">
          <div className="container">
            <div className="nuria-coll-copy-wrapper">
            <AnimatedCopy>
              Desarrollamos una estrategia de marketing digital integral para Nuria Coll, especialista en salud y bienestar. Nuestro enfoque se centró en la captación masiva de leads y la optimización de conversión para maximizar el retorno de inversión.
              </AnimatedCopy> 
              <AnimatedCopy tag="h2">El Reto</AnimatedCopy>
              <AnimatedCopy>
                Nuria tenía como meta captar 40.000 leads para su nuevo programa, sin perder rentabilidad. Además, debía convertirlos eficazmente en compradores.
              </AnimatedCopy>
              <AnimatedCopy tag="h2">Nuestra Estrategia</AnimatedCopy>
              <AnimatedCopy>
                • Funnel segmentado con creatividad adaptada por temperatura de tráfico<br/>
                • A/B testing constante para encontrar el CPL más bajo posible<br/>
                • Automatización de email marketing para nutrir a los leads<br/>
                • Optimización creativa enfocada en empatía, bienestar y autoridad
              </AnimatedCopy>              
            </div>
          </div>
        </section>

        <section className="nuria-coll-outro-banner">
          <div className="nuria-coll-outro-img">
            <ParallaxImage src="/images/cases/image copy 6.png" alt="Nuria Coll Success" speed={0.2} />
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
                <AnimatedCopy tag="h2">60.000 leads (meta superada en 50%)</AnimatedCopy>
                <AnimatedCopy>
                  Superamos la meta inicial de 40.000 leads en un 50%, captando 60.000 
                  leads cualificados que representaron la base sólida para la conversión 
                  y el crecimiento del negocio.
                </AnimatedCopy>
              </div>
              <div className="metric">
                <AnimatedCopy tag="h3">(02)</AnimatedCopy>
                <AnimatedCopy tag="h2">CPL &lt; 1 €, llegando en algunos casos a 0,10 €</AnimatedCopy>
                <AnimatedCopy>
                  Optimizamos constantemente las campañas para lograr un Coste Por Lead 
                  excepcionalmente bajo, manteniendo la calidad y la rentabilidad 
                  del negocio.
                </AnimatedCopy>
              </div>
              <div className="metric">
                <AnimatedCopy tag="h3">(03)</AnimatedCopy>
                <AnimatedCopy tag="h2">1.040 ventas con facturación de +400.000 €</AnimatedCopy>
                <AnimatedCopy>
                  Convertimos eficazmente los leads en compradores, logrando 1.040 ventas 
                  que generaron más de 400.000 € en facturación, superando todas 
                  las expectativas iniciales.
                </AnimatedCopy>
              </div>
              <div className="metric">
                <AnimatedCopy tag="h3">(04)</AnimatedCopy>
                <AnimatedCopy tag="h2">ROI: 8X</AnimatedCopy>
                <AnimatedCopy>
                  Con una inversión de solo 50.000 €, logramos un retorno de inversión 
                  de 8 veces, demostrando la eficiencia y rentabilidad de la estrategia 
                  implementada.
                </AnimatedCopy>
              </div>
            </div>
          </div>
        </section>

        <section className="nuria-coll-outro-banner">
          <div className="nuria-coll-outro-img">
            <ParallaxImage src="/images/cases/image copy 7.png" alt="Nuria Coll Success" speed={0.2} />
          </div>
        </section>

        <section className="nuria-coll-copy">
          <div className="container">
            <div className="nuria-coll-copy-wrapper">            
              <AnimatedCopy tag="h2">Impacto en el Negocio</AnimatedCopy>
              <AnimatedCopy>
              La marca de Nuria Coll se consolidó como referente en salud digital. Además, se construyó una comunidad sólida para futuras campañas y productos.
              </AnimatedCopy>

              <div className="nuria-coll-copy-img">
                <div className="nuria-coll-copy-img-wrapper">
                  <ParallaxImage
                    src="/images/cases/case 3.JPG"
                    alt="Nuria Coll Platform Interface"
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

export default NuriaCollPage; 