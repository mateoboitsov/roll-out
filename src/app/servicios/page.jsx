"use client";
import { useRef, useState, useEffect } from "react";
import { useTransitionRouter } from "next-view-transitions";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import InfiniteCarousel from "../../components/InfiniteCarousel/InfiniteCarousel";
import "./servicios.css";

const ServiciosPage = () => {
  const router = useTransitionRouter();
  const serviciosRef = useRef(null);
  const counterRef = useRef(null);
  const carouselRef = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(1);
  const [isAnimating, setIsAnimating] = useState(false);

  // Datos de servicios para el carrusel
  const servicios = [
    {
      titleLines: ["Lanzamientos", "& Infoproductos"],
      image: "/images/archive/img55.jpeg"
    },
    {
      titleLines: ["Ecommerce", "& Performance"],
      image: "/images/archive/img13.jpeg"
    },
    {
      titleLines: ["Marketing Digital", "Estratégico"],
      image: "/images/archive/img56.jpeg"
    },
    {
      titleLines: ["Consultoría", "& Growth Partner"],
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

  // Función para animar el contador
  const animateCounter = (newSlideNumber, direction) => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    
    const counterContainer = counterRef.current;
    const currentCounter = counterContainer.querySelector("p");
    
    const newCounter = document.createElement("p");
    newCounter.textContent = newSlideNumber;
    
    gsap.set(newCounter, {
      y: direction === "down" ? 18 : -18,
    });
    
    counterContainer.appendChild(newCounter);
    
    const tl = gsap.timeline({
      onComplete: () => {
        currentCounter?.remove();
        setIsAnimating(false);
      },
    });
    
    tl.to(
      currentCounter,
      {
        y: direction === "down" ? -18 : 18,
        duration: 1.25,
        ease: "power4.inOut(1.7)",
      },
      0
    )
    .to(
      newCounter,
      {
        y: 0,
        duration: 1.25,
        ease: "power4.inOut(1.7)",
      },
      0
    );
  };

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

  const handleSlideChange = (slideNumber) => {
    const direction = slideNumber > currentSlide || (currentSlide === servicios.length && slideNumber === 1) ? "down" : "up";
    setCurrentSlide(slideNumber);
    animateCounter(slideNumber, direction);
  };

  // Funciones para navegación manual con flechas
  const handlePrevClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (carouselRef.current && typeof carouselRef.current.animateSlide === 'function') {
      carouselRef.current.animateSlide("up");
    }
  };

  const handleNextClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (carouselRef.current && typeof carouselRef.current.animateSlide === 'function') {
      carouselRef.current.animateSlide("down");
    }
  };

  return (
    <div className="servicios-page" ref={serviciosRef}>
      <footer>
        <div className="slider-counter">
          <div className="count" ref={counterRef}>
            <p>{currentSlide}</p>
          </div>
          <p>/</p>
          <p>{servicios.length}</p>
        </div>
        
        <div className="footer-navigation">
          <button className="nav-btn prev-btn" onClick={handlePrevClick}>
            ←
          </button>
          <button className="nav-btn next-btn" onClick={handleNextClick}>
            →
          </button>
        </div>
      </footer>

      <div className="servicios-carousel">
        <InfiniteCarousel 
          ref={carouselRef}
          services={servicios} 
          onSlideChange={handleSlideChange} 
        />
      </div>
    </div>
  );
};

export default ServiciosPage; 