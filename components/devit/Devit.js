import Avatar from "../avatar/Avatar"
import styles from "../../styles/Devit.module.css"

export default function Devit({ avatar, username, id, message }) {
  return (
    <>
      <article className={styles.article}>
        <div className={styles.avatar}>
          <Avatar src={avatar} alt={username} />
        </div>

        <div className={styles.textBox}>
          <strong>{username}</strong>
          <p>{message}</p>
        </div>
      </article>
    </>
  )
}
