import React, { Component } from "react";
import firebase from "firebase";
import { useState } from "react"
import { storage } from "firebase";
import styles from "./Upload.module.css"

function Upload() {

    const [pdf , setPdf] = useState('');
    const [success, setSuccess] = useState("")
    const storageRef = firebase.storage().ref(`/Psicologos/${pdf.name}`);

    const upload = ()=>{
        if(pdf == null)
            return;
        storageRef.put(pdf);
    }
      
        return (
            <section className={styles.registerSecc}>
                <div className={styles.container}>
                    
                    <div div className={styles.header}>

                        <h1 className={styles.tittle}> Un paso más! </h1>

                        <p className={styles.nextText}> Para registrarte como especialista, necesitamos conocer tus credenciales</p>
                        
                        <div className={styles.container2}>

                        <label for="upload" class={styles.customfileupload}>
                            Cargar archivo
                        </label>
                            <input id="upload" className={styles.nextText} type="file" onChange={(e)=>{setPdf(e.target.files[0])}}/>
                        </div>

                        <p className={styles.nextText2}> Nuestro equipo tomará unos días para revisar tu currículum, al ser aprobado le enviaremos un correo.</p>

                        <button className={styles.continue} onClick={upload}>Subir archivo</button>

                    </div>
                </div>
            </section>
        );
    }

export default Upload