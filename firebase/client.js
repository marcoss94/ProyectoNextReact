import * as firebase from "firebase"

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBFhVRZi-z7cteRPWx31ZMMkXigZHxkD9M",
  authDomain: "twitterclone-nextjs-b371a.firebaseapp.com",
  databaseURL: "https://twitterclone-nextjs-b371a.firebaseio.com",
  projectId: "twitterclone-nextjs-b371a",
  storageBucket: "twitterclone-nextjs-b371a.appspot.com",
  messagingSenderId: "889291010929",
  appId: "1:889291010929:web:5a9354442473a1f92cbcd0",
  measurementId: "G-DS8MYKW9VW",
}

!firebase.apps.length && firebase.initializeApp(firebaseConfig)

const db = firebase.firestore()

const mapUserFromFirebaseAuthToUser = (user) => {
  const { displayName, photoURL, email, uid } = user

  return {
    avatar: photoURL,
    username: displayName,
    email,
    uid,
  }
}

export const onAuthStateChanged = (onChange) => {
  return firebase.auth().onAuthStateChanged((user) => {
    const normalizedUser = user ? mapUserFromFirebaseAuthToUser(user) : null
    onChange(normalizedUser)
  })
}

export const loginWithGitHub = () => {
  const githubProvider = new firebase.auth.GithubAuthProvider()
  return firebase.auth().signInWithPopup(githubProvider)
}

export const addDevit = ({ avatar, content, img, userId, userName }) => {
  return db.collection("devit").add({
    avatar,
    content,
    img,
    userId,
    userName,
    createdAt: firebase.firestore.Timestamp.fromDate(new Date()),
    likeCount: 0,
    sharedCount: 0,
  })
}

export const mapDevitFromFirebaseToDevitObject = (doc) => {
  const data = doc.data()
  const id = doc.id
  const { createdAt } = data

  return {
    ...data,
    id,
    createdAt: +createdAt.toDate(),
  }
}

export const listenLatestDevits = (handleNewDevits) => {
  return db
    .collection("devit")
    .orderBy("createdAt", "desc")
    .limit(20)
    .onSnapshot(({ docs }) => {
      const newDevits = docs.map(mapDevitFromFirebaseToDevitObject)
      handleNewDevits(newDevits)
    })
}

export const fetchLatestDevits = () => {
  return db
    .collection("devit")
    .orderBy("createdAt", "desc")
    .get()
    .then((snapshot) => {
      return snapshot.docs.map((doc) => {
        return mapDevitFromFirebaseToDevitObject(doc)
      })
    })
}

export const uploadImage = (file) => {
  const ref = firebase.storage().ref(`/images/${file.name}`)
  const task = ref.put(file)
  return task
}
