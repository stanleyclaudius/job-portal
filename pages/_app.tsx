import type { AppProps } from 'next/app'
import { ReactNode, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { refreshToken } from './../redux/actions/authActions'
import DataProvider from './../redux/store'
import Alert from './../components/general/Alert'
import './../styles/globals.css'
import UserDescriptionModal from '../components/modal/UserDescriptionModal'

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
      <UserDescriptionModal />
      <App>
        <Component {...pageProps} />
      </App>
    </DataProvider>
  )
}

export default MyApp
