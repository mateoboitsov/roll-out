"use client";
import "./ProcessCards.css";

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ProcessCards = () => {
  const processCardsData = [
    {
      index: "01",
      title: "Joao",
      image: "/images/process/process_005.jpeg",
      description:
        "El master de las políticas de anuncios. Joao domina el arte de la optimización publicitaria, creando estrategias que maximizan el ROI y convierten cada clic en ventas reales.",
    },
    {
      index: "02",
      title: "Alec",
      image: "/images/process/process_001.jpeg",
      description:
        "La navaja suiza del equipo. Alec combina creatividad estratégica con ejecución técnica, adaptándose a cualquier desafío para entregar resultados excepcionales.",
    },
    {
      index: "03",
      title: "Cristina",
      image: "/images/process/process_002.jpeg",
      description:
        "Estratega de lanzamiento experta. Cristina diseña y ejecuta lanzamientos que generan expectativa, convierten audiencias y maximizan las ventas desde el primer día.",
    },
    {
      index: "04",
      title: "Luara",
      image: "/images/process/process_003.jpeg",
      description:
        "Mente creativa y experiencia de usuario. Luara crea experiencias digitales que enamoran a los usuarios y convierten visitantes en clientes fieles.",
    },
    {
      index: "05",
      title: "Fátima",
      image: "/images/process/process_004.jpeg",
      description:
        "La samurai del copy. Fátima escribe textos que venden, persuaden y convierten, transformando ideas complejas en mensajes que generan acción inmediata.",
    },
  ];

  useGSAP(() => {
    const processCards = document.querySelectorAll(".process-card");

    processCards.forEach((card, index) => {
      if (index < processCards.length - 1) {
        ScrollTrigger.create({
          trigger: card,
          start: "top top",
          endTrigger: processCards[processCards.length - 1],
          end: "top top",
          pin: true,
          pinSpacing: false,
          id: `card-pin-${index}`,
        });
      }

      if (index < processCards.length - 1) {
        ScrollTrigger.create({
          trigger: processCards[index + 1],
          start: "top bottom",
          end: "top top",
          onUpdate: (self) => {
            const progress = self.progress;
            const scale = 1 - progress * 0.25;
            const rotation = (index % 2 === 0 ? 5 : -5) * progress;
            const afterOpacity = progress;

            gsap.set(card, {
              scale: scale,
              rotation: rotation,
              "--after-opacity": afterOpacity,
            });
          },
        });
      }
    });
  }, []);

  return (
    <div className="process-cards">
      {processCardsData.map((cardData, index) => (
        <div key={index} className="process-card">
          <div className="process-card-index">
            <h1>{cardData.index}</h1>
          </div>
          <div className="process-card-content">
            <div className="process-card-content-wrapper">
              <h1 className="process-card-header">{cardData.title}</h1>

              <div className="process-card-img">
                <img src={cardData.image} alt="" />
              </div>

              <div className="process-card-copy">
                <div className="process-card-copy-title">
                  <p className="caps">(Su especialidad)</p>
                </div>
                <div className="process-card-copy-description">
                  <p>{cardData.description}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProcessCards;
