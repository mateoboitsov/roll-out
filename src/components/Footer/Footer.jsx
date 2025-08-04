"use client";
import "./Footer.css";
import { useRef } from "react";

import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useTransitionRouter } from "next-view-transitions";

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const footerRef = useRef(null);
  const router = useTransitionRouter();

  function slideInOut() {
    document.documentElement.animate(
      [
        {
          opacity: 1,
          transform: "translateY(0) scale(1)",
        },
        {
          opacity: 0.2,
          transform: "translateY(-30%) scale(0.90)",
        },
      ],
      {
        duration: 1500,
        easing: "cubic-bezier(0.87, 0, 0.13, 1)",
        fill: "forwards",
        pseudoElement: "::view-transition-old(root)",
      }
    );

    document.documentElement.animate(
      [
        {
          clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
        },
        {
          clipPath: "polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)",
        },
      ],
      {
        duration: 1500,
        easing: "cubic-bezier(0.87, 0, 0.13, 1)",
        fill: "forwards",
        pseudoElement: "::view-transition-new(root)",
      }
    );
  }

  const handleNavigation = (e, route) => {
    e.preventDefault();
    router.push(route, {
      onTransitionReady: slideInOut,
    });
  };

  useGSAP(
    () => {
      const textElements = footerRef.current.querySelectorAll(".footer-text");

      textElements.forEach((element) => {
        const textContent = element.querySelector(".footer-text-content");
        gsap.set(textContent, {
          y: "100%",
        });
      });

      ScrollTrigger.create({
        trigger: footerRef.current,
        start: "top 80%",
        onEnter: () => {
          textElements.forEach((element, index) => {
            const textContent = element.querySelector(".footer-text-content");
            gsap.to(textContent, {
              y: "0%",
              duration: 0.8,
              delay: index * 0.1,
              ease: "power3.out",
            });
          });
        },
      });
    },
    { scope: footerRef }
  );

  return (
    <div className="footer" ref={footerRef}>
      <div className="footer-socials">
        <div className="fs-col-lg"></div>
        <div className="fs-col-sm">
          <div className="fs-header">
            <div className="footer-text">
              <div className="footer-text-content">
                <p className="sm caps">( Socials )</p>
              </div>
            </div>
          </div>
          <div className="footer-social">
            <a href="mailto:Cristina@rollout-studios.com">
              <div className="footer-text">
                <div className="footer-text-content">
                  <h2>Email</h2>
                </div>
              </div>
            </a>
          </div>
          <div className="footer-social">
            <a href="https://wa.me/351927697179?text=Hola%2C%20me%20gustar%C3%ADa%20obtener%20m%C3%A1s%20informaci%C3%B3n%20sobre%20sus%20servicios." target="_blank" rel="noopener noreferrer">
              <div className="footer-text">
                <div className="footer-text-content">
                  <h2>WhatsApp</h2>
                </div>
              </div>
            </a>
          </div>
          <div className="footer-social">
            <a href="https://www.linkedin.com/company/rollout-studios/" target="_blank" rel="noopener noreferrer">
              <div className="footer-text">
                <div className="footer-text-content">
                  <h2>LinkedIn</h2>
                </div>
              </div>
            </a>
          </div>
          <div className="footer-social">
            <a href="https://www.instagram.com/rollout.studios/" target="_blank" rel="noopener noreferrer">
              <div className="footer-text">
                <div className="footer-text-content">
                  <h2>Instagram</h2>
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>

      <div className="footer-copy">
        <div className="fc-col-lg">
          <div className="footer-text">
            <div className="footer-text-content">
              <div className="footer-main-content">
                <div className="footer-links">
                  <a href="/aviso-legal" className="footer-link" onClick={(e) => handleNavigation(e, "/aviso-legal")}>Aviso Legal</a>
                  <a href="/politica-privacidad" className="footer-link" onClick={(e) => handleNavigation(e, "/politica-privacidad")}>Política de Privacidad</a>
                  <a href="/politica-cookies" className="footer-link" onClick={(e) => handleNavigation(e, "/politica-cookies")}>Política de Cookies</a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="fc-col-sm">
          <div className="footer-text">
            <div className="footer-text-content">
              <p className="sm caps">&copy; 2025 All Rights Reserved</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
