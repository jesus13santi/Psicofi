import React from "react";
import CardPsico from "../CardPsico/CardPsico";
import styles from "./PsicoList.module.css";
const PsicoList = ({psicologos}) => {
  return (
    <div className={styles.container}>
      <div className={styles.boxPsico}>
        <div className={styles.firstText}>
          <div className={styles.boxTitle}>
            <h1 className={styles.title}>Especialistas</h1>
            <input
              className={styles.input}
              type="text"
              placeholder="Buscar..."
            />
          </div>
          <div className={styles.listEspecial}>
            <div className={styles.boxList}>
              <ul>
                <li>Todos</li>
              </ul>
              <ul>
                <li>Orden Alfabético</li>
              </ul>
            </div>
          </div>
        </div>

        <div className={styles.list}>
          {psicologos.map((psicologo) => (
           
              <CardPsico
                key= {psicologo.id}
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
