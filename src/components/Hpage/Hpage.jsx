import React from "react";
import styles from "./Hpage.module.css";
import Vector from "../../img/Vector.png";
import Video from "../../img/mdi_video.png";
import Calendar from "../../img/mdi_calendar-blank.png";
import ArrowLarge from "../../img/ArrowLarge.png";
import ArrowSmall from "../../img/ArrowSmall.png"
const Hpage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.pagesHome}>
        <div className={`${styles.whatIs} ${styles.box}`}>
          <h2 className={styles.title}>¿Qué es PsicoFi?</h2>
          <p className={styles.info}>
            Somos una plataforma dedicada a la psicología en línea, donde puedes
            conseguir sesiones síncronas con profesionales de cualquier parte
            del mundo, lo que abre la posibilidad de tener citas a cualquier
            hora y desde cualquier lugar.
          </p>
          <button type="button" className={styles.button}>
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
          <button type="button" className={styles.button}>
            Empezar
          </button>
        </div>
      </div>
      <div className={`${styles.pagesHome}`}>
        <div className={`${styles.function} ${styles.box}`}>
          <h1>¿Cómo funcionan las sesiones online?</h1>
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
          <button className={styles.button} type="button">
            Quiero una cita
          </button>
        </div>
        <div className={`${styles.costo} ${styles.box}`}>
          <h2 className={styles.title}>¿Cuenta cuesta una sesion?</h2>
          <div className={styles.withArrow}>
            <div className={styles.boxCosto}>
              <p className={styles.individual}>Cita Individual</p>
              <h1>$29.29 USD</h1>
              <p>1 hora de videollamada</p>
            </div>
            <img src={ArrowSmall} alt="" />
          </div>

          <button type="button" className={styles.button}>
            Comenzar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hpage;
