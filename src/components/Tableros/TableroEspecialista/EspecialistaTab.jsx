import React from "react";
import styles from "./EspecialistaTab.module.css";
import UTabCard from "../../UTabCard/UTabCard";
import CardStory from "../../CardStory/CardStory";
import { Link } from "react-router-dom";
import Footer from "../../Footer/Footer";
import { useParams } from "react-router";
import { db } from '../../../utils/firebaseConfig';
import { useState, useEffect } from "react";
//import { getArrayCollection, getFirstElementArrayCollection } from "../../../utils/parser";
import { useContext } from "react";
import { UserContext } from "../../../context/UserContext";


function EspecialistaTab(){
  const {user , setUser} = useContext(UserContext)
 


  return (
    <>
      {!! user ? (
    <div className={styles.container}>
    <h1 className={styles.title}>Bienvenido, {user.name}</h1>
    <div className={styles.box}>
        
        <h1 className={styles.boxTitle}>Citas próximas:</h1>
        <div className={styles.citasProximas}>

        <UTabCard />


        </div>
        <div className={styles.sort}>
        <h1 className={styles.boxTitle}>Historial de pacientes:</h1>
        
        <h1 className={styles.sortText}>Filtrar</h1>
        </div>
        <CardStory />
    </div>
    <Footer />    
    </div>
     ) : (
      <h1>Loading...</h1>
    )}
  </>
  );
};
export default EspecialistaTab;