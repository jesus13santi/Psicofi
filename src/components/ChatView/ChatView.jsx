import React from 'react'
import styles from './ChatView.module.css'
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import Loading from '../Loading/Loading';
import Footer from '../Footer/Footer';
import CardChat from '../CardChat/CardChat';
import { useState, useEffect } from "react";

const ChatView = () => {
    const {user, setUser}= useContext(UserContext);

    return (
    <>
    {!!user?(
    <div className={styles.container}>
    <div className={styles.box}>
        
        <h1 className={styles.boxTitle}>Chats</h1>
        <p className={styles.boxSubtitle}>Próximos:</p>
        {user.nextAppointments.length > 0 ?( 
        user.nextAppointments.map((app) => (
        <CardChat
        name={app.name}
        date={app.date} 
        />
      ))):(
        <p className = {styles.emptyText}>El historial está vacío</p>
      )}
      <p className={styles.boxSubtitle}>Historial:</p>
      {user.history.length > 0 ?( 
        user.history.map((history) => (
        <CardChat
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
export default ChatView