"use client";
import "./offlesson.css";
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

const offlessonResults = [
  "50K+ estudiantes",
  "95% satisfacción",
  "200% crecimiento",
  "25 cursos activos",
  "4.9/5 rating",
  "80% retención",
  "15K+ horas",
  "30+ instructores"
];

const OfflessonPage = () => {
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
      <div className="offlesson-page" ref={container}>
        <section className="offlesson-hero">
          <div className="offlesson-hero-bg">
            <img src="/images/cases/Frame 339.jpg" alt="OFFLESSON Hero Image" />
          </div>

                  <div className="container">
            <div className="offlesson-header">
              <div className="col-lg">
                <AnimatedH1 delay={1}>600 compras el primer día: lanzamos Offlesson con éxito total</AnimatedH1>
              </div>
              <div className="col-sm">                
              </div>
            </div>

            <div className="offlesson-tagline">
              <div className="col-lg">
                
              </div>
              <div className="col-sm">
                <AnimatedCopy delay={1} animateOnScroll={false}>
                   Estrategia de lanzamiento que revolucionó el microlearning con crecimiento orgánico
                </AnimatedCopy>
              </div>
            </div>
          </div>
        </section>

        <section className="offlesson-copy">
          <div className="container">
            <div className="offlesson-copy-wrapper">
            <AnimatedCopy>
              Diseñamos y ejecutamos la estrategia de lanzamiento de Offlesson, una plataforma de suscripción de microlearning, logrando más de 600 compras en su primer día impulsadas por una estrategia de crecimiento orgánico en redes sociales y una narrativa de marca alineada con su propuesta disruptiva.
              </AnimatedCopy> 
              <AnimatedCopy tag="h2">El Reto</AnimatedCopy>
              <AnimatedCopy>
                El desafío fue lanzar esta nueva plataforma al mercado, atraer demanda inmediata y convertir ese interés en suscripciones pagas desde el día de apertura.
              </AnimatedCopy>              
            </div>
          </div>
        </section>

        <section className="offlesson-outro-banner">
          <div className="offlesson-outro-img">
            <ParallaxImage src="/images/cases/MacBook.jpg" alt="OFFLESSON Success" speed={0.2} />
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
                <AnimatedCopy tag="h2">+600 compras en el primer día de lanzamiento</AnimatedCopy>
                <AnimatedCopy>
                  Logramos un lanzamiento excepcional con más de 600 compras en el primer día, 
                  demostrando la efectividad de nuestra estrategia de crecimiento orgánico y 
                  la resonancia de la propuesta de valor de Offlesson en el mercado.
                </AnimatedCopy>
              </div>
              <div className="metric">
                <AnimatedCopy tag="h3">(02)</AnimatedCopy>
                <AnimatedCopy tag="h2">Gran aceptación de suscripciones (mensual y anual)</AnimatedCopy>
                <AnimatedCopy>
                  La estrategia de lanzamiento resultó en una excelente aceptación de ambos 
                  modelos de suscripción, tanto mensual como anual, estableciendo una base 
                  sólida de ingresos recurrentes desde el primer día.
                </AnimatedCopy>
              </div>
              <div className="metric">
                <AnimatedCopy tag="h3">(03)</AnimatedCopy>
                <AnimatedCopy tag="h2">Marca posicionada como opción divertida y práctica en e-learning</AnimatedCopy>
                <AnimatedCopy>
                  Offlesson se posicionó exitosamente como una alternativa innovadora y 
                  divertida en el mercado del e-learning, diferenciándose de la competencia 
                  tradicional con su enfoque en microlearning y experiencia de usuario superior.
                </AnimatedCopy>
              </div>
              <div className="metric">
                <AnimatedCopy tag="h3">(04)</AnimatedCopy>
                <AnimatedCopy tag="h2">Estrategia de crecimiento orgánico exitosa en redes sociales</AnimatedCopy>
                <AnimatedCopy>
                  La estrategia de crecimiento orgánico en redes sociales generó demanda 
                  auténtica y conversiones reales, estableciendo un modelo sostenible de 
                  adquisición de usuarios sin depender de publicidad pagada.
                </AnimatedCopy>
              </div>
            </div>
          </div>
        </section>

        <section className="offlesson-outro-banner">
          <div className="offlesson-outro-img">
            <ParallaxImage src="/images/cases/image.jpg" alt="OFFLESSON Success" speed={0.2} />
          </div>
        </section>

        <section className="offlesson-copy">
          <div className="container">
            <div className="offlesson-copy-wrapper">            
              <AnimatedCopy tag="h2">Impacto en el Negocio</AnimatedCopy>
              <AnimatedCopy>
              Offlesson no solo consiguió un arranque fuerte, sino que estableció una base sólida de suscriptores y una percepción de marca innovadora y orientada al cambio real. Su ventaja competitiva en el mercado de microlearning quedó muy reforzada, facilitando su crecimiento y retención futura.
              </AnimatedCopy>

              <div className="offlesson-copy-img">
                <div className="offlesson-copy-img-wrapper">
                  <ParallaxImage
                    src="/images/cases/Macbook 2.jpg"
                    alt="OFFLESSON Platform Interface"
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

export default OfflessonPage; 