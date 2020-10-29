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

DevitPage.getInitialProps = (context) => {
  const { query, res } = context
  const { id } = query

  return fetch(`http://localhost:3000/api/devits/${id}`).then((apiResponse) => {
    if (apiResponse.ok) return apiResponse.json()
    if (res) {
      res.writeHead(301, { Location: "/" }).end()
    }
  })
}
