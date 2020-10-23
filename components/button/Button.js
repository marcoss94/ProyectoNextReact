import styles from "../../styles/Home.module.css"

export default function Button({ children, onClick, disabled }) {
  return (
    <button
      className={styles.buttonLogin}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  )
}
