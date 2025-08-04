"use client";
import "./Menu.css";
import { useRef, useState, useEffect } from "react";

import { useTransitionRouter } from "next-view-transitions";
import gsap from "gsap";
import CustomEase from "gsap/CustomEase";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(CustomEase);
CustomEase.create("hop", ".15, 1, .25, 1");

const Menu = ({ onMenuStateChange }) => {
  const [currentPath, setCurrentPath] = useState("");
  const [currentTime, setCurrentTime] = useState("");
  const [isClient, setIsClient] = useState(false);
  const router = useTransitionRouter();

  const navRef = useRef(null);
  const navLogoRef = useRef(null);

  useEffect(() => {
    setIsClient(true);
    if (typeof window !== "undefined") {
      setCurrentPath(window.location.pathname);
    }
  }, []);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const timeString = now
        .toLocaleTimeString("en-US", {
          hour12: true,
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
        .replace(/:/g, ":")
        .toUpperCase();
      setCurrentTime(timeString);
    };

    updateTime();

    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleRouteChange = () => {
      if (typeof window !== "undefined") {
        setCurrentPath(window.location.pathname);
      }
    };

    window.addEventListener("popstate", handleRouteChange);

    router.events?.on?.("routeChangeComplete", handleRouteChange);

    return () => {
      window.removeEventListener("popstate", handleRouteChange);
      router.events?.off?.("routeChangeComplete", handleRouteChange);
    };
  }, [router]);

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

  const getExactPath = () => {
    if (typeof window !== "undefined") {
      return window.location.pathname;
    }
    return currentPath;
  };

  const isExactPath = (path) => {
    if (!isClient) return false;
    const exactCurrentPath = getExactPath();
    return exactCurrentPath === path;
  };

  const navigateTo = (path) => {
    if (isExactPath(path)) {
      return;
    }

    router.push(path, {
      onTransitionReady: slideInOut,
    });
  };

  return (
    <div className="nav-container">
      <div className="nav" ref={navRef}>
        <div className="nav-header-col-lg">
          <div className="nav-menu-item">
            <div className="revealer">
              <a
                href="/"
                onClick={(e) => {
                  e.preventDefault();
                  navigateTo("/");
                }}
                className={isExactPath("/") ? "active" : ""}
              >
                <span className="sm caps mono">Inicio</span>
              </a>
            </div>
          </div>
          <div className="nav-menu-item">
            <div className="revealer">
              <a
                href="/casos-de-exito"
                onClick={(e) => {
                  e.preventDefault();
                  navigateTo("/casos-de-exito");
                }}
                className={isExactPath("/casos-de-exito") ? "active" : ""}
              >
                <span className="sm caps mono">Casos de éxito</span>
              </a>
            </div>
          </div>
          <div className="nav-menu-item">
            <div className="revealer">
              <a
                href="/studio"
                onClick={(e) => {
                  e.preventDefault();
                  navigateTo("/studio");
                }}
                className={isExactPath("/studio") ? "active" : ""}
              >
                <span className="sm caps mono">Quienes somos</span>
              </a>
            </div>
          </div>
          <div className="nav-menu-item">
            <div className="revealer">
              <a
                href="/servicios"
                onClick={(e) => {
                  e.preventDefault();
                  navigateTo("/servicios");
                }}
                className={isExactPath("/servicios") ? "active" : ""}
              >
                <span className="sm caps mono">Servicios</span>
              </a>
            </div>
          </div>
          <div className="nav-menu-item">
            <div className="revealer">
              <a
                href="/contact"
                onClick={(e) => {
                  e.preventDefault();
                  navigateTo("/contact");
                }}
                className={isExactPath("/contact") ? "active" : ""}
              >
                <span className="sm caps mono">CONTACTO</span>
              </a>
            </div>
          </div>
        </div>

        <div className="nav-logo-mobile">
          <div className="revealer">
            <a
              href="https://app.rollout-studios.com/auth"
              target="_blank"
              rel="noopener noreferrer"
              className="client-btn"
            >
              <span className="sm caps mono">ACCESO CLIENTES</span>
              <svg className="arrow-icon" width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M2.5 9.5L9.5 2.5M9.5 2.5H3M9.5 2.5V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          </div>
        </div>

        <div className="nav-header-col-sm">
          <div className="nav-menu-time">
            <div className="revealer">
              <p className="sm caps mono">{currentTime}</p>
            </div>
          </div>

          <div className="nav-logo">
            <div className="revealer">
              <a
                href="https://app.rollout-studios.com/auth"
                target="_blank"
                rel="noopener noreferrer"
                className="client-btn"
              >
                <span className="sm caps mono">ACCESO CLIENTES</span>
                <svg className="arrow-icon" width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M2.5 9.5L9.5 2.5M9.5 2.5H3M9.5 2.5V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
            </div>
          </div>

          <div className="nav-menu-mobile">
            <div className="nav-menu-item">
              <div className="revealer">
                <a
                  href="/"
                  onClick={(e) => {
                    e.preventDefault();
                    navigateTo("/");
                  }}
                  className={isExactPath("/") ? "active" : ""}
                >
                  <span className="sm caps mono">Inicio</span>
                </a>
              </div>
            </div>
            <div className="nav-menu-item">
              <div className="revealer">
                <a
                  href="/casos-de-exito"
                  onClick={(e) => {
                    e.preventDefault();
                    navigateTo("/casos-de-exito");
                  }}
                  className={isExactPath("/casos-de-exito") ? "active" : ""}
                >
                  <span className="sm caps mono">Casos</span>
                </a>
              </div>
            </div>
            <div className="nav-menu-item">
              <div className="revealer">
                <a
                  href="/studio"
                  onClick={(e) => {
                    e.preventDefault();
                    navigateTo("/studio");
                  }}
                  className={isExactPath("/studio") ? "active" : ""}
                >
                  <span className="sm caps mono">Studio</span>
                </a>
              </div>
            </div>
            <div className="nav-menu-item">
              <div className="revealer">
                <a
                  href="/servicios"
                  onClick={(e) => {
                    e.preventDefault();
                    navigateTo("/servicios");
                  }}
                  className={isExactPath("/servicios") ? "active" : ""}
                >
                  <span className="sm caps mono">Servicios</span>
                </a>
              </div>
            </div>
            <div className="nav-menu-item">
              <div className="revealer">
                <a
                  href="/contact"
                  onClick={(e) => {
                    e.preventDefault();
                    navigateTo("/contact");
                  }}
                  className={isExactPath("/contact") ? "active" : ""}
                >
                  <span className="sm caps mono">Contacto</span>
                </a>
              </div>
            </div>
            <div className="nav-menu-item">
              <div className="revealer">
                <a
                  href="https://app.rollout-studios.com/auth"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="sm caps mono">Para clientes</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Menu;
