"use client";
import { useEffect, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import "./SuccessDialog.css";

const SuccessDialog = ({ isOpen, onClose }) => {
  const dialogRef = useRef(null);
  const overlayRef = useRef(null);

  useGSAP(
    () => {
      if (isOpen) {
        // Animación de entrada
        gsap.set(dialogRef.current, { scale: 0.8, opacity: 0 });
        gsap.set(overlayRef.current, { opacity: 0 });
        
        gsap.to(overlayRef.current, {
          opacity: 1,
          duration: 0.3,
          ease: "power2.out"
        });
        
        gsap.to(dialogRef.current, {
          scale: 1,
          opacity: 1,
          duration: 0.4,
          delay: 0.1,
          ease: "back.out(1.7)"
        });
      } else {
        // Animación de salida
        gsap.to(overlayRef.current, {
          opacity: 0,
          duration: 0.2,
          ease: "power2.in"
        });
        
        gsap.to(dialogRef.current, {
          scale: 0.8,
          opacity: 0,
          duration: 0.3,
          ease: "power2.in"
        });
      }
    },
    { dependencies: [isOpen] }
  );

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="success-dialog-overlay" ref={overlayRef} onClick={onClose}>
      <div className="success-dialog" ref={dialogRef} onClick={(e) => e.stopPropagation()}>
        <div className="success-dialog-content">
          <div className="success-icon">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <path d="M8 16L14 22L24 10" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          
          <h2 className="success-title">¡Mensaje enviado!</h2>
          
          <p className="success-message">
            Gracias por contactarnos. Nos pondremos en contacto contigo pronto.
          </p>
          
          <button className="success-button" onClick={onClose}>
            <span className="sm caps mono">CERRAR</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuccessDialog; 