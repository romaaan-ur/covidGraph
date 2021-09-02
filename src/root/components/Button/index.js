import styles from "./index.module.scss";

const Button = ({ label, icon = false, ...rest }) => {
  return (
    <button {...rest} className={styles.btn}>
      {icon ? icon : label}
    </button>
  );
};

export default Button;
