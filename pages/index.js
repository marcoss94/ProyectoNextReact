import Head from "next/head"
import Button from "../components/button/Button"
import GitHubSVG from "../components/icons/GitHub"
import styles from "../styles/Home.module.css"
import { loginWithGitHub, onAuthStateChanged } from "../firebase/client"
import { useEffect, useState } from "react"
import Avatar from "../components/avatar/Avatar"

export default function Home() {
  const [user, setUser] = useState(undefined)

  useEffect(() => {
    onAuthStateChanged(setUser)
  }, [])

  const handleClick = () => {
    loginWithGitHub()
      .then((user) => {
        setUser(user)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="contenedor">
        <main className="main">
          <div className={styles.header}>
            <img className={styles.img} src="/gorjeo.png" alt="logo" />
            <h1 className={styles.title}>Welcome to Devter</h1>
            <h2 className={styles.title}>
              Talk about development with developers
            </h2>

            <div>
              {user === null && (
                <Button onClick={handleClick}>
                  <GitHubSVG fill="white" width={24} height={24} />
                  Login with GitHub
                </Button>
              )}
              {user && user.avatar && (
                <div>
                  <Avatar
                    src={user.avatar}
                    alt={user.username}
                    text={user.username}
                  />
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
