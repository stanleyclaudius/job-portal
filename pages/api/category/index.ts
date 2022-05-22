import { NextApiRequest, NextApiResponse } from 'next'
import { authorizeRoles, isAuthenticated } from './../../../middlewares/auth'
import Category from './../../../models/Category'
import connectDB from './../../../libs/db'

const handler = async(req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST')
    return res.status(405).json({ msg: `${req.method} method is not alloewd for this endpoint.` })
  
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
}

export default connectDB(handler)