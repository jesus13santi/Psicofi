import React from 'react'
import PulseLoader from "react-spinners/PulseLoader";
import styles from "./Loading.module.css"

const Loading = () => {
    return (
        <div className= {styles.loading}>
            <div className= {styles.text}>Cargando</div>
            <PulseLoader color={"#763D80"} loading={true} size={25} css={styles.loading} />
        </div>
    )
}

export default Loading
