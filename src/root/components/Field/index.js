
import styles from './index.module.scss'

const Field = ({...rest}) => {
    return(
        <input className={styles.input} type="text" {...rest} />
    )
}

export default Field;