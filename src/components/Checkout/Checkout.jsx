import React from 'react';
import { useState, useEffect } from "react";
import PaypalExpressBtn from 'react-paypal-express-checkout';
import styles from "./Checkout.module.css";
const Checkout = () =>  {
  
      const [subtotal, setSubtotal] = useState(0);
      const [impuestos, setImpuestos] = useState(0);      
      const [env, setEnv] = useState('sandbox');
      const [currency, setCurrency] = useState('USD');
      const [amount, setAmount] = useState(1);
      const [client, setClient] = useState({
        sandbox:     "AazrcZrjAQ-QojuUC2UM1OnwjMTG63n_Ymsk-Ue4BF0FjKk5FCmACHCKxeBSEQ6XPDeX-yLMU_juZbrV",
        production: 'YOUR-PRODUCTION-APP-ID'}); 
        const [committedFieldsToAdd, setCommittedFieldsToAdd] = React.useState([{tipo: 'Cita 1 Hora', especialista: 'Marisol Hidalgo', precio: 29}]);
     
        useEffect(() => {
          calcularTotales();
        })
  const calcularTotales = () =>{
    let suma = 0;
    console.log('******************************')
    committedFieldsToAdd.map((value,index) => {      
      suma = suma+value.precio;
  });
    setSubtotal(suma);
    console.log(parseInt(subtotal));
    setImpuestos(subtotal*0.16);
    setAmount(subtotal+impuestos);
  }

   
  const onError = (err) =>{
    console.log(err);
  }
  const onSuccess = (suc) =>{
    console.log(suc);
  }

  const onCancel = (canc) =>{
    console.log(canc);
  }
  
  return (
      <div className={`${styles.fondorosa} ${styles.bordecontenedor}`}>
        <div className={styles.titulo}>Último paso!</div>
        <div className  = {styles.items}>
        {committedFieldsToAdd.map(
        (value, index) => (          
          <Field value={value} />
          
        )
      )}
      </div>
      <hr/>
      <div className = {styles.totales}>
        <div className={styles.etiqueta}>  
        <label className={`${styles.linea} ${styles.labeltotales}`}>Subtotal:</label>
        <label className={`${styles.linea} ${styles.labeltotales}`}>Impuestos:</label>
        <label className={`${styles.linea} ${styles.labeltotales}`}>Total:</label>
        
      </div>
    <div className={styles.campo}>
      <label className={styles.linea}>${subtotal}</label>
      <label className={styles.linea}>${impuestos}</label>
      <label className={styles.linea}>${amount}</label>
    </div>
      </div>
      <div className= {styles.botonPaypal}>
        <PaypalExpressBtn  env={env} client={client} currency={currency} total={amount} onError={onError} onSuccess={onSuccess} onCancel={onCancel} />
        </div>
      </div>
  
  )
}

const Field = ({value}) => (
  <div>
    <div className={styles.etiqueta}>  
      <label className={styles.linea}>{value.tipo}</label>
      <label>{value.especialista}</label>
    </div>
    <div className={styles.campo}>
      <label>${value.precio}</label>
    </div>
  </div>
);

export default Checkout;