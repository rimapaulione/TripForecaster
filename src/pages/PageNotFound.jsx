import styles from "./PageNotFound.module.css";
import { useMoveBack } from "../hooks/useMoveBack";
import BackButton from "../ui/BackButton";

function PageNotFound() {
  const moveBack = useMoveBack();
  return (
    <div className={styles.notFound}>
      <h1> The page you are looking for could not be found 😢</h1>
      <BackButton onClick={moveBack} type="back">
        &larr; Go back
      </BackButton>
    </div>
  );
}

export default PageNotFound;
