import { NavLink } from "react-router-dom";
import styles from "./SidebarNav.module.css";

function SidebarNav() {
  return (
    <nav className={styles.nav}>
      <ul>
        <li>
          <NavLink to="cities">Cities</NavLink>
        </li>
        <li>
          <NavLink to="forecast">forecast</NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default SidebarNav;
