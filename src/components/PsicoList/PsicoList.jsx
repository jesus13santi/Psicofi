import React from "react";
import { useState, useEffect } from "react";
import Footer from "../Footer/Footer";
import CardPsico from "../CardPsico/CardPsico";
import styles from "./PsicoList.module.css";

const PsicoList = ({ psicologos,areas }) => {
  
  const [value, setValue] = useState("");
  const [orden, setOrden] = useState("ordenAlfabetico");
  const [listaOrdenada, setListaOrdenada] = useState(null);
  const [esp,setEsp]=useState("");
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
  // const ordenarRatings = (lista) => {
  //   const listaOrdenada = lista.slice().sort((a, b) => {

  //     const nameA = a.ratings.reduce((c, d) => c + d, 0) / a.ratings.length;
      
  //     const nameB = b.ratings.reduce((c, d) => a + d, 0) / b.length;
  //     console.log("nameB", nameB);
  //     if (!nameA && nameB) {
  //       return -1;
  //     }
  //     if (!nameB && nameA) {
  //       return 1;
  //     }
  //     if (nameA < nameB) {
  //       return -1;
  //     }
  //     if (nameA > nameB) {
  //       return 1;
  //     }
  //     return 0;
  //   });
  //   return listaOrdenada;
  // };
 
  const haddleSelect = (e) => {
    setOrden(e.target.value);
    if (e.target.value === "ordenAlfabetico") {
      setListaOrdenada(ordenarNombres(psicologos));
    } else if (e.target.value === "ranking") {
      console.log("Hola")
    } else {
      setListaOrdenada(psicologos);
    }
  };
  console.log(listaOrdenada)
  const handdleEsp=(e)=>{
    console.log(e.target.value)
    setEsp(e.target.value);
  }
  const cambiarLista = async () => {
    if (orden === "ordenAlfabetico") {
      setListaOrdenada(psicologos);
    }
  };

  console.log(orden);

  return (
    <>
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
                <select
                  name="especialidades"
                  id=""
                  className={styles.select}
                  onChange={handdleEsp}
                >
                  <option value=""> Todos</option>
                  {!!areas &&
                    areas.map((area) => (
                      <option value={area.especialidad}>
                        {area.especialidad}
                      </option>
                    ))}
                  {/* <option value="ansiedad">Ansiedad</option>
                  <option value="estres">Estres</option>
                  <option value="depresion">Depresion</option> */}
                </select>
                <select
                  name="especialidades"
                  id=""
                  className={styles.select}
                  onChange={haddleSelect}
                >
                  <option value>Selecciona una opcion</option>
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
                    <>
                      {esp === "" ? (
                        <CardPsico
                          key={psicologo.id}
                          id={psicologo.id}
                          name={psicologo.name}
                          pais={psicologo.pais}
                          photo={psicologo.photo}
                          description={psicologo.description}
                          problemas={psicologo.problemas}
                        />
                      ) : (
                        psicologo.problemas.map((problema) => (
                          <>
                            {problema === esp && (
                              <CardPsico
                                key={psicologo.id}
                                id={psicologo.id}
                                name={psicologo.name}
                                pais={psicologo.pais}
                                photo={psicologo.photo}
                                description={psicologo.description}
                                problemas={psicologo.problemas}
                              />
                            )}
                          </>
                        ))
                      )}
                    </>
                  ))
              : psicologos.filter(searchingTerm(value)).map((psicologo) => (
                  <>
                    {esp === "" ? (
                      <CardPsico
                        key={psicologo.id}
                        id={psicologo.id}
                        name={psicologo.name}
                        pais={psicologo.pais}
                        photo={psicologo.photo}
                        description={psicologo.description}
                        problemas={psicologo.problemas}
                      />
                    ) : (
                      psicologo.problemas.map((problema) => (
                        <>
                        
                          {problema === esp && (
                            <>
                              <CardPsico
                                key={psicologo.id}
                                id={psicologo.id}
                                name={psicologo.name}
                                pais={psicologo.pais}
                                photo={psicologo.photo}
                                description={psicologo.description}
                                problemas={psicologo.problemas}
                              />
                            </>
                          )}
                        </>
                      ))
                    )}
                  </>
                ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default PsicoList;
