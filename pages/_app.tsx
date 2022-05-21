import type { AppProps } from 'next/app'
import { ReactNode, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { refreshToken } from './../redux/slices/authSlice'
import DataProvider, { AppDispatch } from './../redux/store'
import Alert from './../components/general/Alert'
import UserDescriptionModal from './../components/modal/UserDescriptionModal'
import './../styles/globals.css'

interface IProps {
  children: ReactNode
}

const App = ({ children }: IProps) => {
  const dispatch = useDispatch<AppDispatch>()

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
