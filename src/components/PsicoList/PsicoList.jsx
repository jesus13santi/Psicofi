import React from "react";
import CardPsico from "../CardPsico/CardPsico";
import styles from "./PsicoList.module.css";
const PsicoList = () => {
  return (
    <div className={styles.container}>
      <div className={styles.boxPsico}>
        <div className={styles.firstText}>
          <div className={styles.boxTitle}>
            <h1 className={styles.title}>Especialistas</h1>
            <input
              className={styles.input}
              type="text"
              placeHolder="Buscar..."
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
          <CardPsico />
          <CardPsico />
          <CardPsico />
          <CardPsico />
          <CardPsico />
          <CardPsico />
          <CardPsico />
          <CardPsico />
          <CardPsico />
        </div>
      </div>
    </div>
  );
};

export default PsicoList;
