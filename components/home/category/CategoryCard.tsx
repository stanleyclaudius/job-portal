interface IProps {
  title: string
  total: number
  image: string
}

const CategoryCard = ({ title, total, image }: IProps) => {
  return (
    <div className='bg-white p-7 flex gap-4'>
      <div className='w-12 h-12 rounded-md shrink-0'>
        <img src={image} alt={title} />
      </div>
      <div>
        <h2 className='font-medium'>{title}</h2>
        <p className='mt-2 text-xs text-gray-500'>{total} {total > 1 ? 'jobs' :'job'} available</p>
      </div>
    </div>
  )
}

export default CategoryCard