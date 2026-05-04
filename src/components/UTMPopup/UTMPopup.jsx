"use client";
import { useState, useEffect, useRef, Suspense } from "react";
import { flushSync } from "react-dom";
import { useSearchParams } from "next/navigation";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import "./UTMPopup.css";

const UTM_SOURCE = "olympic_mind";
const SESSION_KEY = "utm_popup_dismissed";

const SERVICIOS = [
  "Lanzamiento de infoproducto",
  "Marketing digital",
  "Ecommerce / Tienda online",
  "Página web",
  "Consultoría de crecimiento",
  "Otro",
];

function UTMPopupInner() {
  const searchParams = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [serviciosOpen, setServiciosOpen] = useState(true);
  const [formData, setFormData] = useState({
    servicio: "",
    nombre: "",
    contacto: "",
    mensaje: "",
    aceptoPolitica: false,
  });
  const overlayRef = useRef(null);
  const dialogRef = useRef(null);
  const formFieldsRef = useRef(null);
  const serviciosRef = useRef(null);

  useEffect(() => {
    const utmSource = searchParams.get("utm_source");
    const dismissed = sessionStorage.getItem(SESSION_KEY);
    if (utmSource === UTM_SOURCE && !dismissed) {
      const timer = setTimeout(() => setIsOpen(true), 1500);
      return () => clearTimeout(timer);
    }
  }, [searchParams]);

  useGSAP(() => {
    if (!overlayRef.current || !dialogRef.current) return;
    if (isOpen) {
      gsap.set(overlayRef.current, { opacity: 0 });
      gsap.set(dialogRef.current, { y: 20, opacity: 0 });
      gsap.to(overlayRef.current, { opacity: 1, duration: 0.3, ease: "power2.out" });
      gsap.to(dialogRef.current, { y: 0, opacity: 1, duration: 0.4, delay: 0.1, ease: "power2.out" });
    }
  }, { dependencies: [isOpen] });

  const handleClose = () => {
    sessionStorage.setItem(SESSION_KEY, "true");
    gsap.to(overlayRef.current, { opacity: 0, duration: 0.25, ease: "power2.in", onComplete: () => setIsOpen(false) });
    gsap.to(dialogRef.current, { y: 10, opacity: 0, duration: 0.2, ease: "power2.in" });
  };

  const animateHeight = (applyChange, onAfter) => {
    const el = dialogRef.current;
    if (!el) { applyChange(); onAfter?.(); return; }
    const fromHeight = el.offsetHeight;
    gsap.set(el, { height: fromHeight, overflow: "hidden" });
    flushSync(applyChange);
    const toHeight = el.scrollHeight;
    gsap.to(el, {
      height: toHeight,
      duration: 0.4,
      ease: "power2.inOut",
      onComplete: () => gsap.set(el, { height: "auto", overflow: "" }),
    });
    onAfter?.();
  };

  const handleServicioSelect = (s) => {
    const isFirst = !formData.servicio;
    if (serviciosRef.current) {
      gsap.to(serviciosRef.current, {
        opacity: 0, y: -6, duration: 0.18, ease: "power2.in",
        onComplete: () => {
          animateHeight(
            () => {
              setFormData((prev) => ({ ...prev, servicio: s }));
              setServiciosOpen(false);
            },
            () => {
              if (serviciosRef.current) {
                gsap.fromTo(serviciosRef.current, { opacity: 0, y: 6 }, { opacity: 1, y: 0, duration: 0.22, ease: "power2.out" });
              }
              if (isFirst && formFieldsRef.current) {
                gsap.fromTo(formFieldsRef.current, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.35, delay: 0.1, ease: "power2.out" });
              }
            }
          );
        },
      });
    }
  };

  const handleServiciosExpand = () => {
    if (serviciosRef.current) {
      gsap.to(serviciosRef.current, {
        opacity: 0, y: -6, duration: 0.18, ease: "power2.in",
        onComplete: () => {
          animateHeight(
            () => setServiciosOpen(true),
            () => {
              if (serviciosRef.current) {
                gsap.fromTo(serviciosRef.current, { opacity: 0, y: 6 }, { opacity: 1, y: 0, duration: 0.22, ease: "power2.out" });
              }
            }
          );
        },
      });
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/utm-popup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const result = await res.json();
      if (result.success) {
        setSubmitted(true);
        sessionStorage.setItem(SESSION_KEY, "true");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="utm-popup-overlay" ref={overlayRef} onClick={handleClose}>
      <div className="utm-popup" ref={dialogRef} onClick={(e) => e.stopPropagation()}>
        <button className="utm-popup-close" onClick={handleClose} aria-label="Cerrar">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </button>

        {submitted ? (
          <div className="utm-popup-success">
            <div className="utm-popup-success-icon">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                <path d="M8 16L14 22L24 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: "var(--foreground)" }}/>
              </svg>
            </div>
            <h3>¡Mensaje enviado!</h3>
            <p className="sm">Gracias por tu interés. Nos pondremos en contacto contigo muy pronto.</p>
            <button className="utm-popup-success-close" onClick={handleClose}>
              <span className="sm caps mono">Cerrar</span>
            </button>
          </div>
        ) : (
          <>
            <p className="utm-popup-tag sm caps mono">Comunidad Olympic Mind</p>
            <h3 className="utm-popup-title">Si has llegado desde <span style={{ color: "var(--btn-icon)" }}>Olympic Mind de Dani Alves</span>, esto es para ti</h3>
            <form className="utm-popup-form" onSubmit={handleSubmit}>
              <div className="utm-popup-field">
                <p className="utm-popup-field-label sm caps mono">Qué servicio te interesa</p>
                <div className="utm-popup-servicios" ref={serviciosRef}>
                  {serviciosOpen ? (
                    SERVICIOS.map((s) => (
                      <button
                        key={s}
                        type="button"
                        className={`utm-popup-servicio-btn${formData.servicio === s ? " active" : ""}`}
                        onClick={() => handleServicioSelect(s)}
                      >
                        <span className="utm-popup-servicio-circle-wrap">
                          <span className="utm-popup-servicio-circle" />
                        </span>
                        <span className="sm caps mono">{s}</span>
                      </button>
                    ))
                  ) : (
                    <div className="utm-popup-servicio-selected">
                      <div className="utm-popup-servicio-btn active">
                        <span className="utm-popup-servicio-circle-wrap">
                          <span className="utm-popup-servicio-circle" />
                        </span>
                        <span className="sm caps mono">{formData.servicio}</span>
                      </div>
                      <button
                        type="button"
                        className="utm-popup-servicio-expand"
                        onClick={handleServiciosExpand}
                        aria-label="Cambiar servicio"
                      >
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                          <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {formData.servicio && (
                <div ref={formFieldsRef}>
                  <div className="utm-popup-fields-inner">
                    <div className="utm-popup-field">
                      <p className="utm-popup-field-label sm caps mono">Nombre</p>
                      <input
                        id="popup-nombre"
                        type="text"
                        name="nombre"
                        value={formData.nombre}
                        onChange={handleChange}
                        placeholder="Tu nombre"
                        required
                      />
                    </div>

                    <div className="utm-popup-field">
                      <p className="utm-popup-field-label sm caps mono">WhatsApp / Email</p>
                      <input
                        id="popup-contacto"
                        type="text"
                        name="contacto"
                        value={formData.contacto}
                        onChange={handleChange}
                        placeholder="+34 600 000 000 o tu@email.com"
                        required
                      />
                    </div>

                    <div className="utm-popup-field">
                      <p className="utm-popup-field-label sm caps mono">Mensaje</p>
                      <textarea
                        id="popup-mensaje"
                        name="mensaje"
                        value={formData.mensaje}
                        onChange={handleChange}
                        placeholder="Cuéntanos brevemente en qué podemos ayudarte"
                      />
                    </div>

                    <div className="utm-popup-field">
                      <label className="utm-popup-checkbox-label">
                        <input
                          type="checkbox"
                          name="aceptoPolitica"
                          className="utm-popup-checkbox"
                          checked={formData.aceptoPolitica}
                          onChange={handleChange}
                          required
                        />
                        <p className="sm">
                          Acepto la{" "}
                          <a href="/politica-privacidad" className="utm-popup-privacy-link sm" target="_blank" rel="noopener noreferrer">
                            política de privacidad
                          </a>
                        </p>
                      </label>
                    </div>

                    <button type="submit" className="utm-popup-submit" disabled={loading}>
                      <span className="sm caps mono">{loading ? "Enviando..." : "Enviar"}</span>
                    </button>

                    <a
                      href={`https://wa.me/351927697179?text=${encodeURIComponent("Hola, vengo desde Olympic Mind de Dani Alves y me gustaría obtener más información sobre vuestros servicios.")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="utm-popup-whatsapp"
                    >
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                      </svg>
                      <span className="sm caps mono">Escribir por WhatsApp</span>
                    </a>
                  </div>
                </div>
              )}
            </form>
          </>
        )}
      </div>
    </div>
  );
}

export default function UTMPopup() {
  return (
    <Suspense fallback={null}>
      <UTMPopupInner />
    </Suspense>
  );
}
