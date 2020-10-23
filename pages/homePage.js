import { useEffect, useState } from "react"
import Devit from "../components/devit/Devit"
import { fetchLatestDevits } from "../firebase/client"
import useUser from "../hooks/useUser"
import styles from "../styles/HomePage.module.css"

export default function HomePage() {
  const [timeline, setTimeline] = useState([])
  const user = useUser()

  useEffect(() => {
    user &&
      fetchLatestDevits().then((timeline) => {
        setTimeline(timeline)
      })
  }, [user])

  return (
    <>
      <div className="contenedor">
        <main className="main">
          <header className={styles.header}>
            <h2>Inicio</h2>
          </header>
          <section className={styles.section}>
            {timeline.map((devit) => {
              return (
                <Devit
                  key={devit.id}
                  createdAt={devit.createdAt}
                  id={devit.id}
                  avatar={devit.avatar}
                  userName={devit.userName}
                  content={devit.content}
                  userId={devit.userId}
                />
              )
            })}
          </section>
          <nav className={styles.nav}></nav>
        </main>
      </div>
    </>
  )
}
