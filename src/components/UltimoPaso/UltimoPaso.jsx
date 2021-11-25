import React from 'react'
import styles from './UltimoPaso.module.css'
const UltimoPaso = () => {
    return (
      <div className={styles.container}>
        <div className={styles.leftSide}>
          <h1 className={styles.title}>Último paso!</h1>
          <button className={styles.btnPaypal}>Pagar con Paypal</button>
          <div className={styles.boxPaga}>
            <p>O paga con tu tarjeta:</p>
            <div className={styles.boxInput}>
              <input
                type="number"
                placeholder="Nº de Tarjeta"
                className={styles.input}
              />
              <div className={styles.cardInfo}>
                <input
                  type="text"
                  placeholder="MM/AAAA"
                  className={styles.input}
                />
                <input type="text" placeholder="CVC" className={styles.input} />
              </div>
              <input
                type="text"
                placeholder="País o Región"
                className={styles.input}
              />
              <input
                type="text"
                placeholder="Codigo ZIP"
                className={styles.input}
              />
            </div>
            <button className={styles.button}>Pagar</button>
          </div>
        </div>

        <div className={styles.rightSide}>
          <div className={styles.box}>
            <div className={styles.cita1Hora}>
              <p className={styles.p}>Cita 1 Hora</p>
              <p>Marisol Hidalgo</p>
            </div>
            <p>$29.99</p>
          </div>
          <div className={styles.box}>
            <h3>Subtotal:</h3>
            <p>$29.99</p>
          </div>
          <div className={styles.box}>
            <h3>Total:</h3>
            <p>$29.99</p>
          </div>
        </div>
      </div>
    );
}

export default UltimoPaso
