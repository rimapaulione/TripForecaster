import styles from "./Error.module.css";

function Error({ error }) {
  return (
    <div className={styles.error}>
      <h1>Something went wrong 😢</h1>
      <p>{error}</p>
    </div>
  );
}

export default Error;
