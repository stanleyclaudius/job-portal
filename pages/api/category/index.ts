import { NextApiRequest, NextApiResponse } from 'next'
import { authorizeRoles, isAuthenticated } from './../../../middlewares/auth'
import Category from './../../../models/Category'
import connectDB from './../../../libs/db'

const handler = async(req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case 'POST':
      const user = await isAuthenticated(req, res)
        if (!user) return
        
      const isAuthorize = await authorizeRoles(user._id, res, 'admin')
        if (!isAuthorize) return

      const { name, image } = req.body
      if (!name || !image)
        return res.status(400).json({ msg: 'Please provide category name and image.' })

      const findCategory = await Category.findOne({ name })
      if (findCategory)
        return res.status(400).json({ msg: `${name} category already exists.` })
        
      const newCategory = new Category({ name, image })
      await newCategory.save()

      return res.status(200).json({
        msg: `${name} category has been created successfully.`,
        category: newCategory
      })
    case 'GET':
      const categories = await Category.find().sort('-createdAt')
      return res.status(200).json({ categories })
    default:
      return res.status(405).json({ msg: `${req.method} method is not alloewd for this endpoint.` })
  }
}

export default connectDB(handler)