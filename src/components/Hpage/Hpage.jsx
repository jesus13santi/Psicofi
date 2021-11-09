import React from "react";
import styles from "./Hpage.module.css";
import Vector from "../../img/Vector.png";
import Video from "../../img/mdi_video.png";
import Calendar from "../../img/mdi_calendar-blank.png";
import ArrowLarge from "../../img/ArrowLarge.png";
import ArrowSmall from "../../img/ArrowSmall.png";
import logoInstagram from "../../img/icons_instagram.png";
import logoFacebook from "../../img/icons_facebook.png";
import logoTwitter from "../../img/icons_twitter.png";
import logoMail from "../../img/icons_mail.png";
import logoWhat from "../../img/icons_whatsapp.png";
import photo from "../../img/photo.png";
import bandera from "../../img/flagArgentina.png";
import { useHistory } from "react-router-dom";
import BigLogo from "../../img/Group.png";
import Fondo from "../../img/shutterstock_1739543105.jpg";
const Hpage = () => {
  const history = useHistory();
  const handdleLoginOrRegister = () => {
    history.push("/login");
  };
  return (
    <div className={styles.container}>
      <div className={`${styles.pagesHome} ${styles.principalPage}`}>
        <div className={styles.leftSize}>
          <h1>Resuelve tus problemas con los mejores especialistas</h1>
          <button
            type="button"
            className={`${styles.button} ${styles.principalButton}`}
            onClick={handdleLoginOrRegister}
          >
            Empieza ahora
          </button>
        </div>
        <picture className={styles.boxLogo}>
          <img src={BigLogo} alt="" />
        </picture>
      </div>
      <div className={`${styles.pagesHome} ${styles.areaPage}` }>
        <div className={`${styles.whatIs} ${styles.box}`}>
          <h2 className={styles.title}>¿Qué es PsicoFi?</h2>
          <p className={styles.info}>
            Somos una plataforma dedicada a la psicología en línea, donde puedes
            conseguir sesiones síncronas con profesionales de cualquier parte
            del mundo, lo que abre la posibilidad de tener citas a cualquier
            hora y desde cualquier lugar.
          </p>
          <button
            type="button"
            className={styles.button}
            onClick={handdleLoginOrRegister}
          >
            Empieza ahora
          </button>
        </div>

        <div className={`${styles.boxArea} ${styles.box}`}>
          <h2 className={styles.title}>Areas de atencion</h2>
          <div className={styles.areas}>
            <div className={styles.area}>Ansiedad</div>
            <div className={styles.area}>Estres</div>
            <div className={styles.area}>Autoestima</div>
            <div className={styles.area}>Problemas Amorosos</div>
            <div className={styles.area}>Sexualidad</div>
            <div className={styles.area}>Desarrollo personal</div>
          </div>
          <button
            type="button"
            className={styles.button}
            onClick={handdleLoginOrRegister}
          >
            Empezar
          </button>
        </div>
      </div>
      <div className={`${styles.pagesHome}`}>
        <div className={`${styles.function} ${styles.box}`}>
          <h2 className={styles.title}>¿Cómo funcionan las sesiones online?</h2>
          <div className={styles.pasos}>
            <div className={styles.paso}>
              <picture className={styles.boxImg}>
                <img src={Vector} alt="" className={styles.img} />
              </picture>
              <p>Selecciona el psicólogo de tu preferencia</p>
            </div>
            <img src={ArrowLarge} alt="" className={styles.imgArrow} />
            <div className={styles.paso}>
              <picture className={styles.boxImg}>
                <img src={Calendar} alt="" className={styles.img} />
              </picture>
              <p>Agenda una cita según tu disponibilidad</p>
            </div>
            <img src={ArrowLarge} alt="" className={styles.imgArrow} />
            <div className={`${styles.paso} ${styles.paso1}`}>
              <picture className={styles.boxImg}>
                <img src={Video} alt="" className={styles.img} />
              </picture>
              <p>
                Tu psicólogo te enviara por chat el link a la videollamada de la
                consulta
              </p>
            </div>
          </div>
          <button
            className={styles.button}
            type="button"
            onClick={handdleLoginOrRegister}
          >
            Quiero una cita
          </button>
        </div>
        <div className={`${styles.costo} ${styles.box}`} id="boxPrecios">
          <h2 className={styles.title}>¿Cuenta cuesta una sesion?</h2>
          <div className={styles.withArrow}>
            <div className={styles.boxCosto}>
              <p className={styles.individual}>Cita Individual</p>
              <h1>$29.29 USD</h1>
              <p>1 hora de videollamada</p>
            </div>
            <img src={ArrowSmall} alt="" />
          </div>

          <button
            type="button"
            className={styles.button}
            onClick={handdleLoginOrRegister}
          >
            Comenzar
          </button>
        </div>
      </div>
      <div className={`${styles.pagesHome} ${styles.nuestroPsicoPage}`}>
        <div className={`${styles.box} ${styles.boxNuestrosPsico}`}>
          <h2 className={styles.title}>Nuestros Psicólogos</h2>
          <div className={styles.withArrow}>
            <div className={styles.psicologo}>
              <picture className={styles.boxPhoto}>
                <img src={photo} alt="" />
              </picture>
              <div className={styles.infoPsico}>
                <h2 className={styles.name}>Román Riquelme</h2>
                <div className={styles.valoracion}>
                  <p>Valoracion:</p>
                </div>
                <p>
                  Especialidades: ansiedad, estrés y autoestima Lugar de
                  residencia: Buenos Aires, Argentina
                </p>
                <button
                  className={styles.button}
                  onClick={handdleLoginOrRegister}
                >
                  Agendar una cita
                </button>
              </div>
              <picture className={styles.pais}>
                <img src={bandera} alt="" />
              </picture>
            </div>
            <img src={ArrowSmall} alt="" className={styles.arrowSmall}/>
          </div>
        </div>
        <div
          className={`${styles.box} ${styles.boxClientesSatisfechos}`}
          id="boxTestimonios"
        >
          <h2 className={styles.title}>Clientes Satisfechos</h2>
          <div className={styles.withArrow}>
            <div className={styles.mensajeCliente}>
              <p>
                “Muy recomendado el servicio. Nunca había tenido terapia online
                antes y me pareció una experiencia genial.”
              </p>
            </div>
            <img src={ArrowSmall} alt="" />
          </div>
          <button
            type="button"
            className={styles.button}
            onClick={handdleLoginOrRegister}
          >
            Quiero formar parte
          </button>
        </div>
      </div>
      <div className={`${styles.pagesHome} ${styles.finPagina}`}>
        <div className={`${styles.psicoWork} ${styles.box}`}>
          <h2 className={styles.title}>Buscamos psicólogos</h2>
          <p>
            Si eres psicólogo clínico, te invitamos a formar parte de nuestra
            plataforma
          </p>
          <button
            type="button"
            className={styles.button}
            onClick={handdleLoginOrRegister}
          >
            Aplicar
          </button>
        </div>
        <footer className={styles.footer}>
          <p>
            Aviso de privacidad | Términos y Condiciones © 2021 PsicoFi. Todos
            los derechos reservados.
          </p>
          <div className={styles.logoSocialNetwork}>
            <img src={logoFacebook} alt="" />
            <img src={logoInstagram} alt="" />
            <img src={logoMail} alt="" />
            <img src={logoWhat} alt="" />
            <img src={logoTwitter} alt="" />
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Hpage;