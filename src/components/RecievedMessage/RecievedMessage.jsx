import styles from './RecievedMessage.module.css'

function RecievedMessage({name, time, photo, msj}){
    return (
        <div className={styles.msjBox}>
            <div className={styles.content}>
                <div className={styles.header}>
                <picture className={styles.boxImg}>
                    <img src={photo} alt="" />
                </picture>
                    <div className = {styles.msjName}>{name}</div>
                </div>
                    <div className = {styles.message}>{msj}</div>
            </div>
            <div className = {styles.time}>{time}</div>
        </div>
    )
}

export default RecievedMessage