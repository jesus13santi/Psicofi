import React from "react";
import styles from "./Tablero.module.css";
import UTabCard from "../UTabCard/UTabCard";
import CardStory from "../CardStory/CardStory";
import { Link } from "react-router-dom";
import Footer from "../Footer/Footer";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import Loading from "../Loading/Loading";



function Tablero() {
    const {user, setUser}= useContext(UserContext);
    console.log(user)
    return (
    <>
    {!!user?(
    <div className={styles.container}>
    <h1 className={styles.title}>Bienvenido, {user.name}</h1>
    <div className={styles.box}>
        
        <h1 className={styles.boxTitle}>
          Citas próximas: 
        </h1>
        {"Next App",console.log(user.nextAppointments)}
        <div className={styles.citasProximas}>
        
        {user.nextAppointments.length > 0 ?(
        user.nextAppointments.map((app) => (
        <UTabCard
          appName={app.name}
          date={app.date}
          startTime={app.startTime}
          endTime={app.endTime}
          subject={app.subject}
        />
        ))):(
          <p className = {styles.emptyText}>No tienes citas agendadas próximamente</p>
        )}
        
       
        {user.role =='Paciente' && 
          <Link to ="/psicologos" className={styles.link}>
          <button className={styles.addButton}>+</button>
          </Link>
        }

        </div>
        <div className={styles.sort}>
        <h1 className={styles.boxTitle}>
          {user.role =='Paciente'? 'Historial de consultas:' : 'Historial de pacientes:'}
          
        </h1>
        <Link to ='/history'>
        <button className={styles.sortText}>Ver más</button>
        </Link>
        </div>
        {user.history.length > 0 ?( 
        user.history.map((history) => (
        <CardStory
          name={history.name}
          date={history.date}
        />
      ))):(
        <p className = {styles.emptyText}>El historial está vacío</p>
      )}
    </div>
    <Footer />    
    </div>
    ): (
      
      <Loading />
    )}
    </>
  );
};
export default Tablero;