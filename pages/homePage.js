import { useEffect, useState } from "react"
import Devit from "../components/devit/Devit"
import styles from "../styles/HomePage.module.css"
export default function HomePage() {
  const [timeline, setTimeline] = useState([])

  useEffect(() => {
    fetch("http://localhost:3000/api/statuses/home_timeline")
      .then((res) => res.json())
      .then(setTimeline)
  }, [])

  return (
    <>
      <div className="contenedor">
        <main className="main">
          <header className={styles.header}>
            <h2>Home Page</h2>
          </header>
          <section className={styles.section}>
            {timeline.map((devit) => {
              return (
                <Devit
                  key={devit.id}
                  id={devit.id}
                  avatar={devit.avatar}
                  username={devit.username}
                  message={devit.message}
                />
              )
            })}
          </section>
          <nav className={styles.nav}> Nav</nav>
        </main>
      </div>
    </>
  )
}
