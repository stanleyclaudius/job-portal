import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { ToastContainer, toast } from 'react-toastify'
import { RootStore } from './../../utils/Interface';
import 'react-toastify/dist/ReactToastify.css';

const Alert = () => {
  const { alert } = useSelector((state: RootStore) => state)

  useEffect(() => {
    if (alert.error) {
      toast.error(alert.error)
    } else if (alert.success) {
      toast.success(alert.success)
    }
  }, [alert])

  return (
    <div>
      <ToastContainer />
    </div>
  )
}

export default Alert