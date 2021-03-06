import styles from "./CardStory.module.css";
import { Link, useHistory } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";

function CardStory({uid, name, date, chatId, photo}) {
  //console.log(uid)
  const {user, setUser}= useContext(UserContext);
  const history = useHistory();
  const handlePatientHistory = () => {
    history.push(`/historiaPacienteIndividual/${uid}`);
  };
  return (
    <div className={styles.container}>
      <div className={styles.psico}>
        <picture className={styles.boxImg}>
          <img src={photo} alt="" />
        </picture>
        <div className={styles.boxInfo}>

          <h2 className={styles.title}>{name}</h2>
          <p>{date}</p>
        </div>
      </div>
      {user.role =="Paciente" ?(
      <Link to ={`/chat/${chatId}`}>
      <button type="button" className={styles.button}>Ver Chat</button>
      </Link>
      ):(
        <>
        <div className={styles.buttons}>
        <Link to ={`/historiaPacienteIndividual/${uid}`}>
        <button type="button" className={styles.button}>Historia</button>
        </Link>
        <Link to ={`/chat/${chatId}`}>
        <button type="button" className={styles.button}>Chat</button>
        </Link>
        </div>
        </>
      )}

    </div>
  );
};

export default CardStory;