import { NextApiRequest, NextApiResponse } from 'next'
import { authorizeRoles, isAuthenticated } from './../../../middlewares/auth'
import connectDB from './../../../libs/db'
import Category from './../../../models/Category'

const Pagination = (req: NextApiRequest) => {
  const page = Number(req.query.page) || 1
  const limit = Number(req.query.limit) || 6
  const skip = (page - 1) * limit
  return { page, skip, limit }
}

const handler = async(req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'GET')
    return res.status(405).json({ msg: `${req.method} method is not allowed for this endpoint.` })

  const user = await isAuthenticated(req, res)
  if (!user) return
  
  const isAuthorize = await authorizeRoles(user._id, res, 'admin')
  if (!isAuthorize) return

  const { skip, limit } = Pagination(req)

  const categories = await Category.find().sort('-createdAt').skip(skip).limit(limit)
  const totalCategories = await Category.countDocuments()

  let totalPage = 0
  if (categories.length === 0) totalPage = 0
  else {
    if (totalCategories % limit === 0) {
      totalPage = totalCategories / limit
    } else {
      totalPage = Math.floor(totalCategories / limit) + 1
    }
  }

  return res.status(200).json({ categories, totalPage })
}

export default connectDB(handler)