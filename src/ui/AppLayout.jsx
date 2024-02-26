import { Outlet } from "react-router-dom";
import styles from "./AppLayout.module.css";
import PageNav from "./PageNav";

function AppLayout() {
  return (
    <div className={styles.layout}>
      <PageNav />
      <Outlet />
    </div>
  );
}

export default AppLayout;
