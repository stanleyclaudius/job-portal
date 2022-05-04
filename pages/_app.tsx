import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import { store } from './../redux/store'
import Alert from './../components/general/Alert'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Alert />
      <Component {...pageProps} />
    </Provider>
  )
}

export default MyApp
