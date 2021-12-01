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
  const [lista, setLista] = useState([])
  const {user, setUser}= useContext(UserContext);
  
function checkHistory(a, aux){
  if(a.status == 0){
    aux.push(a)
  }
}

  function history(){
    const app = user.appointments
    console.log('APP',app)
    const aux = []
    app.map((a) =>(
      checkHistory(a, aux)
    ))
    setLista(aux)
    console.log(aux)
    if (!!lista){
      setListaOrdenada(ordenarNombres(user.appointments))
      console.log('Sirve', listaOrdenada)
    }
    

  }

  
  function ordenarNombres(lista) {
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

  function ordenarFecha(lista) {
    const listaOrdenada = lista.slice().sort((a, b) => {
      const nameA = a.date;
      const nameB = b.date;
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

  const handleSelect = (e) => {
    setOrden(e.target.value);
    if (e.target.value === "ordenAlfabetico") {
      setListaOrdenada(ordenarNombres(user.appointments));
    } else if (e.target.value === "date"){
      setListaOrdenada(ordenarFecha(user.appointments));
    } else{
      setListaOrdenada(user.appointments);
    }
  };



    return (
    <>
    {!!user?(
    <div className={styles.container}>
      {/* {setLista(user.appointments)} */}
    <div className={styles.box}>
        
        <h1 className={styles.boxTitle}>
            {user.role =='Paciente'? 'Historial de consultas' : 'Historial de pacientes'}
        </h1>
        <select
                name="especialidades"
                id=""
                className={styles.sortText}
                // onChange={}
                onChange={handleSelect}
              >
                <option value>Ordenar por</option>
                <option value="ordenAlfabetico"
                > 
                 Orden Alfabetico
                 </option>
                <option value="date">Fecha</option>
              </select>
        <div>
        {user.appointments.length > 0 ?( 
        
        <>
        {!!listaOrdenada ?(
          listaOrdenada.map((history) =>(
          <>
          {history.status== 0 &&(
            <CardStory
            uid={history.uid}
            name={history.name}
            date={history.date}
            chatId={history.id}
            photo={history.photo}
            />
          )}
          </>
          )
        )):(
          user.appointments.map((history) => (
            <>
            {history.status== 0 &&(
              <CardStory
              uid={history.uid}
              name={history.name}
              date={history.date}
              chatId={history.id}
              photo={history.photo}
              />
            )}
            </>

        )))}
        
        </>


      ):(
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
