interface IProps {
  organization: string
  province: string
  city: string
  title: string
  type: string
  description: string
  salary: number
  salaryType: string
}

const JobCard = ({
  organization,
  province,
  city,
  title,
  type,
  description,
  salary,
  salaryType
}: IProps) => {
  return (
    <div className='border border-gray-200 shadow-md p-5'>
      <div className='flex items-center gap-2'>
        <div className='w-12 h-12 rounded-md bg-gray-200 shrink-0'></div>
        <div>
          <h1 className='font-medium'>{organization}</h1>
          <p className='mt-2 text-xs text-gray-500'>{province}, {city}</p>
        </div>
      </div>
      <div className='mb-10 mt-6'>
        <h1 className='font-semibold text-xl'>{title}</h1>
        <p className='font-medium text-gray-500 text-sm mt-1'>{type}</p>
        <p className='mt-3 text-gray-400 text-sm'>{description}</p>
      </div>
      <div className='flex items-center justify-between'>
        <div className='flex items-center'>
          <p className='font-semibold text-xl'>{salary}</p>
          <sub className='text-xs text-gray-500 font-medium'>/{salaryType}</sub>
        </div>
        <button className='bg-[#F3DAFF] text-[#504ED7] text-sm font-medium p-3 rounded-md transition-all hover:bg-[#504ED7] hover:text-white'>Apply Now</button>
      </div>
    </div>
  )
}

export default JobCard