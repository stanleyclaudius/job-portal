interface IProps {
  title: string
  total: number
}

const CategoryCard = ({ title, total }: IProps) => {
  return (
    <div className='bg-white p-7 flex gap-4 cursor-pointer'>
      <div className='w-12 h-12 rounded-md bg-gray-200 shrink-0'></div>
      <div>
        <h2 className='font-medium'>{title}</h2>
        <p className='mt-2 text-xs text-gray-500'>{total} jobs available</p>
      </div>
    </div>
  )
}

export default CategoryCard