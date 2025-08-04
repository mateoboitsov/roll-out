"use client";
import { useRef } from "react";
import { useTransitionRouter } from "next-view-transitions";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import InfiniteCarousel from "../../components/InfiniteCarousel/InfiniteCarousel";
import "./servicios.css";

const ServiciosPage = () => {
  const router = useTransitionRouter();
  const serviciosRef = useRef(null);

  // Datos de servicios para el carrusel
  const servicios = [
    {
      title: "Lanzamientos & Infoproductos",
      description: "Estrategias de lanzamiento digital",
      image: "/images/archive/img55.jpeg"
    },
    {
      title: "Ecommerce & Performance",
      description: "Optimización de tiendas online",
      image: "/images/archive/img13.jpeg"
    },
    {
      title: "Marketing Digital Estratégico",
      description: "Planes de marketing integral",
      image: "/images/archive/img56.jpeg"
    },
    {
      title: "Consultoría & Growth Partner",
      description: "Asesoramiento estratégico",
      image: "/images/archive/img53.jpeg"
    }
  ];

  useGSAP(
    () => {
      // Animación de entrada para la página
      gsap.fromTo(
        serviciosRef.current,
        {
          opacity: 0,
          y: 50
        },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out"
        }
      );
    },
    { scope: serviciosRef }
  );

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

  return (
    <div className="servicios-page" ref={serviciosRef}>
      <div className="servicios-carousel">
        <InfiniteCarousel services={servicios} />
      </div>

      <div className="servicios-footer">
        <div className="fc-col-lg">
          <div className="footer-text">
            <div className="footer-text-content">
              <p className="sm caps">Roll Out Studios</p>
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

export default ServiciosPage; 