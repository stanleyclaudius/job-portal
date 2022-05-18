export const CREATE_CATEGORY = 'CREATE_CATEGORY'
export const GET_ADMIN_CATEGORY = 'GET_ADMIN_CATEGORY'
export const GET_CATEGORY = 'GET_CATEGORY'

export interface ICategory {
  _id?: string
  name: string
  image: string | File[]
}

export interface IAdminCategory {
  data: ICategory[]
  totalPage: number
}

export interface ICreateCategoryAction {
  type: typeof CREATE_CATEGORY
  payload: ICategory
}

export interface IGetCategoryAction {
  type: typeof GET_CATEGORY
  payload: ICategory[]
}

export interface IGetAdminCategoryAction {
  type: typeof GET_ADMIN_CATEGORY
  payload: IAdminCategory
}