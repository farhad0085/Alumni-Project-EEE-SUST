import styles from './styles.module.scss'


const Spinner = () => {

  return (
    <div className={styles.loadingWrapper}>
      <span className={styles.spinner}></span>
    </div>
  )

}


export default Spinner