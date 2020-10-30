import { useEffect, useState } from "react"
import Devit from "../components/devit/Devit"
import { listenLatestDevits } from "../firebase/client"
import useUser from "../hooks/useUser"
import styles from "../styles/HomePage.module.css"
import Link from "next/link"
import Create from "../components/icons/Create"
import Home from "../components/icons/Home"
import Search from "../components/icons/Search"
import Head from "next/head"

export default function HomePage() {
  const [timeline, setTimeline] = useState([])
  const user = useUser()

  useEffect(() => {
    // user &&
    //   fetchLatestDevits().then((timeline) => {
    //     setTimeline(timeline)
    //   })
    let unsubscribe
    if (user) {
      unsubscribe = listenLatestDevits((newDevits) => {
        setTimeline(newDevits)
      })
    }

    return () => unsubscribe && unsubscribe()
  }, [user])

  return (
    <>
      <Head>
        <title>Inicio / Devter</title>
      </Head>

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
              img={devit.img}
              avatar={devit.avatar}
              userName={devit.userName}
              content={devit.content}
              userId={devit.userId}
            />
          )
        })}
      </section>
      <nav className={styles.nav}>
        <Link href="/">
          <a>
            <Home width={32} height={32} stroke="#09f" />
          </a>
        </Link>
        <Link href="/search">
          <a>
            <Search width={32} height={32} stroke="#09f" />
          </a>
        </Link>
        <Link href="/compose/tweet">
          <a>
            <Create width={32} height={32} stroke="#09f" />
          </a>
        </Link>
      </nav>
      {/* </main>
      </div> */}
    </>
  )
}
