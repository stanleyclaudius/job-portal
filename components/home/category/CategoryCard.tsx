import Image from 'next/image'
import Logo from './../../../public/images/logo.png'

interface IProps {
  title: string
  total: number
}

const CategoryCard = ({ title, total }: IProps) => {
  return (
    <div className='bg-white p-7 flex gap-4'>
      <div className='w-12 h-12 rounded-md shrink-0'>
        <Image src={Logo} alt={title} />
      </div>
      <div>
        <h2 className='font-medium'>{title}</h2>
        <p className='mt-2 text-xs text-gray-500'>{total} jobs available</p>
      </div>
    </div>
  )
}

export default CategoryCard