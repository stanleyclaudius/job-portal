const JobCard = () => {
  return (
    <div className='bg-[#FAFAFD] rounded-md py-5 px-6'>
      <div className='flex items-center justify-between mb-4'>
        <div className='w-14 h-14 rounded-full bg-gray-300'></div>
        <p className='text-gray-400 text-sm font-medium'>7 July</p>
      </div>
      <h1 className='font-medium text-lg'>UX Designer</h1>
      <div className='flex items-center gap-2 text-xs mt-3'>
        <p className='rounded-full px-2 py-1 bg-purple-200 text-purple-700'>Full time</p>
        <p className='rounded-full px-2 py-1 bg-green-200 text-green-700'>Flex sched.</p>
        <p className='rounded-full px-2 py-1 bg-blue-200 text-blue-700'>Mid lvl</p>
      </div>
      <p className='font-medium text-sm my-3'>Cupertino, California</p>
      <p className='text-gray-500 text-xs leading-relaxed text-justify'>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Blanditiis, repellendus?
      </p>
      <div className='flex gap-5 mt-5'>
        <button className='bg-[#504ED7] hover:bg-[#2825C2] transition-[background] text-sm text-white py-2 rounded-lg flex-1'>Apply</button>
        <button className='border border-black text-sm rounded-lg py-2 flex-1'>Contacts</button>
      </div>
    </div>
  )
}

export default JobCard