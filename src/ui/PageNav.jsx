import { NavLink, useLocation } from "react-router-dom";
import Logo from "./Logo";
import styles from "./PageNav.module.css";
import BackButton from "./BackButton";

function PageNav() {
  const url = useLocation();

  return (
    <nav className={styles.nav}>
      <Logo />

      <ul>
        <li>
          <NavLink to="/weather">Weather</NavLink>
        </li>

        <li>
          {url.pathname === "/forecast" ? (
            <BackButton></BackButton>
          ) : (
            <NavLink to="/" className={styles.ctaLink}>
              Login
            </NavLink>
          )}
        </li>
      </ul>
    </nav>
  );
}

export default PageNav;
