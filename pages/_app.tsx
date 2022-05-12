import type { AppProps } from 'next/app'
import { ReactNode, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import Alert from '../components/general/Alert'
import { refreshToken } from './../redux/actions/authActions'
import DataProvider from './../redux/store'
import './../styles/globals.css'

interface IProps {
  children: ReactNode
}

const App = ({ children }: IProps) => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(refreshToken())
  }, [dispatch])

  return (
    <>
      {children}
    </>
  )
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <DataProvider>
      <Alert />
      <App>
        <Component {...pageProps} />
      </App>
    </DataProvider>
  )
}

export default MyApp
