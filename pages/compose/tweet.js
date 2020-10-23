import { useState } from "react"
import Button from "../../components/button/Button"
import useUser from "../../hooks/useUser"
import styles from "../../styles/Tweet.module.css"
import { addDevit } from "../../firebase/client"
import { useRouter } from "next/router"

const COMPOSE_STATES = {
  USER_NOT_KNOW: 0,
  LOADING: 1,
  SUCCESS: 2,
  ERROR: -1,
}

export default function ComposeTweet() {
  const user = useUser()
  const [message, setMessage] = useState("")
  const [status, setStatus] = useState(COMPOSE_STATES.USER_NOT_KNOW)
  const router = useRouter()

  const handleChange = (event) => {
    const { value } = event.target
    setMessage(value)
  }

  const handleSubmit = (event) => {
    setStatus(COMPOSE_STATES.LOADING)
    event.preventDefault()
    addDevit({
      avatar: user.avatar,
      content: message,
      userId: user.uid,
      userName: user.username,
    })
      .then(() => {
        router.push("/")
      })
      .catch((err) => {
        console.lor(err)
        setStatus(COMPOSE_STATES.ERROR)
      })
  }

  const isButtonDisabled = !message.length || status === COMPOSE_STATES.LOADING

  return (
    <>
      <div className="contenedor">
        <main className="main">
          <form onSubmit={handleSubmit}>
            <textarea
              onChange={handleChange}
              className={styles.textarea}
              placeholder="¿Qué esta pasando?"
            ></textarea>
            <div className={styles.button}>
              <Button disabled={isButtonDisabled}>Devitear</Button>
            </div>
          </form>
        </main>
      </div>
    </>
  )
}
