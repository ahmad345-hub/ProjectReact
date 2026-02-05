import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <Link to="/">KASHOP</Link>
      </div>

      <ul className={styles.navLinks}>
        <li>
          <Link to="/">Home</Link>
        </li>

        <li>
          <Link to="/products">
            Product <span className={styles.arrow}>▾</span>
          </Link>
        </li>
        <li className={styles.dropdown}>
  <span className={styles.dropBtn}>
    Other <span className={styles.arrow}>▾</span>
  </span>

  <ul className={styles.dropdownMenu}>
    <li>
      <Link to="/login">Login</Link>
    </li>
    <li>
      <Link to="/register">Register</Link>
    </li>
  </ul>
</li>

        
        <li>
          <Link to="/contact">Contact Us</Link>
        </li>
      </ul>

      <div className={styles.navIcons}>
        <Link to="/search" className={styles.icon}>🔍</Link>
        <Link to="/account" className={styles.icon}>👤</Link>
        <Link to="/cart" className={`${styles.icon} ${styles.cart}`}>
          👜
          <span className={styles.badge}>2</span>
        </Link>
      </div>
    </nav>
  );
}
