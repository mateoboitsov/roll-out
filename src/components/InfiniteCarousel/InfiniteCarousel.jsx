"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import "./InfiniteCarousel.css";

// Función de easing personalizada usando GSAP
const customEase = "power4.inOut(1.7)";

const InfiniteCarousel = ({ services }) => {
  const sliderRef = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(1);
  const [isAnimating, setIsAnimating] = useState(false);
  const [scrollAllowed, setScrollAllowed] = useState(true);
  const [lastScrollTime, setLastScrollTime] = useState(0);

  const totalSlides = services.length;

  const createSlide = (slideNumber, direction) => {
    const slide = document.createElement("div");
    slide.className = "slide";

    const slideBgImg = document.createElement("div");
    slideBgImg.className = "slide-bg-img";

    const img = document.createElement("img");
    img.src = services[slideNumber - 1].image;
    img.alt = services[slideNumber - 1].title;

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
    img.alt = services[slideNumber - 1].title;

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
    const newTitle = document.createElement("h1");
    newTitle.textContent = services[slideNumber - 1].title;
    gsap.set(newTitle, {
      y: direction === "down" ? 50 : -50,
    });

    const newDescription = document.createElement("p");
    newDescription.textContent = services[slideNumber - 1].description;
    gsap.set(newDescription, {
      y: direction === "down" ? 20 : -20,
    });

    return { newTitle, newDescription };
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

    const currentTitle = titleContainer.querySelector("h1");
    const currentDescription = descriptionContainer.querySelector("p");

    let newSlideNumber;
    if (direction === "down") {
      newSlideNumber = currentSlide === totalSlides ? 1 : currentSlide + 1;
    } else {
      newSlideNumber = currentSlide === 1 ? totalSlides : currentSlide - 1;
    }

    setCurrentSlide(newSlideNumber);

    const newSlide = createSlide(newSlideNumber, direction);
    const newMainWrapper = createMainImageWrapper(newSlideNumber, direction);
    const { newTitle, newDescription } = createTextElements(
      newSlideNumber,
      direction
    );

    slider.appendChild(newSlide);
    mainImageContainer.appendChild(newMainWrapper);
    titleContainer.appendChild(newTitle);
    descriptionContainer.appendChild(newDescription);

    gsap.set(newMainWrapper.querySelector("img"), {
      y: direction === "down" ? "-50%" : "50%",
    });

    const tl = gsap.timeline({
      onComplete: () => {
        [
          currentSlideElement,
          currentMainWrapper,
          currentTitle,
          currentDescription,
        ].forEach((el) => el?.remove());

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
        ease: customEase,
      },
      0
    )
      .to(
        currentSlideElement.querySelector("img"),
        {
          scale: 1.5,
          duration: 1.25,
          ease: customEase,
        },
        0
      )
      .to(
        newMainWrapper,
        {
          clipPath:
            direction === "down"
              ? "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)"
              : "polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)",
          duration: 1.25,
          ease: customEase,
        },
        0
      )
      .to(
        currentMainWrapper.querySelector("img"),
        {
          y: direction === "down" ? "50%" : "-50%",
          duration: 1.25,
          ease: customEase,
        },
        0
      )
      .to(
        newMainWrapper.querySelector("img"),
        {
          y: "0%",
          duration: 1.25,
          ease: customEase,
        },
        0
      )
      .to(
        currentTitle,
        {
          y: direction === "down" ? -50 : 50,
          duration: 1.25,
          ease: customEase,
        },
        0
      )
      .to(
        newTitle,
        {
          y: 0,
          duration: 1.25,
          ease: customEase,
        },
        0
      )
      .to(
        currentDescription,
        {
          y: direction === "down" ? -20 : 20,
          duration: 1.25,
          ease: customEase,
        },
        0
      )
      .to(
        newDescription,
        {
          y: 0,
          duration: 1.25,
          ease: customEase,
        },
        0
      );
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
            <h1>{services[0].title}</h1>
          </div>
          <div className="slide-description">
            <p>{services[0].description}</p>
          </div>
        </div>
      </div>

      <div className="slider-counter">
        <div className="count">
          <p>{currentSlide}</p>
        </div>
        <p>/</p>
        <p>{totalSlides}</p>
      </div>
    </div>
  );
};

export default InfiniteCarousel;