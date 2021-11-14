import React from "react";
import { useState } from "react";

import CardPsico from "../CardPsico/CardPsico";
import styles from "./PsicoList.module.css";

const PsicoList = ({ psicologos }) => {
  const [value, setValue] = useState("");
  const [orden, setOrden] = useState("ordenAlfabetico");
  const [listaOrdenada, setListaOrdenada] = useState(null);

  
  const handleOnchange = (event) => {
    setValue(event.target.value.toLowerCase());
  };
  const searchingTerm = (value) => {
    return function (x) {
      return (
        x.name.toLowerCase().includes(value) ||
        x.lastName.toLowerCase().includes(value) ||
        x.pais.toLowerCase().includes(value)
      );
    };
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
  const haddleSelect = (e) => {
    setOrden(e.target.value);
    if (e.target.value === "ordenAlfabetico") {
      setListaOrdenada(ordenarNombres(psicologos));
    } else {
      setListaOrdenada(psicologos);
    }
  };
  const cambiarLista = async () => {
    if (orden === "ordenAlfabetico") {
      setListaOrdenada(psicologos);
    }
  };

 

  return (
    <div className={styles.container}>
      <div className={styles.boxPsico}>
        <div className={styles.firstText}>
          <div className={styles.boxTitle}>
            <h1 className={styles.title}>Especialistas</h1>
            <input
              name="search"
              className={styles.input}
              type="text"
              placeholder="Buscar..."
              onChange={handleOnchange}
            />
          </div>
          <div className={styles.listEspecial}>
            <div className={styles.boxList}>
              <select name="especialidades" id="" className={styles.select}>
                <option value="todos"> Todos</option>
                <option value="ansiedad">Ansiedad</option>
                <option value="estres">Estres</option>
                <option value="depresion">Depresion</option>
              </select>
              <select
                name="especialidades"
                id=""
                className={styles.select}
                onChange={haddleSelect}
              >
                <option value>Selecciona Una opcion</option>
                <option value="ordenAlfabetico"> Orden Alfabetico</option>
                <option value="ranking">Ranking</option>
              </select>
            </div>
          </div>
        </div>

        <div className={styles.list}>
          {!!listaOrdenada
            ? listaOrdenada
                .filter(searchingTerm(value))
                .map((psicologo) => (
                  <CardPsico
                    key={psicologo.id}
                    id={psicologo.id}
                    name={psicologo.name}
                    pais={psicologo.pais}
                    lastName={psicologo.lastName}
                    photo={psicologo.photo}
                    description={psicologo.description}
                  />
                ))
            : psicologos
                .filter(searchingTerm(value))
                .map((psicologo) => (
                  <CardPsico
                    key={psicologo.id}
                    id={psicologo.id}
                    name={psicologo.name}
                    pais={psicologo.pais}
                    lastName={psicologo.lastName}
                    photo={psicologo.photo}
                    description={psicologo.description}
                  />
                ))}
        </div>
      </div>
    </div>
  );
};

export default PsicoList;
