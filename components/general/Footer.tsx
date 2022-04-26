const Footer = () => {
  return (
    <div className='mb-5 mt-10 text-sm text-gray-500 px-10 flex items-center justify-between'>
      <p>Lorem Ipsum&copy; {new Date().getFullYear()}. All Rights Reserved.</p>
      <p className='hover:underline cursor-pointer'>Apply Job Process</p>
    </div>
  )
}

export default Footer