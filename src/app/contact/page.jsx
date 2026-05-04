"use client";
import "./contact.css";
import { useRef, useState } from "react";

import Copy from "../../components/Copy/Copy";
import SuccessDialog from "../../components/SuccessDialog/SuccessDialog";

import { useTransitionRouter } from "next-view-transitions";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const page = () => {
  const router = useTransitionRouter();
  const contactRef = useRef(null);
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    empresa: '',
    mensaje: '',
    aceptoPolitica: false
  });
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nombre: formData.nombre,
          email: formData.email,
          empresa: formData.empresa,
          mensaje: formData.mensaje,
          aceptoPolitica: formData.aceptoPolitica
        })
      });

      const result = await response.json();

      if (result.success) {
        setShowSuccessDialog(true);
        // Limpiar el formulario
        setFormData({
          nombre: '',
          email: '',
          empresa: '',
          mensaje: '',
          aceptoPolitica: false
        });
      } else {
        alert('Error al enviar el mensaje: ' + (result.error || 'Error desconocido'));
      }
    } catch (error) {
      console.error('Error al enviar el formulario:', error);
      alert('Error al enviar el mensaje. Por favor, inténtalo de nuevo.');
    }
  };

  const handleEmailClick = () => {
    window.open('mailto:Cristina@rollout-studios.com', '_blank');
  };

  const handleWhatsAppClick = () => {
    const message = encodeURIComponent('Hola, me gustaría obtener más información sobre sus servicios.');
    window.open(`https://wa.me/351927697179?text=${message}`, '_blank');
  };

  useGSAP(
    () => {
      const contactImg = contactRef.current.querySelector(".contact-img");
      const footerTexts = contactRef.current.querySelectorAll(
        ".contact-footer .footer-text"
      );
      const contactButtons = contactRef.current.querySelector(".contact-buttons");
      const contactForm = contactRef.current.querySelector(".contact-form");

      gsap.set(contactImg, {
        clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
      });

      gsap.to(contactImg, {
        clipPath: "polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)",
        duration: 1,
        delay: 0.85,
        ease: "power3.out",
      });

      // Animación para los botones de contacto
      if (contactButtons) {
        gsap.set(contactButtons, { y: 30, opacity: 0 });
        gsap.to(contactButtons, {
          y: 0,
          opacity: 1,
          duration: 1,
          delay: 1.15,
          ease: "power4.out",
        });
      }

      // Animación para el formulario
      if (contactForm) {
        gsap.set(contactForm, { y: 30, opacity: 0 });
        gsap.to(contactForm, {
          y: 0,
          opacity: 1,
          duration: 1,
          delay: 1.3,
          ease: "power4.out",
        });
      }

      footerTexts.forEach((element) => {
        const textContent = element.querySelector(".footer-text-content");
        gsap.set(textContent, {
          y: "100%",
        });
      });

      footerTexts.forEach((element, index) => {
        const textContent = element.querySelector(".footer-text-content");
        gsap.to(textContent, {
          y: "0%",
          duration: 0.8,
          delay: 1.8 + index * 0.1,
          ease: "power3.out",
        });
      });
    },
    { scope: contactRef }
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
    <div className="contact" ref={contactRef}>
      <div className="contact-img-wrapper">
        <div className="contact-img">
          <img src="/images/contact/Contacto1.avif" alt="" />
        </div>
      </div>
      <div className="contact-copy">
        <div className="contact-copy-bio">
          <Copy delay={1}>
            <p className="caps sm">Roll Out Studios</p>
            <p className="caps sm">Portugal</p>
          </Copy>
        </div>

        <div className="contact-form-section">
          
          
          <div className="contact-buttons">
            <button onClick={handleEmailClick} className="contact-btn">
              <span className="sm caps mono">EMAIL</span>
            </button>
            <button onClick={handleWhatsAppClick} className="contact-btn">
              <span className="sm caps mono">WHATSAPP</span>
            </button>
          </div>
          
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                type="text"
                name="nombre"
                value={formData.nombre}
                onChange={handleInputChange}
                placeholder="NOMBRE"
                className="form-input"
                required
              />
            </div>
            
            <div className="form-group">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="EMAIL"
                className="form-input"
                required
              />
            </div>
            
            <div className="form-group">
              <input
                type="text"
                name="empresa"
                value={formData.empresa}
                onChange={handleInputChange}
                placeholder="EMPRESA"
                className="form-input"
              />
            </div>
            
            <div className="form-group">
              <textarea
                name="mensaje"
                value={formData.mensaje}
                onChange={handleInputChange}
                placeholder="MENSAJE"
                className="form-textarea"
                rows="3"
                required
              ></textarea>
            </div>
            
            <div className="form-group checkbox-group">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  name="aceptoPolitica"
                  checked={formData.aceptoPolitica}
                  onChange={handleInputChange}
                  className="form-checkbox"
                  required
                />
                <span className="checkbox-text">Acepto la política de privacidad</span>
              </label>
            </div>
            
            <button type="submit" className="form-submit">
              ENVIAR
            </button>
          </form>
        </div>
      </div>

      <div className="contact-footer">
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
      
      <SuccessDialog 
        isOpen={showSuccessDialog} 
        onClose={() => setShowSuccessDialog(false)} 
      />
    </div>
  );
};

export default page;
