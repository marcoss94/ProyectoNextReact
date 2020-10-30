import { firestore } from "../../firebase/admin"
import Head from "next/head"
import Devit from "../../components/devit/Devit"

export default function DevitPage(props) {
  //   console.log(props)
  return (
    <>
      <Head>
        <title>Inicio / Devter</title>
      </Head>
      <Devit {...props} />
    </>
  )
}

export async function getStaticPaths() {
  return {
    paths: [{ params: { id: "SCnjdqT3pEFvpxoy5Qtl" } }],
    fallback: true,
  }
}

export async function getStaticProps(context) {
  const { params } = context
  const { id } = params

  return firestore
    .collection("devit")
    .doc(id)
    .get()
    .then((doc) => {
      const data = doc.data()
      const id = doc.id
      const { createdAt } = data

      const props = {
        ...data,
        id,
        createdAt: +createdAt.toDate(),
      }
      return { props }
    })
    .catch(() => {
      return { props: {} }
    })
}

// DevitPage.getInitialProps = (context) => {
//   const { query, res } = context
//   const { id } = query

//   return fetch(`http://localhost:3000/api/devits/${id}`).then((apiResponse) => {
//     if (apiResponse.ok) return apiResponse.json()
//     if (res) {
//       res.writeHead(301, { Location: "/" }).end()
//     }
//   })
// }
