import { useEffect } from 'react'
import { GetServerSideProps } from 'next'
import { useDispatch } from 'react-redux'
import { useRouter } from 'next/router'
import { AppDispatch } from './../../redux/store'
import axios from 'axios'

interface IProps {
  success?: string
  error?: string
}

const ActivateAccount = ({ success, error }: IProps) => {
  const dispatch = useDispatch<AppDispatch>()

  const router = useRouter()

  useEffect(() => {
    if (success) {
      dispatch({
        type: 'alert/alert',
        payload: { success: success }
      })
    } else if(error) {
      dispatch({
        type: 'alert/alert',
        payload: { error: error }
      })
    }

    router.push('/login')
  }, [dispatch, router, error, success])

  return (
    <></>
  )
}

export default ActivateAccount

export const getServerSideProps: GetServerSideProps = async(context) => {
  try {
    const res = await axios.post(`${process.env.CLIENT_URL}/api/auth/activate`, {
      token: context.query.id
    })

    const msg = res.data.msg

    return {
      props: {
        success: msg
      }
    }
  } catch (err: any) {
    return {
      props: {
        error: err.response.data.msg
      }
    }
  }
}