import styles from "./Hpage.module.css";
import Vector from "../../img/Vector.png";
import Video from "../../img/mdi_video.png";
import Calendar from "../../img/mdi_calendar-blank.png";
import ArrowLarge from "../../img/ArrowLarge.png";
import ArrowSmall from "../../img/ArrowSmall.png";
import { useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import { db } from "../../utils/firebaseConfig";
import Footer from "../Footer/Footer";
import PulseLoader from "react-spinners/PulseLoader";

const Hpage = () => {
  const [psicologos, setPsicologos] = useState([]);
  const [psicologo, setPsicologo] = useState(null);
  const [precio, setPrecio] = useState("0");
  const [testi, setTesti] =useState(null);
  const [testis, setTestis]=useState([])
  const history = useHistory();
  

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
  const getElementArrayCollection = (snapshot) => {
    const collection = getArrayCollection(snapshot);
    return collection;
  };

  const fetchPsico = async () => {
    const userReference = db.collection("users");
    const snapshot = await userReference.where("role", "==", "Psicologo").get();
    if (!snapshot.size) return null;
    const listaPsico = getElementArrayCollection(snapshot);
    setPsicologos(listaPsico);
    setPsicologo(listaPsico[0])
    
    
  };
  
  const fetchTestimonios = async () => {
    const userReference = db.collection("testimonios");
    const snapshot = await userReference.get();
    if (!snapshot.size) return null;
    const listaPsico = getElementArrayCollection(snapshot);
    setTestis(listaPsico);
    setTesti(listaPsico[0]);
  };

  useEffect(() => {
    fetchPsico(); 
    fetchTestimonios();
  }, []);
  

  const psicologosAleatorios = () => {
    if (!!psicologos) {
      const item = psicologos[
        Math.floor(Math.random() * psicologos.length)
      ];
      setPsicologo(item);
    }
  };


  const handdleLoginOrRegister = () => {
    history.push("/login");
  };

  
  const handdlePrecio = () => {
    if (precio === "0") {
      setPrecio("1");
      return precio;
    } else if (precio === "1") {
      setPrecio("0");
      return precio;
    }
  };


  return (
    <div className={styles.container}>
      <div className={`${styles.pagesHome} ${styles.principalPage}`}>
        <div className={styles.leftSize}>
          <h1>Resuelve tus problemas con los mejores especialistas</h1>
          <button
            type="button"
            className={`${styles.button} ${styles.principalButton}`}
            onClick={handdleLoginOrRegister}
          >
            Empieza ahora
          </button>
        </div>
      </div>
      <div className={`${styles.pagesHome} ${styles.areaPage}`}>
        <div className={`${styles.whatIs} ${styles.box}`}>
          <h2 className={styles.title}>??Qu?? es PsicoFi?</h2>
          <p className={styles.info}>
            Somos una plataforma dedicada a la psicolog??a en l??nea, donde puedes
            conseguir sesiones s??ncronas con profesionales de cualquier parte
            del mundo, lo que abre la posibilidad de tener citas a cualquier
            hora y desde cualquier lugar.
          </p>
          <button
            type="button"
            className={`${styles.button} ${styles.btnWhatIs}`}
            onClick={handdleLoginOrRegister}
          >
            Empieza ahora
          </button>
        </div>

        <div className={`${styles.boxArea} ${styles.box}`}>
          <h2 className={styles.title}>Principales ??reas de atenci??n</h2>
          <div className={styles.areas}>
            <div className={styles.area}>Ansiedad</div>
            <div className={styles.area}>Estr??s</div>
            <div className={styles.area}>Autoestima</div>
            <div className={styles.area}>Problemas Amorosos</div>
            <div className={styles.area}>Sexualidad</div>
            <div className={styles.area}>Desarrollo personal</div>
          </div>
          <button
            type="button"
            className={styles.button}
            onClick={handdleLoginOrRegister}
          >
            Empezar
          </button>
        </div>
      </div>
      <div className={`${styles.pagesHome}`}>
        <div className={`${styles.function} ${styles.box}`}>
          <h2 className={styles.title}>??C??mo funcionan las sesiones online?</h2>
          <div className={styles.pasos}>
            <div className={styles.paso}>
              <picture className={styles.boxImg}>
                <img src={Vector} alt="" className={styles.img} />
              </picture>
              <p>Selecciona el psic??logo de tu preferencia</p>
            </div>
            <img src={ArrowLarge} alt="" className={styles.imgArrow} />
            <div className={styles.paso}>
              <picture className={styles.boxImg}>
                <img src={Calendar} alt="" className={styles.img} />
              </picture>
              <p>Agenda una cita seg??n tu disponibilidad</p>
            </div>
            <img src={ArrowLarge} alt="" className={styles.imgArrow} />
            <div className={`${styles.paso} ${styles.paso1}`}>
              <picture className={styles.boxImg}>
                <img src={Video} alt="" className={styles.img} />
              </picture>
              <p>
                Tu psic??logo te enviara por chat el link a la videollamada de la
                consulta
              </p>
            </div>
          </div>
          <button
            className={styles.button}
            type="button"
            onClick={handdleLoginOrRegister}
          >
            Quiero una cita
          </button>
        </div>
        <div className={`${styles.costo} ${styles.box}`} id="boxPrecios">
          <h2 className={styles.title}>??Cu??nto cuesta una sesi??n?</h2>
          <div className={styles.withArrow}>
            <div className={styles.boxCosto}>
              {/* {precio === "0" ? (
              //   <>
              //     <p className={styles.individual}>Cita Individual</p>
              //     <h1>$29.99 USD</h1>
              //   </>
              // ) : (
              //   <>
              //     <p className={styles.individual}>Cita Doble</p>
              //     <h1>$49.99 USD</h1>
              //   </>
              // )} */}
              <p className={styles.individual}>Cita Individual</p>
              <h1>$29.99 USD</h1>
              <p>1 hora de videollamada</p>
            </div>
            {/* <img
              src={ArrowSmall}
              alt=""
              onClick={handdlePrecio}
              className={styles.arrowSmall}
            /> */}
          </div>

          <button
            type="button"
            className={styles.button}
            onClick={handdleLoginOrRegister}
          >
            Comenzar
          </button>
        </div>
      </div>
      <div className={`${styles.pagesHome} ${styles.nuestroPsicoPage}`}>
        <div className={`${styles.box} ${styles.boxNuestrosPsico}`}>
          <h2 className={styles.title}>Nuestros Psic??logos</h2>
          <div className={styles.withArrow}>
            <div className={styles.psicologo}>
              {!!psicologo ? (
                <>
                  <picture className={styles.boxPhoto}>
                    <img src={psicologo.photo} alt="" />
                  </picture>
                  <div className={styles.infoPsico}>
                    <h2 className={styles.name}>{psicologo.name}</h2>
                    <div className={styles.valoracion}>
                      <p>
                        Valoraci??n:{" "}
                        {(
                          psicologo.ratings.reduce((a, b) => a + b, 0) /
                          psicologo.ratings.length
                        ).toFixed(1)}
                        ???
                      </p>
                    </div>
                    <p className={styles.especialidaesExtra}>
                      Especialidades:{" "}
                      {psicologo.problemas.toString().replace(/,/g, ", ")}
                    </p>
                    <p>Lugar de Residencia: {psicologo.pais}</p>
                    <button
                      className={styles.button}
                      onClick={handdleLoginOrRegister}
                    >
                      Agendar una cita
                    </button>
                  </div>
                </>
              ) : (
                <PulseLoader
                  color={"#763D80"}
                  loading={true}
                  size={20}
                  css={styles.loading}
                />
              )}
            </div>
            <img
              src={ArrowSmall}
              alt=""
              className={styles.arrowSmall}
              onClick={psicologosAleatorios}
            />
          </div>
        </div>
        <div
          className={`${styles.box} ${styles.boxClientesSatisfechos}`}
          id="boxTestimonios"
        >
          <h2 className={styles.title}>Clientes Satisfechos</h2>
          <div className={styles.withArrow}>
            <div className={styles.mensajeCliente}>
              {!!testi ? (
                <p>{testi.testimonio}</p>
              ) : (
                <PulseLoader
                  color={"#763D80"}
                  loading={true}
                  size={20}
                  css={styles.loading}
                />
              )}
              {/* <p>
                ???Muy recomendado el servicio. Nunca hab??a tenido terapia online
                antes y me pareci?? una experiencia genial.???
              </p> */}
            </div>
            <img src={ArrowSmall} alt="" className={styles.arrowSmall} />
          </div>
          <button
            type="button"
            className={`${styles.button} ${styles.btnQuiero}`}
            onClick={handdleLoginOrRegister}
          >
            Quiero formar parte
          </button>
        </div>
      </div>
      <div className={`${styles.pagesHome} ${styles.finPagina}`}>
        <div className={`${styles.psicoWork} ${styles.box}`}>
          <h2 className={styles.title}>Buscamos psic??logos</h2>
          <p>
            Si eres psic??logo cl??nico, te invitamos a formar parte de nuestra
            plataforma
          </p>
          <button
            type="button"
            className={styles.button}
            onClick={handdleLoginOrRegister}
          >
            Aplicar
          </button>
        </div>
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default Hpage;
