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
    //console.log(user)
    
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
        
        {user.appointments.length > 0 ?(
        user.appointments.map((app) => (
          <>
          {app.status== 1 &&(
            <UTabCard
            appName={app.name}
            date={app.date}
            hour={app.hour}
            photo={app.photo}
            />
          )}
          </>

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
          {user.role =='Paciente'? 'Historial de consultas:' : 'Historial de citas:'}
          
        </h1>
        
        <Link to ='/history'>
        <button className={styles.sortText}>Ver más</button>
        </Link>
        </div>
        
        {user.appointments.length > 0 ?( 
        user.appointments.map((history) => (
        <>
        {history.status== 0 &&(
          <CardStory
          name={history.name}
          date={history.date}
          chatId={history.id}
          photo={history.photo}
          uid={history.uid}
          />
        )}
        </>
        
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