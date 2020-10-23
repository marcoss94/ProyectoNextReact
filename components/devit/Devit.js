import Avatar from "../avatar/Avatar"
import styles from "../../styles/Devit.module.css"
import useTimeAgo from "../../hooks/useTimeAgo"

export default function Devit({ avatar, userName, id, content, createdAt }) {
  const timeago = useTimeAgo(createdAt)
  return (
    <>
      <article className={styles.article}>
        <div className={styles.avatar}>
          <Avatar src={avatar} alt={userName} />
        </div>

        <div className={styles.textBox}>
          <header>
            <strong>{userName}</strong>
            <span> · </span>
            <date className={styles.date}>{timeago}</date>
          </header>
          <p>{content}</p>
        </div>
      </article>
    </>
  )
}
