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

const mapUserFromFirebaseAuthToUser = (user) => {
  const { displayName, photoURL, email } = user

  return {
    avatar: photoURL,
    username: displayName,
    email,
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
