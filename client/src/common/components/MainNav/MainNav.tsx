import styles from "./MainNav.module.css";

export const MainNav = () => {
  return (
    <nav className={styles.navContainer}>
      <div className={styles.brand}>WeatherMe</div>

      <ul className={styles.navList}>
        <li className={styles.navItem}>
          <a href="#" className={styles.navLink}>
            Today
          </a>
        </li>
        <li className={styles.navItem}>
          <a href="#" className={styles.navLink}>
            Tomorrow
          </a>
        </li>
        <li className={styles.navItem}>
          <a href="#" className={styles.navLink}>
            Monthly Forecast
          </a>
        </li>
      </ul>
    </nav>
  );
};
