"use client";
import { useState, useEffect } from "react";

import DynamicBackground from "../components/DynamicBackground/DynamicBackground.jsx";
import Copy from "../components/Copy/Copy";
import BtnLink from "../components/BtnLink/BtnLink";

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CustomEase from "gsap/CustomEase";

gsap.registerPlugin(ScrollTrigger, CustomEase);
CustomEase.create("hop", "0.9, 0, 0.1, 1");

let isInitialLoad = true;

export default function HomeClient() {
  const [showPreloader, setShowPreloader] = useState(isInitialLoad);

  useEffect(() => {
    return () => {
      isInitialLoad = false;
    };
  }, []);

  useGSAP(() => {
    const heroLink = document.querySelector(".hero-link");
    const animationDelay = showPreloader ? 1.5 : 0.9;

    if (showPreloader) {
      const preloaderOverlay = document.querySelector(".preloader-overlay");
      const progressBar = document.querySelector(".preloader-progress-bar");

      const tl = gsap.timeline({ delay: 0.2 });

      tl.fromTo(
        ".preloader-logo",
        { opacity: 0 },
        { opacity: 1, duration: 0.4, ease: "power2.out" }
      )
      .fromTo(
        progressBar,
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 0.6,
          ease: "power1.inOut",
          onUpdate: function () {
            const progress = this.progress();
            if (progress >= 1) {
              progressBar.style.backgroundColor = "#B8FF53";
            }
          },
          onComplete: () => {
            progressBar.style.backgroundColor = "#B8FF53";
          },
        },
        "<"
      )
      .to(progressBar, {
        scaleX: 0,
        duration: 0.35,
        delay: 0.15,
        ease: "power2.in",
        transformOrigin: "right",
      })
      .to(".preloader-overlay", {
        yPercent: -100,
        duration: 0.7,
        ease: "hop",
        onComplete: () => {
          preloaderOverlay.style.display = "none";
        },
      });
    }

    if (heroLink) {
      gsap.set(heroLink, { y: 30, opacity: 0 });

      gsap.to(heroLink, {
        y: 0,
        opacity: 1,
        duration: 1,
        delay: animationDelay,
        ease: "power4.out",
      });
    }
  }, [showPreloader]);

  return (
    <>
      {showPreloader && (
        <div className="preloader-overlay">
          <div className="preloader-logo">
            <img src="/images/logos/logo_light.png" alt="Roll Out Studios" />
          </div>
          <div className="preloader-progress-bar"></div>
        </div>
      )}

      <section className="hero">
        <DynamicBackground logoPath="/images/logos/logo_light.png" />

        <div className="hero-content">
          <div className="hero-header">
            <div className="hero-header-col-lg"></div>
            <div className="hero-header-col-sm">
              <Copy animateOnScroll={false} delay={showPreloader ? 1.3 : 0.9}>
                <h3>
                  Pensamos con estrategia y ejecutamos con creatividad para crear marcas fuertes y lograr ventas constantes.
                </h3>
              </Copy>
            </div>
          </div>

          <div className="hero-footer">
            <div className="hero-footer-col-lg">
              <Copy animateOnScroll={false} delay={showPreloader ? 1.3 : 0.9}>
                <p className="sm caps mono">Roll Out Studios</p>
                <p className="sm caps mono">Portugal</p>
              </Copy>
            </div>
            <div className="hero-footer-col-sm">
              <div className="hero-tags">
                <Copy animateOnScroll={false} delay={showPreloader ? 1.3 : 0.9}>
                  <p className="sm caps mono">Lanzamientos & Infoproductos</p>
                  <p className="sm caps mono">Ecommerce & Performance</p>
                  <p className="sm caps mono">Marketing Digital Estratégico</p>
                  <p className="sm caps mono">Consultoría & Growth Partner</p>
                </Copy>
              </div>

              <div className="hero-link">
                <BtnLink route="/contact" label="contacto" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
