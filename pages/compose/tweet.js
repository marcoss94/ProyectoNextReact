import { useEffect, useState } from "react"
import Button from "../../components/button/Button"
import useUser from "../../hooks/useUser"
import styles from "../../styles/Tweet.module.css"
import { addDevit, uploadImage } from "../../firebase/client"
import { useRouter } from "next/router"
import Head from "next/head"
import Avatar from "../../components/avatar/Avatar"

const COMPOSE_STATES = {
  USER_NOT_KNOW: 0,
  LOADING: 1,
  SUCCESS: 2,
  ERROR: -1,
}

const DRAG_IMAGE_STATE = {
  ERROR: -1,
  NONE: 0,
  DRAG_OVER: 1,
  UPLOADING: 2,
  COMPLETE: 3,
}

export default function ComposeTweet() {
  const user = useUser()
  const [message, setMessage] = useState("")
  const [status, setStatus] = useState(COMPOSE_STATES.USER_NOT_KNOW)

  const [drag, setDrag] = useState(DRAG_IMAGE_STATE.NONE)
  const [task, setTask] = useState(null)
  const [imgURL, setImgURL] = useState(null)

  const router = useRouter()

  useEffect(() => {
    if (task) {
      const onProgress = () => {}
      const onError = () => {}
      const onComplete = () => {
        console.log("onComplete")
        task.snapshot.ref.getDownloadURL().then(setImgURL)
      }
      task.on("state_changed", onProgress, onError, onComplete)
    }
  }, [task])

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
      img: imgURL,
    })
      .then(() => {
        router.push("/")
      })
      .catch((err) => {
        console.lor(err)
        setStatus(COMPOSE_STATES.ERROR)
      })
  }

  const handleDragEnter = (e) => {
    e.preventDefault()
    setDrag(DRAG_IMAGE_STATE.DRAG_OVER)
  }

  const handleDragLeave = (e) => {
    e.preventDefault()
    setDrag(DRAG_IMAGE_STATE.NONE)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setDrag(DRAG_IMAGE_STATE.NONE)
    const file = e.dataTransfer.files[0]
    const task = uploadImage(file)
    setTask(task)
  }

  const isButtonDisabled = !message.length || status === COMPOSE_STATES.LOADING

  return (
    <>
      <Head>
        <title>Crear Devit / Devter</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <section className={styles.form_container}>
        {user && (
          <section className={styles.avatar}>
            <Avatar src={user.avatar} />
          </section>
        )}

        <form onSubmit={handleSubmit}>
          <textarea
            onChange={handleChange}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`${styles.textarea} ${
              drag === DRAG_IMAGE_STATE.DRAG_OVER ? styles.drag : ""
            }`}
            placeholder="¿Qué esta pasando?"
          ></textarea>
          {imgURL && (
            <section className={styles.section}>
              <button
                className={styles.buttonX}
                onClick={() => setImgURL(null)}
              >
                x
              </button>
              <img className={styles.img} src={imgURL} alt="devit imagen" />
            </section>
          )}
          <div className={styles.button}>
            <Button disabled={isButtonDisabled}>Devitear</Button>
          </div>
        </form>
      </section>
    </>
  )
}
