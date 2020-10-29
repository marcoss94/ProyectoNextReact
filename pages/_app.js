import "../styles/globals.css"

function MyApp({ Component, pageProps }) {
  return (
    <>
      <div className="contenedor">
        <main className="main">
          <Component {...pageProps} />
        </main>
      </div>
    </>
  )
}

export default MyApp
