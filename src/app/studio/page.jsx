"use client";
import "./studio.css";
import { useRef } from "react";

import Copy from "../../components/Copy/Copy";
import BtnLink from "../../components/BtnLink/BtnLink";
import WhoWeAre from "../../components/WhoWeAre/WhoWeAre";
import ProcessCards from "../../components/ProcessCards/ProcessCards";
import Footer from "../../components/Footer/Footer";

import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(SplitText, ScrollTrigger);

const page = () => {
  const studioRef = useRef(null);

  useGSAP(() => {
    if (!studioRef.current) return;

    const studioHeroH1 = studioRef.current.querySelector(".studio-hero h1");
    const studioHeroImgWrapper = studioRef.current.querySelector(
      ".studio-hero-img-wrapper"
    );
    const missionLinkWrapper = studioRef.current.querySelector(".mission-link");

    if (studioHeroH1) {
      const split = SplitText.create(studioHeroH1, {
        type: "chars",
        charsClass: "char++",
      });

      split.chars.forEach((char) => {
        const wrapper = document.createElement("span");
        wrapper.className = "char-mask";
        wrapper.style.overflow = "hidden";
        wrapper.style.display = "inline-block";
        char.parentNode.insertBefore(wrapper, char);
        wrapper.appendChild(char);
      });

      gsap.set(split.chars, { y: "100%" });

      gsap.to(split.chars, {
        y: "0%",
        duration: 0.8,
        stagger: 0.2,
        delay: 0.85,
        ease: "power3.out",
      });
    }

    if (studioHeroImgWrapper) {
      gsap.set(studioHeroImgWrapper, {
        clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
      });

      gsap.to(studioHeroImgWrapper, {
        clipPath: "polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)",
        duration: 1,
        delay: 1,
        ease: "power3.out",
      });
    }

    if (missionLinkWrapper) {
      gsap.set(missionLinkWrapper, { y: 30, opacity: 0 });

      ScrollTrigger.create({
        trigger: missionLinkWrapper.closest(".mission-intro-copy"),
        start: "top 75%",
        once: true,
        onEnter: () => {
          gsap.to(missionLinkWrapper, {
            y: 0,
            opacity: 1,
            duration: 1,
            delay: 1.2,
            ease: "power3.out",
          });
        },
      });
    }
  });

  return (
    <>
      <div className="studio" ref={studioRef}>
        <section className="studio-hero">
          <h1 className="caps">Roll Out</h1>
        </section>

        <section className="studio-hero-img">
          <div className="studio-hero-img-wrapper">
            <img src="/images/studio/hero.jpeg" alt="" />
          </div>
        </section>

        <section className="studio-header">
          <div className="studio-header-copy">
            <Copy>
              <p className="sm caps">Quienes somos</p>
              <br />
              <h2>
                Hemos hecho campañas exitosas generando 50M en ventas reales, gestionando más de 10M de inversión publicitaria. Tenemos el conocimiento y la experiencia para escalar tus ventas.
              </h2>
            </Copy>
          </div>
        </section>

        <WhoWeAre />

        <section className="mission-intro">
          <div className="mission-intro-col-sm"></div>
          <div className="mission-intro-col-lg">
            <div className="mission-intro-copy">
              <Copy>
                <h3>
                  Hemos hecho que lanzamientos digitales parezcan estrenos de Hollywood,
                  que embudos de venta conviertan mientras tú estás en la playa,
                  y que campañas vendan más que un influencer con micrófono.                  
                </h3>
                <br />
                <h3>
                  Hemos llenado carritos, agotado cursos,
                  automatizado ventas y escalado marcas que estaban dormidas.
                  Si quieres despegar como cohete,
                  hagámoslo épico.
                </h3>
              </Copy>

              <div className="mission-link">
                <BtnLink route="/work" label="Ver casos de éxito" dark />
              </div>
            </div>
          </div>
        </section>

        <ProcessCards />

        <section className="recognition">
          <div className="recognition-copy">
            <Copy>
              <p className="sm caps">(Ahora es tu turno)</p>
              <br />
              <h2>
                Hemos llenado carritos, agotado lanzamientos, automatizado ventas y despertado marcas dormidas. Ahora, te ayudamos a hacer lo mismo.
              </h2>
            </Copy>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default page;
