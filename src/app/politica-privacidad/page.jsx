"use client";
import "./politica-privacidad.css";
import { useRef } from "react";
import Copy from "../../components/Copy/Copy";
import Footer from "../../components/Footer/Footer";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useTransitionRouter } from "next-view-transitions";

const page = () => {
  const router = useTransitionRouter();
  const politicaPrivacidadRef = useRef(null);

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
      const hero = politicaPrivacidadRef.current.querySelector(".pp-hero");
      const content = politicaPrivacidadRef.current.querySelector(".pp-content");

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
    { scope: politicaPrivacidadRef }
  );

  return (
    <div className="politica-privacidad" ref={politicaPrivacidadRef}>
      <section className="pp-hero">
        <Copy delay={0.85}>
          <h1>Política de Privacidad</h1>
        </Copy>
      </section>

      <section className="pp-content">
        <div className="pp-content-wrapper">
          <div className="pp-section">
            <Copy>
              <p>
                En Roll Out Studios 2.0 LDA nos comprometemos a proteger la privacidad de nuestros usuarios. 
                La presente política explica cómo recopilamos, utilizamos y gestionamos los datos personales 
                a través de nuestro sitio web y servicios. Al navegar o utilizar nuestras plataformas, 
                usted acepta las prácticas descritas a continuación.
              </p>
            </Copy>
          </div>

          <div className="pp-section">
            <Copy>
              <h3>RECOGIDA Y TRATAMIENTO DE DATOS PERSONALES</h3>
            </Copy>
            <Copy>
              <h4>¿Quién es el responsable del tratamiento de sus datos?</h4>
            </Copy>
            <Copy>
              <p>
                El responsable del tratamiento de los datos personales es Roll Out Studios 2.0 LDA, 
                sociedad registrada en Portugal, con NIF 518642186, y domicilio en Rua José Mascarenhas 
                Relvas 4, 2B, 2685-891 Sacavém.
              </p>
            </Copy>
            <Copy>
              <p>
                Puede contactarnos a través del siguiente correo electrónico: hola@rollout-studios.com
              </p>
            </Copy>
          </div>

          <div className="pp-section">
            <Copy>
              <h4>¿Para qué finalidades tratamos sus datos personales?</h4>
            </Copy>
            <Copy>
              <p>
                En Roll Out Studios tratamos los datos personales únicamente para las siguientes finalidades:
              </p>
            </Copy>
            <Copy>
              <h5>COMPRAS / REGISTRO:</h5>
              <ul>
                <li>Gestionar los pedidos y servicios contratados.</li>
                <li>Garantizar el correcto funcionamiento de la plataforma digital y contactar al usuario en caso de problemas técnicos o administrativos.</li>
                <li>Responder consultas y solicitudes recibidas.</li>
                <li>Enviar comunicaciones sobre novedades, promociones o servicios.</li>
                <li>Crear una cuenta personalizada de usuario a partir de los datos proporcionados.</li>
              </ul>
            </Copy>
            <Copy>
              <h5>CONTACTO:</h5>
              <ul>
                <li>Atender preguntas, mensajes y solicitudes de información.</li>
              </ul>
            </Copy>
            <Copy>
              <h5>NEWSLETTER:</h5>
              <ul>
                <li>Enviar comunicaciones periódicas con contenidos relacionados con marketing digital, promociones y novedades.</li>
              </ul>
            </Copy>
            <Copy>
              <h5>ANÁLISIS DE NAVEGACIÓN:</h5>
              <ul>
                <li>Evaluar la usabilidad del sitio y mejorar la experiencia del usuario, la seguridad y el rendimiento de la plataforma.</li>
              </ul>
            </Copy>
          </div>

          <div className="pp-section">
            <Copy>
              <h4>¿Cuál es la base legal para el tratamiento de sus datos?</h4>
            </Copy>
            <Copy>
              <p>
                El tratamiento de sus datos personales se basa en los siguientes fundamentos legales:
              </p>
            </Copy>
            <Copy>
              <ul>
                <li><strong>Ejecución del contrato:</strong> cuando contrata nuestros servicios o realiza una solicitud.</li>
                <li><strong>Interés legítimo:</strong> para brindar soporte técnico o responder consultas relacionadas con los servicios.</li>
                <li><strong>Consentimiento:</strong> para el envío de comunicaciones promocionales o marketing (como newsletters).</li>
                <li><strong>Obligación legal:</strong> cuando sea necesario para cumplir con disposiciones legales o regulatorias.</li>
              </ul>
            </Copy>
          </div>

          <div className="pp-section">
            <Copy>
              <h4>¿A quién comunicamos sus datos?</h4>
            </Copy>
            <Copy>
              <p>
                Sus datos personales no serán compartidos con terceros, salvo en los siguientes casos:
              </p>
            </Copy>
            <Copy>
              <ul>
                <li>Cuando lo exija la legislación vigente.</li>
                <li>Cuando sea necesario para el funcionamiento de la plataforma (por ejemplo, servicios de alojamiento, tecnología, soporte técnico, contabilidad o marketing contratados por nosotros).</li>
                <li>Cuando usted haya dado su consentimiento explícito.</li>
              </ul>
            </Copy>
            <Copy>
              <p>
                Todos nuestros proveedores y socios están contractualmente obligados a respetar la confidencialidad y protección de sus datos.
              </p>
            </Copy>
          </div>

          <div className="pp-section">
            <Copy>
              <h4>¿Durante cuánto tiempo conservamos sus datos?</h4>
            </Copy>
            <Copy>
              <ul>
                <li><strong>Compras y servicios:</strong> durante el tiempo necesario para gestionar la relación contractual y hasta 1 año después de la última interacción.</li>
                <li><strong>Newsletters y marketing:</strong> hasta que el usuario cancele su suscripción o retire su consentimiento.</li>
                <li><strong>Consultas o solicitudes de contacto:</strong> durante el tiempo necesario para su resolución.</li>
              </ul>
            </Copy>
            <Copy>
              <p>
                Una vez transcurridos estos plazos, los datos podrán conservarse únicamente con fines legales o para cubrir posibles responsabilidades futuras, y serán eliminados cuando ya no sean necesarios.
              </p>
            </Copy>
          </div>

          <div className="pp-section">
            <Copy>
              <h4>¿Cuáles son sus derechos?</h4>
            </Copy>
            <Copy>
              <p>
                Usted puede ejercer, en cualquier momento, los siguientes derechos:
              </p>
            </Copy>
            <Copy>
              <ul>
                <li>Acceder a sus datos personales</li>
                <li>Solicitar su rectificación o actualización</li>
                <li>Solicitar su eliminación (cuando corresponda)</li>
                <li>Limitar el tratamiento de sus datos</li>
                <li>Oponerse al tratamiento basado en interés legítimo</li>
                <li>Solicitar la portabilidad de los datos que nos haya proporcionado</li>
                <li>Retirar su consentimiento (en el caso de fines promocionales, por ejemplo)</li>
              </ul>
            </Copy>
            <Copy>
              <p>
                Para ejercer estos derechos, puede enviar un correo electrónico a: hola@rollout-studios.com
              </p>
            </Copy>
            <Copy>
              <p>
                Si considera que sus derechos no han sido respetados, puede presentar una reclamación ante la Comisión Nacional de Protección de Datos (CNPD): https://www.cnpd.pt
              </p>
            </Copy>
          </div>

          <div className="pp-section">
            <Copy>
              <h4>¿Cómo hemos obtenido sus datos?</h4>
            </Copy>
            <Copy>
              <p>
                Sus datos fueron proporcionados directamente por usted a través de:
              </p>
            </Copy>
            <Copy>
              <ul>
                <li>Formularios de contacto</li>
                <li>Registro en la plataforma</li>
                <li>Cookies y tecnologías similares (consulte nuestra Política de Cookies)</li>
              </ul>
            </Copy>
            <Copy>
              <p>
                Roll Out Studios garantiza que únicamente se recopilan los datos necesarios para las finalidades declaradas.
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