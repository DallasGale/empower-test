import Logo from "../../assets/empower.svg";
import styles from "./styles.module.css";

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.lockup}>
        <img src={Logo} alt="Empower" />
        <p className="display-4"> Spend Tracker v0.1</p>
      </div>
      <p className="display-4"> Welcome Tim</p>
    </header>
  );
};

export default Header;
