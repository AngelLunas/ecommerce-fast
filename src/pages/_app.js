import '@/styles/globals.css'
import ComponentContext from 'Components/Context'

export default function App({ Component, pageProps }) {
  return (
    <>
    <ComponentContext>  
    <Component {...pageProps} />
    </ComponentContext>
    </>
  )
}
