import { Link } from "react-router-dom";
import styles from "./Login.module.css";

function Login() {
  return (
    <div className={styles.login}>
      <section>
        <h1>Login Page</h1>

        <Link to="/weather" className="cta">
          Confirm Form
        </Link>
      </section>
    </div>
  );
}

export default Login;
