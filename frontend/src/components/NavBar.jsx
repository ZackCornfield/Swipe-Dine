import { NavLink } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import styles from "./NavBar.module.css";

const NavBar = () => {
  return (
    <header className={styles["navbar"]}>
      <nav className={styles["nav-container"]}>
        <h1 className={styles["title"]}>Swipe n Dine</h1>
        <NavLink to="/" className={styles["nav-link"]}>
          Home
        </NavLink>
      </nav>
    </header>
  );
};

export default NavBar;
