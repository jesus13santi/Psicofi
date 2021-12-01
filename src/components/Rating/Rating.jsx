import styles from "./Rating.module.css";
import emptyStar from "../../img/EmptyStar.png";

const Rating = () => {
    return (
        <div className={styles.container}>
            <h3>Califica a tu Psicólogo</h3>
            <p>Cuéntanos qué tal tu cita:</p>
            <div>
                <img src={emptyStar} alt="star1" className={styles.img}></img>
                <img src={emptyStar} alt="star2" className={styles.img}></img>
                <img src={emptyStar} alt="star3" className={styles.img}></img>
                <img src={emptyStar} alt="star4" className={styles.img}></img>
                <img src={emptyStar} alt="star5" className={styles.img}></img>
            </div>
        </div>
    )
}

export default Rating;
