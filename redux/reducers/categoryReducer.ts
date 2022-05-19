import { GET_CATEGORY, ICategory, IGetCategoryAction } from './../types/categoryTypes'

const categoryReducer = (state: ICategory[] = [], action: IGetCategoryAction) => {
  switch (action.type) {
    case GET_CATEGORY:
      return action.payload
    default:
      return state
  }
}

export default categoryReducer