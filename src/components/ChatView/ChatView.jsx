import React from 'react'
import styles from './ChatView.module.css'
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import Loading from '../Loading/Loading';
import Footer from '../Footer/Footer';
import CardChat from '../CardChat/CardChat';
import { useState, useEffect } from "react";
import { app } from 'firebase';

const ChatView = () => {
    const {user, setUser}= useContext(UserContext);

    return (
    <>
    {!!user?(
    
    <div className={styles.container}>
      {setUser(user)}
    <div className={styles.box}>
        
        <h1 className={styles.boxTitle}>Chats</h1>
        <p className={styles.boxSubtitle}>Próximos:</p>
        {user.appointments.length > 0 ?(
        user.appointments.map((app) => (
          <>
          {app.status== 1 &&(
            <CardChat
            name={app.name}
            date={app.date}
            chatId={app.id}
            photo={app.photo}
            />
          )}
          </>

        ))):(
          <p className = {styles.emptyText}>No tienes citas agendadas próximamente</p>
        )}
      <p className={styles.boxSubtitle}>Historial:</p>

      {user.appointments.length > 0 ?(
        user.appointments.map((app) => (
          <>
          {app.status== 0 &&(
            <CardChat
            name={app.name}
            date={app.date}
            chatId={app.id}
            photo={app.photo}
            />
          )}
          </>

        ))):(
          <p className = {styles.emptyText}>El historial de chats está vacío</p>
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