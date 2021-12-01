import React from 'react';
import { useState, useEffect,useContext } from "react";
import PaypalExpressBtn from 'react-paypal-express-checkout';
import styles from "./Checkout.module.css";
import { db } from '../../utils/firebaseConfig';
import { UserContext } from '../../context/UserContext';
import { useHistory, useParams } from 'react-router-dom';

const Checkout = ({psicologo,cita}) =>  {
      const params =useParams()
      const {user,setUser, getUserByEmail}= useContext(UserContext)
      const history= useHistory()
      const [subtotal, setSubtotal] = useState(0);
      const [impuestos, setImpuestos] = useState(0);      
      const [env, setEnv] = useState('sandbox');
      const [currency, setCurrency] = useState('USD');
      const [amount, setAmount] = useState(1);
      const [client, setClient] = useState({
        sandbox:     "AazrcZrjAQ-QojuUC2UM1OnwjMTG63n_Ymsk-Ue4BF0FjKk5FCmACHCKxeBSEQ6XPDeX-yLMU_juZbrV",
        production: 'YOUR-PRODUCTION-APP-ID'}); 
        const [committedFieldsToAdd, setCommittedFieldsToAdd] = React.useState({tipo: 'Cita 1 Hora', especialista: psicologo.name, precio: 29});
      const [error, setError]=useState(null)
     
        useEffect(() => {
          calcularTotales();
        })

  const calcularTotales = () =>{
    let suma = 0;
    console.log('******************************')
    suma = suma + committedFieldsToAdd.precio;
    setSubtotal(suma);
    console.log(parseInt(subtotal));
    setImpuestos(subtotal*0.16);
    setAmount(subtotal+impuestos);
  }

   
  const onError = (err) =>{
    setError("Error, por favor verifique y vuelva a intentarlo.")
    console.log(err);
  }
  const onSuccess = (suc) =>{
    handdleAppointment()
    console.log(suc);
  }

  const onCancel = (canc) =>{
    setError("Se cancelo su operacion.")
    console.log(canc);
  }
  

  //Crear la cita
  const createChat = async (user, uid) => {
    try {
      await db.collection("chats").doc(uid).set(user);
    } catch (e) {
      console.log(e);
    }
  };
  
  const handdleAppointment = async () => {
    if (cita !== "") {
      const cita1 = psicologo.appointments.find(
        (element) => element.id === cita
      );

      createChat(
        {
          active: "no",
          msjs: [],
          status: 1,
          users: [
            { img: user.photo, name: user.name, id: user.id },
            { img: psicologo.photo, name: psicologo.name, id: params.uid },
          ],
        },
        cita
      );
      const newArray = psicologo.appointments.filter(
        (item) => item.id !== cita
      );

      // Update cita del psicologo
      await db
        .collection("users")
        .doc(params.uid)
        .update({
          appointments: [
            ...newArray,
            {
              date: cita1.date,
              hour: cita1.hour,
              id: cita1.id,
              status: 1,
              name: user.name,
              photo: user.photo,
              uid: user.id,
            },
          ],
        });

      // Update Usuario logueado
      await db
        .collection("users")
        .doc(user.id)
        .update({
          appointments: [
            ...user.appointments,
            {
              date: cita1.date,
              hour: cita1.hour,
              id: cita1.id,
              status: 1,
              name: psicologo.name,
              photo: psicologo.photo,
              uid: params.uid,
            },
          ],
        });

      alert("cita Creada");
      const updateUser = await getUserByEmail(user.email);
      setUser(updateUser);
      history.push("/deck");
    } else {
      alert("No se selecciono ninguna cita");
    }
  };
  

  return (
    <div className={`${styles.boxcontenedor}`}>
      <h1>Ultimo Paso!</h1>
      <div className={styles.firstBox}>
        <div>
          <h3>{committedFieldsToAdd.tipo}</h3>
          <h3>{committedFieldsToAdd.especialista}</h3>
        </div>
        <label htmlFor="">${committedFieldsToAdd.precio}</label>
      </div>

      <hr />
      <div className={styles.totales}>
        <p htmlFor="">Subtotal:</p>
        <p className={styles.linea}>${subtotal}</p>
        <p htmlFor="">Impuestos: </p>
        <p className={styles.linea}>${impuestos}</p>
        <p>Total</p>
        <label className={styles.linea}>${amount}</label>
      </div>
      <div className={styles.btnPaypal}>
        <PaypalExpressBtn
          env={env}
          client={client}
          currency={currency}
          total={amount}
          onError={onError}
          onSuccess={onSuccess}
          onCancel={onCancel}
        />
      </div>
      {!!error && (
        <div className={styles.error}>
          <label>{error}</label>
        </div>
      )}
    </div>
  );
}


export default Checkout;