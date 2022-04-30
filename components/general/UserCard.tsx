const UserCard = () => {
  return (
    <div className='bg-white rounded-md border border-gray-200 shadow-md p-5 cursor-pointer hover:scale-105 transition-[transform]'>
      <div className='flex items-center gap-5'>
        <div className='w-16 h-16 rounded-full bg-gray-300'></div>
        <div>
          <h1 className='font-medium text-lg'>Lorem Ipsum</h1>
          <p className='text-sm text-gray-500 mt-2'>Joined at: 17 Mar 2022</p>
        </div>
      </div>
      <div className='flex items-center gap-2 mt-5'>
        <p className='bg-gray-200 rounded-full px-3 py-1 text-xs w-fit truncate'>Frontend Engineer</p>
        <p className='bg-gray-200 rounded-full px-3 py-1 text-xs w-fit truncate'>IT</p>
        <p className='bg-gray-200 rounded-full px-3 py-1 text-xs w-fit truncate'>Programmer</p>
        <p className='bg-gray-200 rounded-full px-3 py-1 text-xs w-fit truncate'>Software Engineer</p>
      </div>
      <p className='mt-6 text-sm text-gray-700'>Based at: West Java</p>
    </div>
  )
}

export default UserCard