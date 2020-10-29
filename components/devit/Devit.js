import Avatar from "../avatar/Avatar"
import styles from "../../styles/Devit.module.css"
import useTimeAgo from "../../hooks/useTimeAgo"
import Link from "next/link"
import { useRouter } from "next/router"
import useDateTimeFormat from "../../hooks/useDateTimeFormat"

export default function Devit({
  avatar,
  userName,
  id,
  img,
  content,
  createdAt,
}) {
  const timeago = useTimeAgo(createdAt)
  const createdAtFormated = useDateTimeFormat(createdAt)
  const router = useRouter()

  const handleArticleClick = (e) => {
    e.preventDefault()
    router.push(`/status/${id}`)
  }
  return (
    <>
      <article onClick={handleArticleClick} className={styles.article}>
        <div className={styles.avatar}>
          <Avatar src={avatar} alt={userName} />
        </div>

        <div className={styles.textBox}>
          <header>
            <strong>{userName}</strong>
            <span> · </span>
            <Link href={`/status/${id}`}>
              <a className={styles.time}>
                <time title={createdAtFormated} className={styles.date}>
                  {timeago}
                </time>
              </a>
            </Link>
          </header>
          <p>{content}</p>
          {img && (
            <img className={styles.img} src={img} alt="imagen de devit" />
          )}
        </div>
      </article>
    </>
  )
}
