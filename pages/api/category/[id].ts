import { NextApiRequest, NextApiResponse } from 'next'
import { authorizeRoles, isAuthenticated } from './../../../middlewares/auth'
import connectDB from './../../../libs/db'
import Category from './../../../models/Category'

const handler = async(req: NextApiRequest, res: NextApiResponse) => {
  const user = await isAuthenticated(req, res)
  if (!user) return

  const isAuthorize = await authorizeRoles(user._id, res, 'admin')
  if (!isAuthorize) return
  
  const categoryId = req.query.id
  const findCategory = await Category.findById(categoryId)
  if (!findCategory)
    return res.status(404).json({ msg: `Category with ID ${categoryId} not found.` })

  switch (req.method) {
    case 'PATCH':
      const { name, image } = req.body
      if (!name || !image)
        return res.status(400).json({ msg: 'Please provide category name and image.' })

      const updatedCategory = await Category.findOneAndUpdate({ _id: categoryId }, { name, image }, { new: true })

      return res.status(200).json({
        msg: 'Category has been updated successfully.',
        category: updatedCategory
      })
    case 'DELETE':
      await Category.findOneAndDelete({ _id: categoryId })
      return res.status(200).json({ msg: 'Category has been deleted successfully.' })
    default:
      return res.status(405).json({ msg: `${req.method} method is not allowed for this endpoint` })
  }
}

export default connectDB(handler)