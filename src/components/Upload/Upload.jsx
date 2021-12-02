import React, { Component } from "react";
import firebase from "firebase";
import { useState, useContext } from "react"
import { UserContext } from "../../context/UserContext";
import { db } from "../../utils/firebaseConfig"
import { storage } from "firebase";
import styles from "./Upload.module.css"
import { useHistory } from "react-router-dom";

function Upload() {

    const { user, setUser} = useContext(UserContext);
    const {getUserByEmail} = useContext(UserContext)
    const [pdf , setPdf] = useState('');

    const history = useHistory(); 

    const upload = async()=>{

        if(pdf == null)
            return;

        const storage = firebase.storage();    
        const snapshot = await storage.ref(`/Psicologos/${pdf.name}`).put(pdf)
        const url = await snapshot.ref.getDownloadURL() 

        const u = await getUserByEmail(user.email)
        const usersReference = db.collection("users");
        await usersReference.doc(u.id).update({
            pdf:(url)
        });
        const updateUser = await getUserByEmail(user.email);
        //console.log({updateUser})
        setUser(updateUser);

        history.push('/pendiente')
    }
            
      
        return (
            <section className={styles.registerSecc}>
                <div className={styles.container}>
                    
                    <div div className={styles.header}>

                        <h1 className={styles.tittle}> Un paso más! </h1>

                        <p className={styles.nextText}> Para registrarte como especialista, necesitamos conocer tus credenciales</p>
                        
                        <div className={styles.container2}>
                            <input id="upload" className={styles.boxUpload} type="file" onChange={(e)=>{setPdf(e.target.files[0])}}/>
                        </div>

                        <p className={styles.nextText2}> Nuestro equipo tomará unos días para revisar tu currículum, al ser aprobado le enviaremos un correo.</p>

                        <button className={styles.continue} onClick={upload}>Subir archivo</button>

                    </div>
                </div>
            </section>
        );
    }

export default Upload