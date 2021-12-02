import { useContext } from "react"
import { useHistory } from "react-router-dom"
import { UserContext } from "../../context/UserContext"
import React, { useState, useEffect } from 'react';
import styles from "./PerfilPaciente.module.css";
import { db } from '../../utils/firebaseConfig';
import $ from 'jquery';
import firebase from "firebase";
import Footer from "../Footer/Footer";

const PerfilPaciente = ({areas}) => {
    const [birthday, setBirthday] = useState("");    
    const [biography, setBiography] = useState("");
    const {getUserByEmail} = useContext(UserContext) 
    const { user, setUser } = useContext(UserContext);
    const history = useHistory();
    
    useEffect(() => {
      //console.log('####################################')
            if(user.problemas != undefined){
              //console.log(user.problemas)
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
            //console.log(biography)
            //console.log(user.id)          
            let problemas = []
            $.each(['ansiedad', 'autoestima', 'sexualidad', 'estres', 'amorosos', 'desarrollo'], function(index, value){
              if($("#"+value).prop("checked")){
                problemas.push(value)
              }
            })
            //console.log(problemas)
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
           //console.log(user)
            await db.collection("users").doc(user.id).update(
            {
              "number": user.number,
              "pais": user.pais
            }
          )
          setUser(user)
          //console.log('************************************')          
          //console.log(user)
          return true;
        };
        function diaBirthday(x) {
          const date1 = new Date(x.replace(/-+/g, "/"));
          const options = {
            year: "numeric",
            month: "long",
            day: "numeric",
          };
          const result = date1.toLocaleDateString("es-Es", options);
          // //console.log(date1.toLocaleDateString("es-MX", options));
          return result;
        }
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
          //console.log({updateUser})
          setUser(updateUser);
        }
        const handleDeletePhoto= async()=>{
          await db.collection("users").doc(user.id).update({
            photo:
              "https://us.123rf.com/450wm/thesomeday123/thesomeday1231712/thesomeday123171200009/91087331-icono-de-perfil-de-avatar-predeterminado-para-hombre-marcador-de-posici%C3%B3n-de-foto-gris-vector-de-ilu.jpg?ver=6",
          });
          const updateUser = await getUserByEmail(user.email);
          setUser(updateUser);
          
          
      }

    return (
      <>
        <div className={`${styles.fondorosa} ${styles.bordecontenedor}`}>
          <h1 className={styles.titulo}>Mi perfil</h1>
          <form>
            <div className={styles.boxInput}>
              <h3 for="NombreCompleto">Nombre Completo:</h3>

              <p id="NombreCompleto">{user.name}</p>

              <h3 for="FechaNacimiento">Fecha de nacimiento:</h3>

              {/* <input
                name = "FechaNacimiento"
                className={styles.entrada}
                type="date"
                id="FechaNacimiento"
                defaultValue={birthday} 
                onChange = {e => user.birthday = e.target.value}              
              ></input> */}
              <p>{diaBirthday(user.birthday)}</p>

              <h3 for="FotoPerfil">Foto de perfil:</h3>

              <div
                className={`${styles.campofoto} ${styles.campo}  ${styles.lineagruesa}`}
              >
                <picture className={styles.boxPhoto}>
                  <img src={user.photo} className={styles.fotoperfil}></img>
                </picture>
                <div className={styles.boxBtn}>
                  <label for={styles.upload} class={styles.boton}>
                    Cambiar
                  </label>

                  <input
                    id={styles.upload}
                    className={styles.boton}
                    type="file"
                    onChange={(e) => {
                      upload(e.target.files[0]);
                    }}
                  />
                  <button type='button' onClick={handleDeletePhoto} className={`${styles.boton} ${styles.eliminar}`}>
                    Eliminar
                  </button>
                </div>
              </div>

              <h3 for="correo">Correo electrónico:</h3>

              <label
                
              >{user.email}</label>

              <h3 for="telefono">Teléfono:</h3>

              <input
                name="telefono"
                className={styles.entrada}
                type="text"
                id="telefono"
                defaultValue={user.number}
                onChange={(e) => (user.number = e.target.value)}
              ></input>

              <h3 for="pais">Lugar de residencia:</h3>

              <input
                type="text"
                name="pais"
                className={styles.entrada}
                id="pais"
                defaultValue={user.pais}
                onChange={(e) => (user.pais = e.target.value)}
              ></input>

              <h3 for="description">Biografía:</h3>

              <textarea
                className={`${styles.entrada} ${styles.btn}`}
                id="description"
                defaultValue={user.description}
                onChange={(e) => (user.description = e.target.value)}
              />

              <h3>Condiciones a tratar</h3>
            </div>
            <div className={styles.texto}>
              <label>
                Marque a continuación las opciones que coincidan con sus
                problemas
              </label>
            </div>
            <div className={styles.seleccion}>
              {!!areas &&
                areas.map((area) => (
                  <div>
                    <input
                      className={styles.checkbox}
                      type="checkbox"
                      name={area.especialidad}
                      value={area.especialidad}
                      id={area.especialidad}
                    />
                    <label
                      className={styles.checklabel}
                      for={area.especialidad}
                    >
                      {area.especialidad}
                    </label>
                  </div>
                ))}
            </div>
            <div className={styles.submit}>
              <input
                type="button"
                className={`${styles.boton} ${styles.btn2}`}
                value="Guardar cambios"
                onClick={handleOnClick}
              ></input>
            </div>
          </form>
        </div>
        <Footer />
      </>
    );
}

export default PerfilPaciente