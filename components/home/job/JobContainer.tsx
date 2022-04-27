import Link from 'next/link'
import JobCard from './JobCard'

const JobContainer = () => {
  return (
    <div className='py-20 md:px-16 px-8'>
      <h1 className='text-4xl md:text-3xl font-medium text-center mb-12'><span className='text-[#504ED7]'>Latest</span> Jobs</h1>
      <div className='grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-10'>
        <JobCard
          organization='Microsoft'
          province='Jawa Tengah'
          city='Kebumen'
          description='Become lead UI designer at Microsoft HQ'
          title='Visual Designer'
          salary={20000}
          salaryType='month'
          type='Full-time'
        />
        <JobCard
          organization='Microsoft'
          province='Jawa Tengah'
          city='Kebumen'
          description='Become lead UI designer at Microsoft HQ'
          title='Visual Designer'
          salary={20000}
          salaryType='month'
          type='Full-time'
        />
        <JobCard
          organization='Microsoft'
          province='Jawa Tengah'
          city='Kebumen'
          description='Become lead UI designer at Microsoft HQ'
          title='Visual Designer'
          salary={20000}
          salaryType='month'
          type='Full-time'
        />
        <JobCard
          organization='Microsoft'
          province='Jawa Tengah'
          city='Kebumen'
          description='Become lead UI designer at Microsoft HQ'
          title='Visual Designer'
          salary={20000}
          salaryType='month'
          type='Full-time'
        />
        <JobCard
          organization='Microsoft'
          province='Jawa Tengah'
          city='Kebumen'
          description='Become lead UI designer at Microsoft HQ'
          title='Visual Designer'
          salary={20000}
          salaryType='month'
          type='Full-time'
        />
        <JobCard
          organization='Microsoft'
          province='Jawa Tengah'
          city='Kebumen'
          description='Become lead UI designer at Microsoft HQ'
          title='Visual Designer'
          salary={20000}
          salaryType='month'
          type='Full-time'
        />
        <JobCard
          organization='Microsoft'
          province='Jawa Tengah'
          city='Kebumen'
          description='Become lead UI designer at Microsoft HQ'
          title='Visual Designer'
          salary={20000}
          salaryType='month'
          type='Full-time'
        />
        <JobCard
          organization='Microsoft'
          province='Jawa Tengah'
          city='Kebumen'
          description='Become lead UI designer at Microsoft HQ'
          title='Visual Designer'
          salary={20000}
          salaryType='month'
          type='Full-time'
        />
      </div>
      <Link href='/'>
        <a className='bg-white m-auto block w-fit mt-20 px-10 py-2 border-2 rounded-full border-[#504ED7] text-[#504ED7]'>Find More Jobs</a>
      </Link>
    </div>
  )
}

export default JobContainer