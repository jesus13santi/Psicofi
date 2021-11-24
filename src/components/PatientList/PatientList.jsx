import React from "react";
import { useState, useEffect } from "react";

import CardPatient from "../CardPatient/CardPatient";
import styles from "./PatientList.module.css";

import Footer from "../Footer/Footer"

const PatientList = ({ patients }) => {
  const [value, setValue] = useState("");
  const [orden, setOrden] = useState("ordenAlfabetico");
  const [listaOrdenada, setListaOrdenada] = useState(null);
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
  const ordenarNombres = (lista) => {
    const listaOrdenada = lista.slice().sort((a, b) => {
      const nameA = a.name.toLowerCase();
      const nameB = b.name.toLowerCase();
      if (nameA < nameB) return -1;
      if (nameA > nameB) return 1;
      return 0;
    });
    return listaOrdenada;
  };
  const handleSelect = (e) => {
    setOrden(e.target.value);
    if (e.target.value === "ordenAlfabetico") {
      setListaOrdenada(ordenarNombres(patients));
    } else {
      setListaOrdenada(patients);
    }
  };
  const cambiarLista = async () => {
    if (orden === "ordenAlfabetico") {
      setListaOrdenada(patients);
    }
  };

  return (
    <>
    <div className={styles.container}>
      <div className={styles.boxPsico}>
        <div className={styles.firstText}>
          <div className={styles.boxTitle}>
            <h2 className={styles.title}>Historia de pacientes</h2>
            <input
              name="search"
              className={styles.search}
              type="text"
              placeholder="Buscar..."
              onChange={handleOnchange}
            />
          </div>
          <div className={styles.listEspecial}>
            <div className={styles.boxList}>
              <select
                name="especialidades"
                id=""
                className={styles.select}
                onChange={handleSelect}
              >
                <option value="recientes">Recientes</option>
                <option value="ordenAlfabetico"> Orden Alfabetico</option>
              </select>
            </div>
          </div>
        </div>

        <div className={styles.list}>
          {!!listaOrdenada
            ? listaOrdenada
                .filter(searchingTerm(value))
                .map((patient) => (
                  <CardPatient
                    key={patient.id}
                    id={patient.id}
                    name={patient.name}
                    pais={patient.pais}
                    photo={patient.photo}
                  />
                ))
            : patients
                .filter(searchingTerm(value))
                .map((patient) => (
                  <CardPatient
                    key={patient.id}
                    id={patient.id}
                    name={patient.name}
                    pais={patient.pais}
                    photo={patient.photo}
                  />
                ))}
        </div>
      </div>
    </div>
    <div>
      <Footer />
    </div>
    </>
  );
};

export default PatientList;
