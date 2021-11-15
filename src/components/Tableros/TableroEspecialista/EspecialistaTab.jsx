import React from "react";
import styles from "./EspecialistaTab.module.css";
import UTabCard from "../../UTabCard/UTabCard";
import CardStory from "../../CardStory/CardStory";
import { Link } from "react-router-dom";
import Footer from "../../Footer/Footer";
import { useParams } from "react-router";
import { db } from '../../../utils/firebaseConfig';
import { useState, useEffect } from "react";
import { getArrayCollection, getFirstElementArrayCollection } from "../../../utils/parser";




function EspecialistaTab(){
  const [activeUser, setActiveUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null); 
  const params = useParams();
  
  

  const fetchUser = async () => {
    
    const uid = params.uid
    const usersReference = db.collection('users');
    console.log("UID:",params.uid)
    console.log("ID:",uid)
    try {
      setIsLoading(true);
      const snapshot = await usersReference.doc(uid).get().then(snap => setActiveUser(snap.data()));
      console.log('Snapshot: ', snapshot)
      //ojo
      if (!snapshot.size) return null;

      setActiveUser(getFirstElementArrayCollection(snapshot));
      console.log('ACTIVE USER',activeUser)

      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      setError(err);
      console.log('ERROR:', err);
    }
  };
    console.log("Bien")
  useEffect(() => {
    fetchUser();
    console.log("Mal")
  }, []); 
 

  return (
    <>
      {!isLoading && activeUser ? (
    <div className={styles.container}>
    <h1 className={styles.title}>Bienvenido, {activeUser.name}</h1>
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

    {error && <h1>{error.message}</h1>}
  </>
  );
};
export default EspecialistaTab;