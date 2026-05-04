"use client";
import "./tradeando.css";
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

const tradeandoResults = [
  "2M+ en ventas",
  "150% ROI",
  "50K+ usuarios",
  "95% satisfacción",
  "3x conversión",
  "200% crecimiento",
  "25K leads",
  "4.8/5 rating"
];

const TradeandoPage = () => {
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
      <div className="tradeando-page" ref={container}>
        <section className="tradeando-hero">
          <div className="tradeando-hero-bg">
            <img src="/images/cases/case 1.jpg" alt="Tradeando Hero Image" />
          </div>

          <div className="container">
            <div className="tradeando-header">
              <div className="col-lg">
                <AnimatedH1 delay={1}>+1.8 millones de euros gestionados en el último año</AnimatedH1>
              </div>
              <div className="col-sm">                
              </div>
            </div>

            <div className="tradeando-tagline">
              <div className="col-lg">
                
              </div>
              <div className="col-sm">
                <AnimatedCopy delay={1} animateOnScroll={false}>
                  ROAS promedio de 4.5x para el infoproducto #1 en Europa
                </AnimatedCopy>
              </div>
            </div>
          </div>
        </section>

        <section className="tradeando-copy">
          <div className="container">
            <div className="tradeando-copy-wrapper">
            <AnimatedCopy>
              Nos convertimos en el aliado estratégico de Tradeando desde sus inicios, liderando la inversión publicitaria que lo llevó a consolidarse como el infoproducto más vendido en España y Europa, con una gestión anual de más de 1.8M € y un retorno sobresaliente.
              </AnimatedCopy> 
              <AnimatedCopy tag="h2">El Reto</AnimatedCopy>
              <AnimatedCopy>
                Tradeando necesitaba escalar rápidamente sin perder rentabilidad. El objetivo era claro: 
                aumentar la inversión y mantener un ROAS competitivo, todo mientras construíamos una marca 
                sólida y confiable a largo plazo.
              </AnimatedCopy>              
            </div>
          </div>
        </section>

        <section className="tradeando-outro-banner">
          <div className="tradeando-outro-img">
            <ParallaxImage src="/images/cases/image-tr.avif" alt="Tradeando Success" speed={0.2} />
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
                <AnimatedCopy tag="h2">Escalar inversión publicitaria en un año a +1.8M €</AnimatedCopy>
                <AnimatedCopy>
                  Desarrollamos una estrategia de marketing digital que permitió escalar la inversión 
                  publicitaria de manera sostenible, alcanzando más de 1.8 millones de euros en 
                  inversión anual mientras mantenemos un ROAS promedio de 4.5.
                </AnimatedCopy>
              </div>
              <div className="metric">
                <AnimatedCopy tag="h3">(02)</AnimatedCopy>
                <AnimatedCopy tag="h2">ROAS promedio: 4.5</AnimatedCopy>
                <AnimatedCopy>
                  Optimizamos todas las campañas publicitarias para maximizar el retorno de inversión, 
                  logrando un ROAS promedio de 4.5 que supera significativamente los estándares 
                  de la industria del trading digital.
                </AnimatedCopy>
              </div>
              <div className="metric">
                <AnimatedCopy tag="h3">(03)</AnimatedCopy>
                <AnimatedCopy tag="h2">Expansión internacional y liderazgo de categoría</AnimatedCopy>
                <AnimatedCopy>
                  Llevamos a Tradeando a nuevos mercados internacionales, estableciendo un 
                  liderazgo claro en la categoría de trading educativo y democratización 
                  financiera en Latinoamérica.
                </AnimatedCopy>
              </div>
              <div className="metric">
                <AnimatedCopy tag="h3">(04)</AnimatedCopy>
                <AnimatedCopy tag="h2">Marca consolidada como referencia absoluta en su nicho</AnimatedCopy>
                <AnimatedCopy>
                  Posicionamos Tradeando como la marca de referencia en el nicho de trading 
                  educativo, con reconocimiento unánime de la industria y los usuarios como 
                  la plataforma más confiable y transparente del mercado.
                </AnimatedCopy>
              </div>
            </div>
          </div>
        </section>

        <section className="tradeando-outro-banner">
          <div className="tradeando-outro-img">
            <ParallaxImage src="/images/cases/image copy.png" alt="Tradeando Success" speed={0.2} />
          </div>
        </section>

        <section className="tradeando-copy">
          <div className="container">
            <div className="tradeando-copy-wrapper">            
              <AnimatedCopy tag="h2">Impacto en el Negocio</AnimatedCopy>
              <AnimatedCopy>
              Nuestro trabajo permitió escalar no solo en ingresos, sino en autoridad de marca, expansión geográfica y posicionamiento estratégico. Hoy, Tradeando es líder en su segmento y continúa creciendo con una base sólida.
              </AnimatedCopy>

              <div className="tradeando-copy-img">
                <div className="tradeando-copy-img-wrapper">
                  <ParallaxImage
                    src="/images/cases/case 1.jpg"
                    alt="Tradeando Platform Interface"
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

export default TradeandoPage; 