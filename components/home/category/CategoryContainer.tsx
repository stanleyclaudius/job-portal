import { ICategories } from './../../../pages'
import CategoryCard from './CategoryCard'

interface IProps {
  categories: ICategories[]
}

const CategoryContainer = ({ categories }: IProps) => {
  return (
    <div className='bg-gray-100 py-20 md:px-16 px-8'>
      <h1 style={{ lineHeight: '65px' }} className='md:text-4xl text-3xl font-medium text-center mb-10'>One Platform <br className='hidden md:block' /> Many <span className='text-[#504ED7]'>Solutions</span></h1>
      <div className='grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-10'>
        {
          categories.map(item => (
            <CategoryCard
              key={item._id}
              title={item.name}
              total={item.count}
              image={item.image}
            />
          ))
        }
      </div>
    </div>
  )
}

export default CategoryContainer