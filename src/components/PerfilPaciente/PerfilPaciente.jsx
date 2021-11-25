import { useContext } from "react"
import { useHistory } from "react-router-dom"
import { UserContext } from "../../context/UserContext"
import React, { useState, useEffect } from 'react';
import styles from "./PerfilPaciente.module.css";
import { db } from '../../utils/firebaseConfig';
import $ from 'jquery';
import firebase from "firebase";

const PerfilPaciente = () => {
    const [birthday, setBirthday] = useState("");    
    const [biography, setBiography] = useState("");
    const {getUserByEmail} = useContext(UserContext) 
    const { user, setUser } = useContext(UserContext);
    const history = useHistory();
    
    useEffect(() => {
      console.log('####################################')
            if(user.problemas != undefined){
              console.log(user.problemas)
              $.each(user.problemas,function(index,value){
                $("#"+value).prop('checked', true);
              })
            }        
        })

        const validar_campos=()=>{
          let valido = true;
          // si fecha de nacimiento no es valido
          // valido = false
          // si correo no es valido
          // valido = false
          // si telefono no es valido
          // valido = false
          // si residencia no es valido
          // valido = false
          // si condiciones es vacio
          // valido = false
          
          return valido;
        }
        const handleOnClick = async(event) => {
          if(validar_campos()){
            console.log(biography)
            console.log(user.id)          
            let problemas = []
            $.each(['ansiedad', 'autoestima', 'sexualidad', 'estres', 'amorosos', 'desarrollo'], function(index, value){
              if($("#"+value).prop("checked")){
                problemas.push(value)
              }
            })
            console.log(problemas)
            user.problemas = problemas
            await db.collection("users").doc(user.id).update(
              {
                "number": user.number,
                "pais": user.pais,
                "description": user.description,
                "problemas": problemas
              })
            history.push("/deck")
          }
        }

         const actualizarUsuario = async() =>{
           console.log(user)
            await db.collection("users").doc(user.id).update(
            {
              "number": user.number,
              "pais": user.pais
            }
          )
          setUser(user)
          console.log('************************************')          
          console.log(user)
          return true;
        };

        const upload = async(img)=>{

          if(img == null)
              return;
  
  
          const storage = firebase.storage();    
          const snapshot = await storage.ref(`/pfp/${img.name}`).put(img)
          const url = await snapshot.ref.getDownloadURL() 
  
          const u = await getUserByEmail(user.email)
          const usersReference = db.collection("users");
          await usersReference.doc(u.id).update({
              photo:(url)
          });
          const updateUser = await getUserByEmail(user.email);
          console.log({updateUser})
          setUser(updateUser);
        }

    return (
      <div className={`${styles.fondorosa} ${styles.bordecontenedor}`}>
        <div className={styles.titulo}>Mi perfil</div>
        <form>
          <div>
            <div className={styles.etiqueta}>
              <label for="NombreCompleto">Nombre Completo:</label>
            </div>
            <div className={styles.campo}>             
              <label id="NombreCompleto">{user.name}</label>
            </div>
          </div>
          <div>
            <div className={styles.etiqueta}>
              <label for="FechaNacimiento">Fecha de nacimiento:</label>
            </div>
            <div className={styles.campo}>
              <input
                name = "FechaNacimiento"
                className={styles.entrada}
                type="date"
                id="FechaNacimiento"
                defaultValue={birthday} 
                onChange = {e => user.birthday = e.target.value}              
              ></input>
            </div>
          </div>
          <div>
            <div className={`${styles.etiqueta} ${styles.lineagruesa}`}>
              <label for="FotoPerfil">Foto de perfil:</label>
            </div>
            <div
              className={`${styles.campofoto} ${styles.campo}  ${styles.lineagruesa}`}
            >
              
              <img src={user.photo} className={styles.fotoperfil}></img>
              <label for="upload" class={styles.boton}>
                  Cambiar
              </label>
              <input id="upload" className={styles.boton} type="file" onChange={(e)=>{upload(e.target.files[0])}}/>
              <a href="#" className={`${styles.boton} ${styles.eliminar}`}>
                Eliminar
              </a>
            </div>
          </div>
          <div>
            <div className={styles.etiqueta}>
              <label for="correo">Correo electrónico:</label>
            </div>
            <div className={styles.campo}>
              <input
                name = "correo"
                className={styles.entrada}
                type="email"
                id="correo"
                defaultValue={user.email}
                onChange = {e => user.email = e.target.value}
              ></input>
            </div>
          </div>
          <div>
            <div className={styles.etiqueta}>
              <label for="telefono">Teléfono:</label>
            </div>
            <div className={styles.campo}>
              <input
                name = "telefono"
                className={styles.entrada}
                type="text"
                id="telefono"
                defaultValue={user.number}
                onChange = {e => user.number = e.target.value}
              ></input>
            </div>
          </div>
          <div>
            <div className={styles.etiqueta}>
              <label for="pais">Lugar de residencia:</label>
            </div>
            <div className={styles.campo}>
              <input
                type="text"
                name = "pais"
                className={styles.entrada}
                id="pais"
                defaultValue={user.pais}
                onChange = {e => user.pais = e.target.value}
              ></input>
            </div>
          </div>
          <div>
            <div className={`${styles.etiqueta} ${styles.lineagruesa}`}>
              <label for="description">Biografía:</label>
            </div>
            <div className={`${styles.campo} ${styles.lineagruesa}`}>
              <textarea
                className={styles.entrada}
                id="description"
                defaultValue={user.description}
                onChange = {e => user.description = e.target.value}
              />
            </div>
          </div>
          <div className={styles.subtitulo}>
            <label>Condiciones a tratar</label>
          </div>
          <div className={styles.texto}>
            <label>
              Marque a continuación las opciones que coincidan con sus problemas
            </label>
          </div>
          <div className={styles.seleccion}>
            <input
              className={styles.checkbox}
              type="checkbox"
              name="ansiedad"
              value="ansiedad"
              id="ansiedad"
            />
            <label className={styles.checklabel} for="ansiedad">
              Ansiedad
            </label>
            <input
              className={styles.checkbox}
              type="checkbox"
              name="autoestima"
              value="autoestima"
              id="autoestima"
            />
            <label className={styles.checklabel} for="autoestima">
              Autoestima
            </label>
            <input
              className={styles.checkbox}
              type="checkbox"
              name="sexualidad"
              value="sexualidad"
              id="sexualidad"
            />
            <label className={styles.checklabel} for="sexualidad">
              Sexualidad
            </label>
          </div>
          <div className={styles.seleccion}>
            <input
              className={styles.checkbox}
              type="checkbox"
              name="estres"
              value="estres"
              id="estres"
            />
            <label className={styles.checklabel} for="estres">
              Estres
            </label>
            <input
              className={styles.checkbox}
              type="checkbox"
              name="amorosos"
              value="amorosos"
              id="amorosos"
            />
            <label className={styles.checklabel} for="amorosos">
              Problemas amorosos
            </label>
            <input
              className={styles.checkbox}
              type="checkbox"
              name="desarrollo"
              value="desarrollo"
              id="desarrollo"
            />
            <label className={styles.checklabel} for="desarrollo">
              Desarrollo personal
            </label>
          </div>
          <div className={styles.submit}>
            <input
              type="button"
              className={styles.boton}              
              value="Guardar cambios"
              onClick = {handleOnClick}
            ></input>
          </div>
        </form>
      </div>
    );
}

export default PerfilPaciente