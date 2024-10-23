import Logo from "../../assets/empower.svg";
import styles from "./styles.module.css";

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.lockup}>
        <img src={Logo} alt="Empower" />
        <p className="display-2"> Spend Tracker v0.1</p>
      </div>
      <p className="display-1"> Welcome Dallas</p>
    </header>
  );
};

export default Header;
