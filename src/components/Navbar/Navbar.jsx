import { Link } from "react-router-dom";
import { FiSearch, FiUser, FiShoppingBag } from "react-icons/fi";
import styles from "./Navbar.module.css";

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      {/* Logo */}
      <div className={styles.logo}>
        <Link to="/">KASHOP</Link>
      </div>

      {/* Middle Links */}
      <ul className={styles.navLinks}>
        <li>
          <Link to="/">Home</Link>
        </li>

        <li>
          <Link to="/products">
            Product <span className={styles.arrow}>▾</span>
          </Link>
        </li>

        {/* Dropdown */}
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

      {/* Right Icons */}
      <div className={styles.navIcons}>
        <Link to="/search" className={styles.icon}>
          <FiSearch />
        </Link>

        <Link to="/account" className={styles.icon}>
          <FiUser />
        </Link>

        <Link to="/cart" className={`${styles.icon} ${styles.cart}`}>
          <FiShoppingBag />
          <span className={styles.badge}>2</span>
        </Link>
      </div>
    </nav>
  );
}
