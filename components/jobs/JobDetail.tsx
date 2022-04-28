import { BsBookmark } from 'react-icons/bs'

const JobDetail = () => {
  return (
    <> 
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-5'>
          <div className='w-16 h-16 rounded-md bg-gray-200 shrink-0'></div>
          <div>
            <h1 className='text-[#504ED7] text-lg'>Recruitment Manager</h1>
            <p className='text-xs mt-2'>PT Orang Tua Group</p>
          </div>
        </div>
        <div className='flex items-center gap-7'>
          <BsBookmark className='cursor-pointer text-xl' />
          <button className='bg-[#504ED7] hover:bg-[#2825C2] outline-0 transition-[background] text-white rounded-md text-sm px-4 py-2'>Apply</button>
        </div>
      </div>
      <div className='mt-5'>
        <p className='font-medium mb-4'>Job Overview</p>
        <p className='text-sm leading-relaxed mb-3'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dignissimos, vel officiis. Necessitatibus, iusto quod fuga placeat aperiam quaerat illum optio facilis. Eum architecto nemo enim deserunt rerum impedit dolore dignissimos, excepturi, inventore saepe eligendi earum!</p>
        <p className='text-sm leading-relaxed mb-7'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur eos explicabo temporibus tempora unde tenetur accusantium quia cumque ullam autem aperiam odio, ipsa totam quod minima dolores! Delectus error dolor quibusdam eius sequi nulla ipsam.</p>
        <p className='font-medium mb-4'>Skills and Expertise</p>
        <div className='flex items-center gap-3 mb-7'>
          <p className='bg-gray-200 text-gray-600 text-xs px-3 py-2 rounded-full'>Management</p>
          <p className='bg-gray-200 text-gray-600 text-xs px-3 py-2 rounded-full'>UX Design</p>
          <p className='bg-gray-200 text-gray-600 text-xs px-3 py-2 rounded-full'>UI Design</p>
        </div>
        <p className='font-medium mb-4'>Requirements</p>
        <ul className='mb-7 list-disc ml-5'>
          <li>HTML</li>
          <li>CSS</li>
          <li>Javascipt</li>
        </ul>
        <p className='font-medium mb-4'>Salary</p>
        <div className='flex items-center mb-7'>
          <p className='font-semibold text-lg'>20000</p>
          <p className='text-gray-500 text-xs'>/month</p>
        </div>
        <p className='font-medium mb-4'>Company Overview</p>
        <p className='text-sm leading-relaxed mb-3'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores illo fugit mollitia! Quidem, dignissimos magnam sed pariatur asperiores, velit ex quos ad possimus itaque nobis nemo optio at? Quia quod molestiae illo commodi expedita exercitationem.</p>
        <p className='text-sm leading-relaxed mb-7'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores illo fugit mollitia! Quidem, dignissimos magnam sed pariatur asperiores, velit ex quos ad possimus itaque nobis nemo optio at? Quia quod molestiae illo commodi expedita exercitationem.</p>
        <p className='font-medium mb-4'>Company Location</p>
        <p className='mb-7 text-sm leading-realxed'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores, tempore.</p>
        <p className='font-medium mb-4'>Estimated Company Total Employee</p>
        <p>25-30 people</p>
      </div>
    </>
  )
}

export default JobDetail