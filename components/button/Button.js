import styles from "../../styles/Home.module.css"

export default function Button({ children, onClick }) {
  return (
    <button className={styles.buttonLogin} onClick={onClick}>
      {children}
    </button>
  )
}
