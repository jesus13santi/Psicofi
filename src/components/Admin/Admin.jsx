import { useState, useEffect } from "react";
import { db } from "../../utils/firebaseConfig"
import swal from "sweetalert";
import CardAdmin from "../CardAdmin/CardAdmin";
import styles from "./Admin.module.css";
import { size } from "lodash"

const Admin = ({ pendientes, rechazados }) => {
  const [value, setValue] = useState("");
  const [valueB, setValueB] = useState("");
  const [areas, setAreas]=useState([]);
  const [isLoading, setLoading] = useState(true);

  const getArrayCollection = (snapshot) => {
    const collection = [];
    snapshot.forEach((element) => {
      collection.push({
        id: element.id,
        ...element.data(),
      });
    });
    return collection;
  };

  useEffect(() => {
    fetchEspecialidades();
    setLoading(false);
  }, []);
  

  const aggEspecialidad = async(e) =>{

  
      const esp = document.getElementById("especialidad").value;
      
      if(size(esp) < 1) {

        swal("", "Asegurese de que el campo no este vacio", "error")
        return

      } else{

        await db.collection("especialidades").add({
          especialidad: esp  
        })
        swal("", "Se ha agregado exitosamente la especialidad", "success");

      }    
  }

  const cargar = () =>{
    window.location.reload();
  }
 
  const getElementArrayCollection = (snapshot) => {
    const collection = getArrayCollection(snapshot);
    return collection;
  };

  const fetchEspecialidades = async () => {
    const userReference = db.collection("especialidades");
    const snapshot = await userReference.get();
    if (!snapshot.size) return null;
    const listaAreas = getElementArrayCollection(snapshot);
    setAreas(listaAreas);
  };

  const handleOnchange = (event) => {
    setValue(event.target.value.toLowerCase());
  };

  const searchingTerm = (value) => {
    return function (x) {
      return (
        x.name.toLowerCase().includes(value)

      );
    };
  };

  const handleOnchangeB = (event) => {
    setValueB(event.target.value.toLowerCase());
  };

  const searchingTermB = (value) => {
    return function (x) {
      return (
        x.name.toLowerCase().includes(value)

      );
    };
  };

  return (
    <div className={styles.container}>
      <div className={styles.boxAdmin}>
        <div className={styles.firstText}>
          <div className={styles.boxTitle}>
            <h1 className={styles.title}>Pendientes</h1>
            <input
              name="search"
              className={styles.input}
              type="text"
              placeholder="Buscar..."
              onChange={handleOnchange}
            />
          </div>
        </div>

        <div className={styles.list}>
          
            {pendientes.filter(searchingTerm(value)).map((pendiente) => (
                  <CardAdmin
                    key={pendiente.id}
                    id={pendiente.id}
                    name={pendiente.name}
                    pais={pendiente.pais}
                    photo={pendiente.photo}
                    pdf={pendiente.pdf}
                  />
                ))}
        </div>
      </div>
      <div className={styles.boxAdmin}>
        <div className={styles.firstText}>
          <div className={styles.boxTitle}>
            <h1 className={styles.title}>Rechazados</h1>
            <input
              name="search"
              className={styles.input}
              type="text"
              placeholder="Buscar..."
              onChange={handleOnchangeB}
            />
          </div>
        </div>

        <div className={styles.list}>
          
            {rechazados.filter(searchingTermB(valueB)).map((rechazado) => (
                  <CardAdmin
                    key={rechazado.id}
                    id={rechazado.id}
                    name={rechazado.name}
                    pais={rechazado.pais}
                    photo={rechazado.photo}
                    pdf={rechazado.pdf}
                  />
                ))}
        </div>
      </div>
      <div className={styles.boxAdmin}>
        <div className={styles.firstText}>  
          <div className={styles.boxTitle}>
            <h1 className={styles.title}>Agregar especialidad</h1>
          </div>

          
          <div className={styles.inputAgg}>

            <input
              id="especialidad"
              className={styles.agg}
              type="text"
              placeholder="Especialidad..."
            /> 

            <button className={styles.continue} id="boton" onClick={aggEspecialidad}> Agregar </button>
            <button className={styles.continue} id="boton" onClick={cargar}> Cargar </button>


          </div>
        </div>
        <div className={styles.seleccion}>
            {!!areas &&
              areas.map((area) => (
                <div>
                  <label className={styles.checklabel}>
                    {area.especialidad}
                  </label>
                </div>
              ))}
          </div>
      </div>
        

    </div>
  );
};

export default Admin;