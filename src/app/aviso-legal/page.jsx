"use client";
import "./aviso-legal.css";
import { useRef } from "react";
import Copy from "../../components/Copy/Copy";
import Footer from "../../components/Footer/Footer";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useTransitionRouter } from "next-view-transitions";

const page = () => {
  const router = useTransitionRouter();
  const avisoLegalRef = useRef(null);

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
      const hero = avisoLegalRef.current.querySelector(".al-hero");
      const content = avisoLegalRef.current.querySelector(".al-content");

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
    { scope: avisoLegalRef }
  );

  return (
    <div className="aviso-legal" ref={avisoLegalRef}>
      <section className="al-hero">
        <Copy delay={0.85}>
          <h1>Aviso Legal</h1>
        </Copy>
      </section>

      <section className="al-content">
        <div className="al-content-wrapper">
          <div className="al-section">
            <Copy>
              <p>
                ¡ATENCIÓN! La ley nos obliga a facilitarte la siguiente información sobre nuestra página web para que nos conozcas mejor y para explicarte sus funcionalidades y tus obligaciones al utilizarla.
              </p>
            </Copy>
          </div>

          <div className="al-section">
            <Copy>
              <h3>¿Quiénes somos?</h3>
            </Copy>
            <Copy>
              <p>
                <strong>Nombre comercial:</strong> Roll Out Studios 2.0 LDA<br />
                <strong>Dirección:</strong> Rua José Mascarenhas Relvas 4, 2B 2685-891 Sacavem<br />
                <strong>Correo electrónico:</strong> hola@rollout-studios.com<br />
                <strong>NIF/ NIPC:</strong> 518642186
              </p>
            </Copy>
          </div>

          <div className="al-section">
            <Copy>
              <h3>¿Cuáles son tus obligaciones al utilizar nuestro sitio web?</h3>
            </Copy>
            <Copy>
              <p>
                Al usar nuestra web, te comprometes a no contravenir las leyes. No puedes utilizar este sitio web para actividades ilegales o que puedan perjudicar a Roll Out Studios o a otras personas. No puedes impedir ni alterar el uso normal del sitio web.
              </p>
              <p>
                Todos los contenidos y servicios ofrecidos son respetuosos con todas las personas, independientemente de su edad, raza, sexo, religión, opinión, nacionalidad, discapacidad o cualquier otra condición personal y social.
              </p>
              <p>
                El contenido del sitio (textos, imágenes, logos, diseños, archivos de sonido o video, etc.) es propiedad de Roll Out Studios o contamos con derechos de uso de terceros. Este Aviso Legal no te concede ningún derecho de explotación sobre dichos contenidos.
              </p>
              <p>
                <strong>Está prohibido:</strong>
              </p>
              <ul>
                <li>Usar la web con fines comerciales o publicitarios no autorizados.</li>
                <li>Reproducir, distribuir o modificar el contenido sin permiso.</li>
                <li>Vulnerar los derechos de Roll Out Studios o de terceros.</li>
              </ul>
            </Copy>
          </div>

          <div className="al-section">
            <Copy>
              <h3>¿Cuáles son nuestros derechos de propiedad intelectual e industrial?</h3>
            </Copy>
            <Copy>
              <p>
                Todos los derechos sobre el contenido del sitio pertenecen a Roll Out Studios o a sus titulares licenciados. Si consideras que hemos vulnerado tus derechos de propiedad intelectual, lo puedes notificar indicando:
              </p>
              <ul>
                <li>Identidad del titular o su representación.</li>
                <li>Contenido afectado y su ubicación en la web.</li>
                <li>Documentación acreditativa de la titularidad.</li>
                <li>Declaración de veracidad sobre la información proporcionada.</li>
              </ul>
            </Copy>
          </div>

          <div className="al-section">
            <Copy>
              <h3>¿Utilizamos enlaces?</h3>
            </Copy>
            <Copy>
              <p>
                Podemos incluir enlaces a otras webs o contenidos de terceros. No somos responsables de los resultados del acceso a dichos enlaces.
              </p>
              <p>
                Si deseas incluir un enlace a nuestro sitio, debes solicitar autorización previa. La presencia del enlace no implica relación comercial ni aprobación de contenidos. No está permitido usar nuestro nombre, logos o símbolos sin consentimiento explícito.
              </p>
            </Copy>
          </div>

          <div className="al-section">
            <Copy>
              <h3>¿Podemos realizar modificaciones?</h3>
            </Copy>
            <Copy>
              <p>
                Podemos modificar este sitio web o el presente Aviso Legal en cualquier momento y sin previo aviso.
              </p>
            </Copy>
          </div>

          <div className="al-section">
            <Copy>
              <h3>¿Qué responsabilidades tenemos?</h3>
            </Copy>
            <Copy>
              <p>
                Roll Out Studios no se hace responsable por:
              </p>
              <ul>
                <li>La indisponibilidad de la web o sus contenidos.</li>
                <li>Presencia de virus u otros elementos perjudiciales.</li>
                <li>El uso indebido del sitio web por parte de los usuarios.</li>
              </ul>
            </Copy>
          </div>

          <div className="al-section">
            <Copy>
              <h3>¿Cómo usamos tus datos personales?</h3>
            </Copy>
            <Copy>
              <p>
                Usamos tus datos personales conforme a nuestra "Política de Privacidad", disponible en esta misma web. Implementamos medidas técnicas y organizativas para garantizar la seguridad y confidencialidad de tus datos.
              </p>
            </Copy>
          </div>

          <div className="al-section">
            <Copy>
              <h3>¿Cuál es la legislación aplicable y los tribunales competentes?</h3>
            </Copy>
            <Copy>
              <p>
                Este Aviso Legal se rige por la legislación portuguesa. En caso de conflicto:
              </p>
              <ul>
                <li>Si el usuario es consumidor: los tribunales del domicilio del consumidor.</li>
                <li>En otros casos: los tribunales del domicilio de Roll Out Studios.</li>
              </ul>
            </Copy>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default page; 