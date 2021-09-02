import logo from "../../img/logo.png";
import styles from "./index.module.scss";

const Loading = () => {
  return (
    <div className={styles.container}>
      <img className={styles.appLogo} src={logo} alt="Loading" />
    </div>
  );
};

export default Loading;
