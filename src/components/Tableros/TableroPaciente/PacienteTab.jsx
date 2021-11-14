import React from "react";
import styles from "./PacienteTab.module.css";
import UTabCard from "../../UTabCard/UTabCard";
import CardStory from "../../CardStory/CardStory";
import { Link } from "react-router-dom";
import Footer from "../../Footer/Footer";


const PacienteTab =  () => {
    return (
    <div className={styles.container}>
    <h1 className={styles.title}>Bienvenido, NOMBRE</h1>
    <div className={styles.box}>
        <h1 className={styles.boxTitle}>Citas próximas:</h1>
        <div className={styles.citasProximas}>

        <UTabCard />
        <Link to ="/" className={styles.link}>    
        <button className={styles.addButton}>+</button>
        </Link>

        </div>
        <div className={styles.sort}>
        <h1 className={styles.boxTitle}>Historial de consultas:</h1>
        
        <h1 className={styles.sortText}>Filtrar</h1>
        </div>
        <CardStory />
    </div>
    <Footer />    
    </div>
  );
};
export default PacienteTab;