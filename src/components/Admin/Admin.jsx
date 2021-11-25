import React from "react";
import { useState, useContext, useEffect } from "react"
import { UserContext } from "../../context/UserContext";
import { db } from "../../utils/firebaseConfig"

import CardAdmin from "../CardAdmin/CardAdmin";
import styles from "./Admin.module.css";

const Admin = ({ pendientes, rechazados }) => {
  const [value, setValue] = useState("");
  
  

  const handleOnchange = (event) => {
    setValue(event.target.value.toLowerCase());
  };
  const searchingTerm = (value) => {
    return function (x) {
      return (
        x.name.toLowerCase().includes(value)

      );
    };
  };

  return (
    <div className={styles.container}>
      <div className={styles.boxAdmin}>
        <div className={styles.firstText}>
          <div className={styles.boxTitle}>
            <h1 className={styles.title}>Pendientes</h1>
            <input
              name="search"
              className={styles.input}
              type="text"
              placeholder="Buscar..."
              onChange={handleOnchange}
            />
          </div>
        </div>

        <div className={styles.list}>
          
            {pendientes.filter(searchingTerm(value)).map((pendiente) => (
                  <CardAdmin
                    key={pendiente.id}
                    id={pendiente.id}
                    name={pendiente.name}
                    pais={pendiente.pais}
                    photo={pendiente.photo}
                    pdf={pendiente.pdf}
                  />
                ))}
        </div>
      </div>
      <div className={styles.boxAdmin}>
        <div className={styles.firstText}>
          <div className={styles.boxTitle}>
            <h1 className={styles.title}>Rechazados</h1>
            <input
              name="search"
              className={styles.input}
              type="text"
              placeholder="Buscar..."
              onChange={handleOnchange}
            />
          </div>
        </div>

        <div className={styles.list}>
          
            {rechazados.filter(searchingTerm(value)).map((rechazado) => (
                  <CardAdmin
                    key={rechazado.id}
                    id={rechazado.id}
                    name={rechazado.name}
                    pais={rechazado.pais}
                    photo={rechazado.photo}
                    pdf={rechazado.pdf}
                  />
                ))}
        </div>
      </div>
        

      </div>
  );
};

export default Admin;