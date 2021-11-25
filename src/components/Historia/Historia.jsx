import styles from './Historia.module.css'
import { useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import Loading from '../Loading/Loading';
import Footer from '../Footer/Footer';
import CardStory from '../CardStory/CardStory';

const Historia = () => {

  const params = useParams();
  const [value, setValue] = useState("");
  const [orden, setOrden] = useState("ordenAlfabetico");
  const [listaOrdenada, setListaOrdenada] = useState(null);
  const [lista, setLista] = useState(null)
  const {user, setUser}= useContext(UserContext);
  
function checkHistory(a, aux){
  if(a.state == 0){
    aux.push(a)
  }
}

  const history = ({user})=> {
    const app = user.appointments
    const aux = []
    app.map((a) =>(
      checkHistory(a, aux)
    ))
    setLista(aux)

  }

  
    return (
    <>
    {!!user?(
    <div className={styles.container}>
    <div className={styles.box}>
        
        <h1 className={styles.boxTitle}>
            {user.role =='Paciente'? 'Historial de consultas' : 'Historial de pacientes'}
        </h1>
        <select
                name="especialidades"
                id=""
                className={styles.sortText}
                // onChange={}
              >
                <option value>Ordenar por</option>
                <option value="ordenAlfabetico"> Orden Alfabetico</option>
                {/*<option value="date">Fecha</option>*/}
              </select>
        <div>
        {user.appointments.length > 0 ?( 
        user.appointments.map((history) => (
        <>
        {history.status== 0 &&(
          <CardStory
          id={params.uid}
          name={history.name}
          date={history.date}
          chatId={history.id}
          />
        )}
        </>
        
      ))):(
        <p className = {styles.emptyText}>El historial está vacío</p>
      )}
      </div>
    </div>
    <Footer />    
    </div>
    ): (
      
      <Loading />
    )}
    </>
  );
};
export default Historia
