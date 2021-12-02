import React from 'react'
import styles from "./Reload.module.css";

const handleRefresh = () => {
    // by calling this method react re-renders the component
    this.setState({});
  };

const Reload = () => {
    return (
        <button classname={styles.reloadButton} onClick={this.handleRefresh}>
            Refrescar
        </button>
    )
}

export default Reload
