import Head from "next/head"
import Button from "../components/button/Button"
import GitHubSVG from "../components/icons/GitHub"
import styles from "../styles/Home.module.css"
import { loginWithGitHub } from "../firebase/client"
import { useEffect } from "react"
import { useRouter } from "next/router"
import useUser from "../hooks/useUser"

export default function Home() {
  const user = useUser()
  const router = useRouter()

  useEffect(() => {
    user && router.replace("/homePage")
  }, [user])

  const handleClick = () => {
    loginWithGitHub().catch((error) => {
      console.log(error)
    })
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Devter</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.header}>
        <img className={styles.img} src="/gorjeo.png" alt="logo" />
        <h1 className={styles.title}>Welcome to Devter</h1>
        <h2 className={styles.title}>Talk about development with developers</h2>

        <div>
          {user === null && (
            <Button onClick={handleClick}>
              <GitHubSVG fill="white" width={24} height={24} />
              Login with GitHub
            </Button>
          )}
          {user === undefined && <img src="/loading.gif" />}
        </div>
      </div>
    </div>
  )
}
