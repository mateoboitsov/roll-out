"use client";
import { useRef, useEffect } from "react";
import { useTransitionRouter } from "next-view-transitions";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import "./casos-de-exito.css";

const CasosDeExitoPage = () => {
  const router = useTransitionRouter();
  const pageRef = useRef(null);
  const activeCaseRef = useRef(0);
  const directionRef = useRef("next");
  const storyTimeoutRef = useRef(null);
  const isInitializedRef = useRef(false);

  // Datos de casos de éxito
  const casosDeExito = [
    {
      profileColor: "#000000",
      clientName: "Tradeando",
      title: [
        "+1.8 millones de euros",
        "gestionados en el",
        "último año",
      ],
      linkLabel: "Ver Caso",
      linkSrc: "/casos-de-exito/tradeando",
              storyImg: "/images/cases/case-1.jpg",
    },
    {
      profileColor: "#000000",
      clientName: "Sansoeurs",
      title: ["De 40K a casi", "90K €/mes en", "4 meses"],
      linkLabel: "Ver Caso",
      linkSrc: "/casos-de-exito/sansoeurs",
              storyImg: "/images/cases/case-2.jpg",
    },
    {
      profileColor: "#000000",
      clientName: "Nuria Coll",
      title: ["60.000 leads y", "más de 400.000€", "en facturación"],
      linkLabel: "Ver Caso",
      linkSrc: "/casos-de-exito/nuria-coll",
              storyImg: "/images/cases/case-3.jpg",
    },
    {
      profileColor: "#000000",
      clientName: "Tutete",
      title: ["Más de 42.000", "compras generadas", "en 12 meses"],      
      linkLabel: "Ver Caso",
      linkSrc: "/casos-de-exito/tutete",
              storyImg: "/images/cases/case-4.jpg",
    },
    {
      profileColor: "#000000",
      clientName: "OFFLESSON",
      title: ["Lanzamos Offlesson", "y el primer día", "éxito total: 600 compras"],
      linkLabel: "Ver Caso",
      linkSrc: "/casos-de-exito/offlesson",
      storyImg: "/images/cases/macbook-2.jpg",
    },
    {
      profileColor: "#000000",
      clientName: "SER CLOSER",
      title: ["+660.000 € en", "ingresos en 9 meses", "y crecimiento", "sostenido del ROAS"],
      linkLabel: "Ver Caso",
      linkSrc: "/casos-de-exito/ser-closer",
      storyImg: "/images/cases/image-copy-8.png",
    },
    {
      profileColor: "#000000",
      clientName: "PABLO GIL",
      title: ["+4.3x ROAS en", "campañas evergreen", "y +1.100 leads", "en solo 3 meses"],
      linkLabel: "Ver Caso",
      linkSrc: "/casos-de-exito/pablo-gil",
      storyImg: "/images/cases/image-copy-9.png",
    },
  ];

  const storyDuration = 4000;
  const contentUpdateDelay = 0.4;

  useGSAP(
    () => {
      // Animación de entrada para la página
      gsap.fromTo(
        pageRef.current,
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
    { scope: pageRef }
  );

  const resetIndexHighlight = (index, currentDirection) => {
    const highlight = document.querySelectorAll(".index .index-highlight")[index];
    if (highlight) {
      gsap.killTweensOf(highlight);
      gsap.to(highlight, {
        width: currentDirection === "next" ? "100%" : "0%",
        duration: 0.3,
        onStart: () => {
          gsap.to(highlight, {
            transformOrigin: "right center",
            scaleX: 0,
            duration: 0.3,
          });
        },
      });
    }
  };

  const animateIndexHighlight = (index) => {
    const highlight = document.querySelectorAll(".index .index-highlight")[index];
    if (highlight) {
      gsap.set(highlight, {
        width: "0%",
        scaleX: 1,
        transformOrigin: "right center",
      });
      gsap.to(highlight, {
        width: "100%",
        duration: storyDuration / 1000,
        ease: "none",
      });
    }
  };

  const animateNewImage = (imgContainer, currentDirection) => {
    gsap.set(imgContainer, {
      clipPath:
        currentDirection === "next"
          ? "polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)"
          : "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)",
    });
    gsap.to(imgContainer, {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      duration: 1,
      ease: "power4.inOut",
    });
  };

  const animateImageScale = (currentImg, upcomingImg, currentDirection) => {
    gsap.fromTo(
      currentImg,
      { scale: 1, rotate: 0 },
      {
        scale: 2,
        rotate: currentDirection === "next" ? -25 : 25,
        duration: 1,
        ease: "power4.inOut",
        onComplete: () => {
          if (currentImg.parentElement) {
            currentImg.parentElement.remove();
          }
        },
      }
    );
    gsap.fromTo(
      upcomingImg,
      { scale: 2, rotate: currentDirection === "next" ? 25 : -25 },
      { scale: 1, rotate: 0, duration: 1, ease: "power4.inOut" }
    );
  };

  const cleanUpElements = () => {
    const profileNameDiv = document.querySelector(".profile-name");
    const titleRows = document.querySelectorAll(".title-row");

    if (profileNameDiv) {
      while (profileNameDiv.childElementCount > 2) {
        profileNameDiv.removeChild(profileNameDiv.firstChild);
      }
    }

    titleRows.forEach((titleRow) => {
      while (titleRow.childElementCount > 2) {
        titleRow.removeChild(titleRow.firstChild);
      }
    });
  };

  const changeCase = (isAutomatic = true) => {
    const previousCase = activeCaseRef.current;
    const currentDirection = isAutomatic ? "next" : directionRef.current;

    if (currentDirection === "next") {
      activeCaseRef.current = (activeCaseRef.current + 1) % casosDeExito.length;
    } else {
      activeCaseRef.current = (activeCaseRef.current - 1 + casosDeExito.length) % casosDeExito.length;
    }

    console.log(`Changing case from ${previousCase} to ${activeCaseRef.current}`);

    const caso = casosDeExito[activeCaseRef.current];

    gsap.to(".profile-name p", {
      y: currentDirection === "next" ? -24 : 24,
      duration: 0.5,
      delay: contentUpdateDelay,
    });
    gsap.to(".title-row h1", {
      y: currentDirection === "next" ? -48 : 48,
      duration: 0.5,
      delay: contentUpdateDelay,
    });

    const currentImgContainer = document.querySelector(".story-img .img");
    const currentImg = currentImgContainer?.querySelector("img");

    setTimeout(() => {
      const newProfileName = document.createElement("p");
      newProfileName.innerText = caso.clientName;
      newProfileName.style.transform =
        currentDirection === "next" ? "translateY(24px)" : "translateY(-24px)";

      const profileNameDiv = document.querySelector(".profile-name");
      if (profileNameDiv) {
        profileNameDiv.appendChild(newProfileName);

        gsap.to(newProfileName, {
          y: 0,
          duration: 0.5,
          delay: contentUpdateDelay,
        });
      }

      const titleRows = document.querySelectorAll(".title-row");
      caso.title.forEach((line, index) => {
        if (titleRows[index]) {
          const newTitle = document.createElement("h1");
          newTitle.innerText = line;
          newTitle.style.transform =
            currentDirection === "next"
              ? "translateY(48px)"
              : "translateY(-48px)";
          titleRows[index].appendChild(newTitle);

          gsap.to(newTitle, {
            y: 0,
            duration: 0.5,
            delay: contentUpdateDelay,
          });
        }
      });

      const newImgContainer = document.createElement("div");
      newImgContainer.classList.add("img");
      const newStoryImg = document.createElement("img");
      newStoryImg.src = caso.storyImg;
      newStoryImg.alt = caso.clientName;
      newImgContainer.appendChild(newStoryImg);

      const storyImgDiv = document.querySelector(".story-img");
      if (storyImgDiv) {
        storyImgDiv.appendChild(newImgContainer);
        animateNewImage(newImgContainer, currentDirection);
      }

      if (currentImg && newStoryImg) {
        animateImageScale(currentImg, newStoryImg, currentDirection);
      }

      resetIndexHighlight(previousCase, currentDirection);
      animateIndexHighlight(activeCaseRef.current);

      cleanUpElements();

      if (storyTimeoutRef.current) {
        clearTimeout(storyTimeoutRef.current);
      }
      storyTimeoutRef.current = setTimeout(() => changeCase(true), storyDuration);
    }, 200);

    setTimeout(() => {
      const profileIcon = document.querySelector(".profile-icon div");
      if (profileIcon) {
        profileIcon.style.backgroundColor = caso.profileColor;
        profileIcon.textContent = caso.clientName.charAt(0);
      }

      const link = document.querySelector(".link a");
      if (link) {
        link.textContent = caso.linkLabel;
        link.href = caso.linkSrc;
      }
    }, 600);
  };

  useEffect(() => {
    // Solo inicializar una vez
    if (!isInitializedRef.current) {
      isInitializedRef.current = true;
      
      // Inicializar el autoplay después de un delay
      const initTimer = setTimeout(() => {
        animateIndexHighlight(activeCaseRef.current);
        storyTimeoutRef.current = setTimeout(() => changeCase(true), storyDuration);
      }, 1000);

      return () => {
        clearTimeout(initTimer);
        if (storyTimeoutRef.current) {
          clearTimeout(storyTimeoutRef.current);
        }
      };
    }
  }, []); // Sin dependencias para que solo se ejecute una vez

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

  const handlePrevClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (storyTimeoutRef.current) {
      clearTimeout(storyTimeoutRef.current);
    }
    
    directionRef.current = "prev";
    resetIndexHighlight(activeCaseRef.current, "prev");
    changeCase(false);
  };

  const handleNextClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (storyTimeoutRef.current) {
      clearTimeout(storyTimeoutRef.current);
    }
    
    directionRef.current = "next";
    resetIndexHighlight(activeCaseRef.current, "next");
    changeCase(false);
  };

  return (
    <div className="casos-de-exito-page" ref={pageRef}>
      <div className="container">
        <div className="story-img">
          <div className="img">
            <img src={casosDeExito[activeCaseRef.current].storyImg} alt="" />
          </div>
        </div>

        <div className="story-content">
          <div className="row">
            <div className="indices">
              {casosDeExito.map((_, index) => (
                <div key={index} className="index">
                  <div className="index-highlight"></div>
                </div>
              ))}
            </div>

            <div className="profile">
              <div className="profile-icon">
                <div style={{ backgroundColor: casosDeExito[activeCaseRef.current].profileColor }}>
                  {casosDeExito[activeCaseRef.current].clientName.charAt(0)}
                </div>
              </div>
              <div className="profile-name">
                <p>{casosDeExito[activeCaseRef.current].clientName}</p>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="title">
              {casosDeExito[activeCaseRef.current].title.map((line, index) => (
                <div key={index} className="title-row">
                  <h1>{line}</h1>
                </div>
              ))}
            </div>

            <div className="link">
              <a href={casosDeExito[activeCaseRef.current].linkSrc} onClick={(e) => handleNavigation(e, casosDeExito[activeCaseRef.current].linkSrc)}>
                {casosDeExito[activeCaseRef.current].linkLabel}
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="casos-de-exito-footer">
        <div className="fc-col-lg">
          <div className="footer-text">
            <div className="footer-text-content">
              <p className="sm caps footer-brand">Roll Out Studios</p>
            </div>
          </div>
        </div>
        <div className="fc-col-sm">
          <div className="footer-navigation">
            <button className="nav-btn prev-btn" onClick={handlePrevClick}>
              ←
            </button>
            <button className="nav-btn next-btn" onClick={handleNextClick}>
              →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CasosDeExitoPage; 