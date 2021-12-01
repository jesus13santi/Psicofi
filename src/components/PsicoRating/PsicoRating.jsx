import { useState } from "react";
import styles from "./PsicoRating.module.css";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { Rating } from 'react-simple-star-rating';

const PsicoRating = () => {

    const [ ratingValue, setRatingValue ] = useState(0);

    const handleRating = (rate) => {
        setRatingValue(rate);
      }

    const submitRating = () => {

    }

    return (
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
            <button
            className={styles.button}
            onClick={submitRating}
            type="button">
            Calificar
            </button>
        </div>
    )
}

export default PsicoRating;

//<img src={emptyStar} alt="star1" className={styles.img} onMouseOver={}></img>
//<img src={emptyStar} alt="star2" className={styles.img} onMouseOver={}></img>
//<img src={emptyStar} alt="star3" className={styles.img} onMouseOver={}></img>
//<img src={emptyStar} alt="star4" className={styles.img} onMouseOver={}></img>
//<img src={emptyStar} alt="star5" className={styles.img} onMouseOver={}></img>
