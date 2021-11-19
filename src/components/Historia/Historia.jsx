import React from 'react'
import styles from './Historia.module.css'
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import Loading from '../Loading/Loading';
import Footer from '../Footer/Footer';
import CardStory from '../CardStory/CardStory';
import { useState, useEffect } from "react";

const Historia = () => {
  const [value, setValue] = useState("");
  const [orden, setOrden] = useState("ordenAlfabetico");
  const [listaOrdenada, setListaOrdenada] = useState(null);
  const handleOnchange = (event) => {
    setValue(event.target.value.toLowerCase());
  };
    const {user, setUser}= useContext(UserContext);
    console.log(user)
    const handleSelect = (e) => {
        setOrden(e.target.value);
        if (e.target.value === "ordenAlfabetico") {
          console.log(user.history)  
          setListaOrdenada(ordenarNombres(user.history));
          console.log(listaOrdenada)
        } else {
          setListaOrdenada(user.history);
        }
      };
    const ordenarNombres = (lista) => {
    const listaOrdenada = lista.slice().sort((a, b) => {
      const nameA = a.name.toLowerCase();
      const nameB = b.name.toLowerCase();
      if (nameA < nameB) {
         return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
      return 0;
    });
    return listaOrdenada;
  };
  
    return (
    <>
    {!!user?(
    <div className={styles.container}>
    <div className={styles.box}>
        
        <h1 className={styles.boxTitle}>
            {user.role =='Paciente'? 'Historial de consultas' : 'Historial de pacientes'}
        </h1>
        <select
                name="especialidades"
                id=""
                className={styles.sortText}
                onChange={handleSelect}
              >
                <option value>Ordenar por</option>
                <option value="ordenAlfabetico"> Orden Alfabetico</option>
                <option value="date">Fecha</option>
              </select>

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
export default Historia
