import { ReactNode } from 'react'
import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import rootReducer from './reducers'

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
)

interface IProps {
  children: ReactNode
}

const DataProvider = ({ children }: IProps) => {
  return (
    <Provider store={store}>
      {children}
    </Provider> 
  )
}

export default DataProvider