import ReviewCard from './ReviewCard'

const ReviewContainer = () => {
  return (
    <div className='md:pt-16 pt-10 pb-20 md:px-0 px-10'>
      <h1 style={{ lineHeight: '65px' }} className='md:text-4xl text-2xl font-medium text-center mb-12'><span className='text-[#504ED7]'>Reviews</span> of People Who Have <br className='md:block hidden' /> Found Jobs Through Job Seek</h1>
      <ReviewCard
        review='Job Seek platform really helpful to find jobs that suitable for me.'
        name='Wade Warren'
        position='Software Engineer'
        organization='Neo Borngo'
      />
    </div>
  )
}

export default ReviewContainer