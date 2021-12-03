import styles from "./Reload.module.css";

const handleRefresh = () => {
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
