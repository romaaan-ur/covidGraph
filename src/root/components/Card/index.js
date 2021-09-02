
import styles from './index.module.scss'

const Card = (props) => {
  return <div className={styles.card}>{props.children}</div>;
};

export default Card;
