"use client";
import "./politica-cookies.css";
import { useRef } from "react";
import Copy from "../../components/Copy/Copy";
import Footer from "../../components/Footer/Footer";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useTransitionRouter } from "next-view-transitions";

const page = () => {
  const router = useTransitionRouter();
  const politicaCookiesRef = useRef(null);

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
      const hero = politicaCookiesRef.current.querySelector(".pc-hero");
      const content = politicaCookiesRef.current.querySelector(".pc-content");

      if (hero && content) {
        gsap.set([hero, content], { y: 30, opacity: 0 });

        gsap.to(hero, {
          y: 0,
          opacity: 1,
          duration: 1,
          delay: 0.5,
          ease: "power4.out",
        });

        gsap.to(content, {
          y: 0,
          opacity: 1,
          duration: 1,
          delay: 0.8,
          ease: "power4.out",
        });
      }
    },
    { scope: politicaCookiesRef }
  );

  return (
    <div className="politica-cookies" ref={politicaCookiesRef}>
      <section className="pc-hero">
        <Copy delay={0.85}>
          <h1>Política de Cookies</h1>
        </Copy>
      </section>

      <section className="pc-content">
        <div className="pc-content-wrapper">
          <div className="pc-section">
            <Copy>
              <h3>1. ¿Qué son las cookies?</h3>
            </Copy>
            <Copy>
              <p>
                Las cookies son archivos de texto que los sitios web almacenan en el dispositivo del usuario 
                para recordar preferencias o información de navegación.
              </p>
            </Copy>
          </div>

          <div className="pc-section">
            <Copy>
              <h3>2. Tipos de cookies utilizadas</h3>
            </Copy>
            <Copy>
              <ul>
                <li><strong>Necesarias:</strong> aseguran el funcionamiento básico del sitio.</li>
                <li><strong>Estadísticas:</strong> recopilan datos anónimos sobre el uso del sitio.</li>
                <li><strong>Marketing / Personalización:</strong> permiten mostrar publicidad relevante y adaptar la experiencia del usuario.</li>
                <li><strong>Redes sociales:</strong> integran funcionalidades como botones de compartir o enlaces a plataformas externas.</li>
              </ul>
            </Copy>
          </div>

          <div className="pc-section">
            <Copy>
              <h3>3. Gestión del consentimiento</h3>
            </Copy>
            <Copy>
              <p>
                Al ingresar al sitio, el usuario puede aceptar, rechazar o configurar las cookies no esenciales. 
                Esta configuración puede modificarse en cualquier momento desde el panel de preferencias o 
                directamente desde el navegador.
              </p>
            </Copy>
          </div>

          <div className="pc-section">
            <Copy>
              <h3>4. Listado de cookies (ejemplo)</h3>
            </Copy>
            <Copy>
              <div className="cookies-table">
                <table>
                  <thead>
                    <tr>
                      <th>Cookie</th>
                      <th>Tipo</th>
                      <th>Finalidad</th>
                      <th>Duración</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>cookieConsent</td>
                      <td>Necesaria</td>
                      <td>Guarda preferencia de cookies</td>
                      <td>1 año</td>
                    </tr>
                    <tr>
                      <td>PHPSESSID</td>
                      <td>Necesaria</td>
                      <td>Mantiene la sesión activa</td>
                      <td>Sesión</td>
                    </tr>
                    <tr>
                      <td>_ga, _gid</td>
                      <td>Estadística</td>
                      <td>Análisis de uso del sitio</td>
                      <td>2 años / 24 h</td>
                    </tr>
                    <tr>
                      <td>_fbp, fr</td>
                      <td>Marketing</td>
                      <td>Seguimiento de campañas publicitarias</td>
                      <td>3 meses</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </Copy>
          </div>

          <div className="pc-section">
            <Copy>
              <h3>5. Cómo eliminar o bloquear cookies</h3>
            </Copy>
            <Copy>
              <p>
                Puede eliminar o bloquear cookies a través de la configuración de su navegador. 
                Tenga en cuenta que algunas funcionalidades del sitio pueden verse afectadas si se desactivan ciertas cookies.
              </p>
            </Copy>
          </div>

          <div className="pc-section">
            <Copy>
              <h3>6. Revocación y actualizaciones</h3>
            </Copy>
            <Copy>
              <p>
                El consentimiento puede revocarse en cualquier momento. Las cookies instaladas antes de la revocación 
                deberán eliminarse manualmente. Esta política podrá ser modificada en cualquier momento para adaptarse 
                a cambios legales o técnicos.
              </p>
            </Copy>
          </div>

          <div className="pc-section">
            <Copy>
              <h3>Descargo de responsabilidad</h3>
            </Copy>
            <Copy>
              <p>
                Este contenido tiene fines informativos y se basa en la normativa vigente. No sustituye asesoría legal profesional. 
                Se recomienda consultar con un especialista para su adecuación definitiva a las necesidades específicas de la empresa.
              </p>
            </Copy>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default page; 