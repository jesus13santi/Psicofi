import { useState, useContext } from "react";
import { useParams } from "react-router-dom";
import styles from "./PsicoRating.module.css";
import { UserContext } from "../../context/UserContext";
import { Rating } from 'react-simple-star-rating';
import { db } from "../../utils/firebaseConfig";
import swal from 'sweetalert';
import { values } from "lodash";

const PsicoRating = () => {

    const [ ratingValue, setRatingValue ] = useState(0);
    const [ values, setValues ] = useState({
        incidencias: ""
    });
    const { user } = useContext(UserContext);
    const [ canRate, setCanRate ] = useState(true);
    const params = useParams();
    const id = params.chatId;

    const handleOnChange = (event) => {
        const { value, name: inputName } = event.target;
        console.log({ inputName, value });
        setValues({ ...values, [inputName]: value });
      };

    const handleRating = (rate) => {
        setRatingValue(rate/20);
      }

    const submitRating = async () => {

        const cita = user.appointments.find(
            (element) => element.id == id
        );
        const psy = cita.uid; // ID del psicologo
        if (ratingValue > 0 && canRate) {
            const newRating = ratingValue;
            const temp = await db.collection("users").doc(psy).get();
            const p = temp.data();
            const q = p.ratings;
            var aux = [];
            if (!!q) { aux = [...q]; }
            aux.push(newRating);
            await db.collection("users").doc(psy).update(
                {
                    ratings: aux
                }
            )
            closeRating();  
            swal("Muchas gracias!", "Tu opinión es muy importante para nosotros", "success");
        }
    }

    const closeRating = () => {
        setCanRate(false);
    }

    return (
        <>
            {canRate ? (
                <div className={styles.container}>
                    <h3>Califica a tu Psicólogo</h3>
                    <p>Cuéntanos qué tal tu cita:</p>
                    <div>
                        <Rating
                        transition
                        onClick={handleRating}
                        ratingValue={ratingValue}
                        fillColor={"522B59"}
                        className={styles.rting}
                        />
                    </div>

                    <input
                    placeholder="Comentarios adicionales..."
                    name="incidencias"
                    id={styles.input}
                    className={styles.input}
                    value={values.incidencias}
                    onChange={handleOnChange}
                    />

                    <button
                    type="button"
                    className={styles.button}
                    onClick={submitRating}
                    type="button">
                    Calificar
                    </button>
                    <button
                    type="button"
                    className={styles.close}
                    onClick={closeRating}>
                    </button>
                </div>
            ) : (
                <>
                </>
            )}
        </>
    )
}

export default PsicoRating;
