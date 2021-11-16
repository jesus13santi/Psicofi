import React from "react";
import styles from "./Tablero.module.css";
import UTabCard from "../UTabCard/UTabCard";
import CardStory from "../CardStory/CardStory";
import { Link } from "react-router-dom";
import Footer from "../Footer/Footer";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";



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

        <div className={styles.citasProximas}>

        {user.nextAppointments.map((app) => (
        <UTabCard
          appName={app.name}
          date={app.date}
          startTime={app.startTime}
          endTime={app.endTime}
          subject={app.subject}
          
        />
        ))}

        {user.role =='Paciente' && 
          <Link to ="/" className={styles.link}>
          <button className={styles.addButton}>+</button>
          </Link>
        }

        </div>
        <div className={styles.sort}>
        <h1 className={styles.boxTitle}>
          {user.role =='Paciente'? 'Historial de consultas:' : 'Historial de pacientes'}
          
        </h1>
        <Link to ='/'>
        <button className={styles.sortText}>Ver más</button>
        </Link>
        </div>
        {user.history.map((history) => (
        <CardStory
          name={history.name}
          date={history.date}
        />
      ))}
    </div>
    <Footer />    
    </div>
    ): (
      <h1>Loading...</h1>
    )}
    </>
  );
};
export default Tablero;