import { useEffect } from 'react'
import { GetServerSideProps } from 'next'
import { useDispatch } from 'react-redux'
import { useRouter } from 'next/router'
import { ALERT } from './../../redux/types/alertTypes'
import axios from 'axios'

interface IProps {
  success?: string
  error?: string
}

const ActivateAccount = ({ success, error }: IProps) => {
  const dispatch = useDispatch()

  const router = useRouter()

  useEffect(() => {
    if (success) {
      dispatch({
        type: ALERT,
        payload: { success: success }
      })
    } else if(error) {
      dispatch({
        type: ALERT,
        payload: { error: error }
      })
    }

    router.push('/login')
  }, [])

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