import React, { useState, useEffect } from 'react';
import styles from "./PerfilEspecialista.module.css";

const PerfilPaciente = () => {
    const [name, setName] = useState("");    
    const [birthday, setBirthday] = useState("");    
    const [imagenurl, setImagenurl] = useState("");    
    const [email, setEmail] = useState("");    
    const [phone, setPhone] = useState("");    
    const [home, setHome] = useState("");    
    const [biography, setBiography] = useState("");    

    useEffect (() => {
        getInfo()
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const getInfo = ()=>{
        setName("Fabiola Guia")
        setBirthday("25/05/99")
        setImagenurl("https://sites.google.com/site/trabajosdephotoshop1/_/rsrc/1480378169011/trabajos-en-photoshop-para-carnet/FOTO%20DE%20HOMBRE%201.jpg")
        setEmail("fabiola@gmail.com")
        setPhone("123456")
        setHome("Caracas")
        setBiography("naci feliz")

    }

    return (
        <div className={`${styles.fondorosa} ${styles.bordecontenedor}`}>
            <div className={styles.titulo}>Mi perfil</div>
            <form>
                <div>
                    <div className={styles.etiqueta}><label for="NombreCompleto">Nombre Completo:</label></div>
                    <div className={styles.campo}> <label id="NombreCompleto">{name}</label></div>
                </div>
                <div>
                    <div className={styles.etiqueta}><label for="FechaNacimiento">Fecha de nacimiento:</label></div>
                    <div className={styles.campo}><label id="FechaNacimiento"> {birthday}</label></div>
                </div>
                <div>
                    <div className={`${styles.etiqueta} ${styles.lineagruesa}`}><label for="FotoPerfil">Foto de perfil:</label></div>
                    <div className={`${styles.campofoto} ${styles.campo}  ${styles.lineagruesa}`}>
                        <img src={imagenurl} className={styles.fotoperfil}></img>
                        <a href ="#" className={styles.boton} >Cambiar</a>
                        <a href ="#" className={`${styles.boton} ${styles.eliminar}`} >Eliminar</a>
                    </div>
                </div>
                <div>
                    <div className={styles.etiqueta}><label for="Correo">Correo electrónico:</label></div>
                    <div className={styles.campo}><input className={styles.entrada} type="email" id="correo" value = {email}></input></div>
                </div>
                <div>
                    <div className={styles.etiqueta}><label for="telefono">Teléfono:</label></div>
                    <div className={styles.campo}><input type="text" id="telefono" className={styles.entrada}className={styles.entrada} value ={phone}></input></div>
                </div>
                <div>
                    <div className={styles.etiqueta}><label for="residencia">Lugar de residencia:</label></div>
                    <div className={styles.campo}><input type="text" className={styles.entrada} id="residencia" value ={home}></input></div>
                </div>
                <div>
                    <div className={`${styles.etiqueta} ${styles.lineagruesa}`}><label for="biografia">Biografía:</label></div>
                    <div className={`${styles.campo} ${styles.lineagruesa}`}><textarea className={styles.entrada} id="biografia">{biography}</textarea></div>
                </div>
                <div className= {styles.subtitulo}>
                    <label>Especialidades</label>
                </div>
                <div className = {styles.texto}>
                    <label>Marque a continuación las opciones que coincidan con sus especialidades</label>
                </div>
                <div className= {styles.seleccion}>
                    <input className = {styles.checkbox} type="checkbox" value="Ansiedad" id = "ansiedad"/><label className={styles.checklabel} for = "ansiedad">Ansiedad</label>
                    <input className = {styles.checkbox} type="checkbox" value="Autoestima" id = "autoestima"/><label className={styles.checklabel} for = "autoestima">Autoestima</label>
                    <input className = {styles.checkbox} type="checkbox" value="Sexualidad" id = "sexualidad"/><label className={styles.checklabel} for = "sexualidad">Sexualidad</label>
                </div>
                <div className= {styles.seleccion}>
                    <input className = {styles.checkbox} type="checkbox" value="Estres" id = "estres"/><label className={styles.checklabel} for = "estres">Estres</label>
                    <input className = {styles.checkbox} type="checkbox" value="Amorosos" id = "amorosos"/><label className={styles.checklabel} for= "amorosos">Problemas amorosos</label>                    
                    <input className = {styles.checkbox} type="checkbox" value="Desarrollo" id = "desarrollo"/><label className={styles.checklabel} for = "desarrollo">Desarrollo personal</label>            
                    
                </div>
                <div className= {styles.submit}>
                <input type="submit" className={styles.boton} value="Guardar cambios"></input>
                </div>
            </form>
        </div>
    );
}

export default PerfilPaciente