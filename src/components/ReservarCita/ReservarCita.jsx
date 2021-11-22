import React from 'react';
import styles from "./ReservarCita.module.css";
import Footer from "../Footer/Footer";


const ReservarCita = () => {
    return (
        <div className={`${styles.fondorosa} ${styles.bordecontenedor}`}>
          <div className={styles.titulo}>Reservar una Cita </div>
          <form submit = "false">
            <div>
              <div className={styles.etiqueta}>
                <label for="PsicologoEscogido">Psicólogo escogido:</label>
              </div>
              <div className={styles.campo}>
                {" "}
                <label id="PsicologoEscogido"></label>
              </div>
            </div>
            <div>
              <div className={styles.etiqueta}>
                <label for="FechaDisponible">Fechas Disponibles:</label>
              </div>
              <div className={styles.campo}>
                <input
                  className={styles.entrada}
                  type="date"
                  id="FechaDisponible"
             
                ></input>
                <input
                  className={styles.entrada}
                  type="text"
                  id="HoraDisponible"
             
                ></input>
                
                
              </div>
              
              
            </div>
           
            <div>
              <div className={`${styles.etiqueta} ${styles.lineagruesa}`}>
                <label for="Descripcion">Breve Descripción:</label>
              </div>
              <div className={`${styles.campo} ${styles.lineagruesa}`}>
                <textarea
                  className={styles.entrada1}
                  id="Descripcion"
                  placeholder="Razones por las cuales se necesita una consulta, e.j. problemas amorosos"
                />
              </div>
            </div>
            
            
          
            <div className={styles.submit}>
              <input
                type="button"
                className={styles.boton}
                value="Continuar al pago"
              ></input>
            </div>
          </form>
        </div>
        
        
      );
      
    
      
}

export default ReservarCita