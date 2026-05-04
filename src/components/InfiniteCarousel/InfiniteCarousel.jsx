"use client";
import { useEffect, useRef, useState, forwardRef, useImperativeHandle } from "react";
import gsap from "gsap";
import { CustomEase } from "gsap/CustomEase";
import "./InfiniteCarousel.css";

// Registrar CustomEase con GSAP
gsap.registerPlugin(CustomEase);

const InfiniteCarousel = forwardRef(({ services, onSlideChange }, ref) => {
  const sliderRef = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(1);
  const [isAnimating, setIsAnimating] = useState(false);
  const [scrollAllowed, setScrollAllowed] = useState(true);
  const [lastScrollTime, setLastScrollTime] = useState(0);

  const totalSlides = services.length;
  const contentUpdateDelay = 0.4;

  // Exponer funciones al componente padre
  useImperativeHandle(ref, () => ({
    animateSlide: (direction) => {
      if (isAnimating || !scrollAllowed) return;
      animateSlide(direction);
    }
  }));

  const createSlide = (slideNumber, direction) => {
    const slide = document.createElement("div");
    slide.className = "slide";

    const slideBgImg = document.createElement("div");
    slideBgImg.className = "slide-bg-img";

    const img = document.createElement("img");
    img.src = services[slideNumber - 1].image;
    const serviceForAlt = services[slideNumber - 1];
    img.alt = Array.isArray(serviceForAlt.titleLines) && serviceForAlt.titleLines.length > 0
      ? serviceForAlt.titleLines.join(" ")
      : serviceForAlt.title;

    slideBgImg.appendChild(img);
    slide.appendChild(slideBgImg);

    if (direction === "down") {
      slideBgImg.style.clipPath =
        "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)";
    } else {
      slideBgImg.style.clipPath = "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)";
    }

    return slide;
  };

  const createMainImageWrapper = (slideNumber, direction) => {
    const wrapper = document.createElement("div");
    wrapper.className = "slide-main-img-wrapper";

    const img = document.createElement("img");
    img.src = services[slideNumber - 1].image;
    const serviceForAlt2 = services[slideNumber - 1];
    img.alt = Array.isArray(serviceForAlt2.titleLines) && serviceForAlt2.titleLines.length > 0
      ? serviceForAlt2.titleLines.join(" ")
      : serviceForAlt2.title;

    wrapper.appendChild(img);

    if (direction === "down") {
      wrapper.style.clipPath = "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)";
    } else {
      wrapper.style.clipPath =
        "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)";
    }

    return wrapper;
  };

  const createTextElements = (slideNumber, direction) => {
    const service = services[slideNumber - 1];

    const newTitleRows = [];
    if (Array.isArray(service.titleLines) && service.titleLines.length > 0) {
      service.titleLines.forEach((line) => {
        const row = document.createElement("div");
        row.className = "slide-title-row";
        const h1 = document.createElement("h1");
        h1.textContent = line;
        row.appendChild(h1);
        gsap.set(h1, { y: direction === "down" ? 48 : -48 });
        newTitleRows.push(row);
      });
    } else {
      const h1 = document.createElement("h1");
      h1.textContent = service.title;
      gsap.set(h1, { y: direction === "down" ? 50 : -50 });
      newTitleRows.push(h1);
    }

    let newDescription = null;
    if (!Array.isArray(service.titleLines) && service.description) {
      newDescription = document.createElement("p");
      newDescription.textContent = service.description;
      gsap.set(newDescription, {
        y: direction === "down" ? 20 : -20,
      });
    }

    return { newTitleRows, newDescription };
  };

  const animateSlide = (direction) => {
    if (isAnimating || !scrollAllowed) return;

    setIsAnimating(true);
    setScrollAllowed(false);

    const slider = sliderRef.current;
    const currentSlideElement = slider.querySelector(".slide");
    const mainImageContainer = slider.querySelector(".slide-main-img");
    const currentMainWrapper = mainImageContainer.querySelector(
      ".slide-main-img-wrapper"
    );

    const titleContainer = slider.querySelector(".slide-title");
    const descriptionContainer = slider.querySelector(".slide-description");

    const currentTitleRows = Array.from(titleContainer.querySelectorAll(".slide-title-row"));
    const currentTitleH1s = currentTitleRows.length
      ? currentTitleRows.map((row) => row.querySelector("h1")).filter(Boolean)
      : Array.from(titleContainer.querySelectorAll("h1"));
    const currentDescription = descriptionContainer.querySelector("p");

    let newSlideNumber;
    if (direction === "down") {
      newSlideNumber = currentSlide === totalSlides ? 1 : currentSlide + 1;
    } else {
      newSlideNumber = currentSlide === 1 ? totalSlides : currentSlide - 1;
    }

    setCurrentSlide(newSlideNumber);
    
    // Notificar al componente padre sobre el cambio de slide
    if (onSlideChange) {
      onSlideChange(newSlideNumber);
    }

    const newSlide = createSlide(newSlideNumber, direction);
    const newMainWrapper = createMainImageWrapper(newSlideNumber, direction);

    // Solo usaremos la parte de descripción de createTextElements; el título lo animamos por slots como en Casos de Éxito
    const { newDescription } = createTextElements(newSlideNumber, direction);

    slider.appendChild(newSlide);
    mainImageContainer.appendChild(newMainWrapper);
    if (newDescription) {
      descriptionContainer.appendChild(newDescription);
    }

    gsap.set(newMainWrapper.querySelector("img"), {
      y: direction === "down" ? "-50%" : "50%",
    });

    // Preparar animación de texto por filas (slots)
    const serviceNext = services[newSlideNumber - 1];
    const nextLines = Array.isArray(serviceNext.titleLines)
      ? serviceNext.titleLines
      : [serviceNext.title];

    const currentRows = Array.from(titleContainer.querySelectorAll(".slide-title-row"));
    const outgoingH1s = [];
    const incomingH1s = [];
    const rowsToRemove = [];
    const oldH1sToRemove = [];

    // Asegurar suficientes filas para las nuevas líneas
    for (let i = 0; i < nextLines.length; i += 1) {
      const line = nextLines[i];
      let row = currentRows[i];
      if (!row) {
        row = document.createElement("div");
        row.className = "slide-title-row";
        titleContainer.appendChild(row);
      }
      const currentH1 = row.querySelector("h1");
      if (currentH1) {
        outgoingH1s.push(currentH1);
        oldH1sToRemove.push(currentH1);
      }
      const newH1 = document.createElement("h1");
      newH1.textContent = line;
      gsap.set(newH1, { y: direction === "down" ? 48 : -48, opacity: 0 });
      row.appendChild(newH1);
      incomingH1s.push(newH1);
    }

    // Filas sobrantes (si antes había más que ahora)
    for (let j = nextLines.length; j < currentRows.length; j += 1) {
      const extraRow = currentRows[j];
      const h1 = extraRow.querySelector("h1");
      if (h1) {
        outgoingH1s.push(h1);
        oldH1sToRemove.push(h1);
      }
      rowsToRemove.push(extraRow);
    }

    const tl = gsap.timeline({
      onComplete: () => {
        // Limpiar texto: eliminar h1 antiguos de filas conservadas y filas sobrantes completas
        oldH1sToRemove.forEach((h1) => h1?.remove());
        rowsToRemove.forEach((row) => row?.remove());

        // Limpiar otros elementos
        [currentSlideElement, currentMainWrapper, currentDescription].forEach((el) => el?.remove());

        setIsAnimating(false);
        setTimeout(() => {
          setScrollAllowed(true);
          setLastScrollTime(Date.now());
        }, 100);
      },
    });

    tl.to(
      newSlide.querySelector(".slide-bg-img"),
      {
        clipPath:
          direction === "down"
            ? "polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)"
            : "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        duration: 1.25,
        ease: CustomEase.create("", ".87,0,.13,1"),
      },
      0
    );
    tl.to(
      currentSlideElement.querySelector("img"),
      {
        scale: 1.5,
        duration: 1.25,
        ease: CustomEase.create("", ".87,0,.13,1"),
      },
      0
    );
    tl.to(
      newMainWrapper,
      {
        clipPath:
          direction === "down"
            ? "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)"
            : "polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)",
        duration: 1.25,
        ease: CustomEase.create("", ".87,0,.13,1"),
      },
      0
    );
    tl.to(
      currentMainWrapper.querySelector("img"),
      {
        y: direction === "down" ? "50%" : "-50%",
        duration: 1.25,
        ease: CustomEase.create("", ".87,0,.13,1"),
      },
      0
    );
    tl.to(
      newMainWrapper.querySelector("img"),
      {
        y: "0%",
        duration: 1.25,
        ease: CustomEase.create("", ".87,0,.13,1"),
      },
      0
    );
    if (outgoingH1s.length) {
      tl.to(
        outgoingH1s,
        {
          y: direction === "down" ? -48 : 48,
          opacity: 0,
          duration: 0.5,
          delay: contentUpdateDelay,
          ease: "power4.inOut",
        },
        0
      );
    }
    if (incomingH1s.length) {
      tl.to(
        incomingH1s,
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          delay: contentUpdateDelay,
          ease: "power4.inOut",
        },
        0
      );
    }
    if (currentDescription) {
      tl.to(
        currentDescription,
        {
          y: direction === "down" ? -20 : 20,
          duration: 1.25,
          ease: CustomEase.create("", ".87,0,.13,1"),
        },
        0
      );
    }
    if (newDescription) {
      tl.to(
        newDescription,
        {
          y: 0,
          duration: 1.25,
          ease: CustomEase.create("", ".87,0,.13,1"),
        },
        0
      );
    }
  };

  const handleScroll = (direction) => {
    const now = Date.now();
    if (isAnimating || !scrollAllowed) return;
    if (now - lastScrollTime < 1000) return;
    setLastScrollTime(now);
    animateSlide(direction);
  };

  useEffect(() => {
    const handleWheel = (e) => {
      e.preventDefault();
      const direction = e.deltaY > 0 ? "down" : "up";
      handleScroll(direction);
    };

    let touchStartY = 0;
    let isTouchActive = false;

    const handleTouchStart = (e) => {
      touchStartY = e.touches[0].clientY;
      isTouchActive = true;
    };

    const handleTouchMove = (e) => {
      e.preventDefault();
      if (!isTouchActive || isAnimating || !scrollAllowed) return;
      const touchCurrentY = e.touches[0].clientY;
      const difference = touchStartY - touchCurrentY;
      if (Math.abs(difference) > 10) {
        isTouchActive = false;
        const direction = difference > 0 ? "down" : "up";
        handleScroll(direction);
      }
    };

    const handleTouchEnd = () => {
      isTouchActive = false;
    };

    // Agregar event listeners a window como en el original
    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("touchstart", handleTouchStart, { passive: false });
    window.addEventListener("touchmove", handleTouchMove, { passive: false });
    window.addEventListener("touchend", handleTouchEnd);

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [isAnimating, scrollAllowed, lastScrollTime]);

  return (
    <div className="infinite-carousel-container">
      <div className="slider" ref={sliderRef}>
        <div className="slide">
          <div className="slide-bg-img">
            <img src={services[0].image} alt={services[0].title} />
          </div>
        </div>

        <div className="slide-main-img">
          <div className="slide-main-img-wrapper">
            <img src={services[0].image} alt={services[0].title} />
          </div>
        </div>

        <div className="slide-copy">
          <div className="slide-title">
            {Array.isArray(services[0].titleLines) && services[0].titleLines.length > 0 ? (
              services[0].titleLines.map((line, idx) => (
                <div className="slide-title-row" key={idx}>
                  <h1>{line}</h1>
                </div>
              ))
            ) : (
              <h1>{services[0].title}</h1>
            )}
          </div>
          <div className="slide-description">
            {!Array.isArray(services[0].titleLines) && services[0].description ? (
              <p>{services[0].description}</p>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
});

InfiniteCarousel.displayName = "InfiniteCarousel";

export default InfiniteCarousel;