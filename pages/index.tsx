import Navbar from './../components/general/Navbar'
import Footer from './../components/general/Footer'
import Head from 'next/head'
import { AiOutlineSearch } from 'react-icons/ai'
import { IoLocation } from 'react-icons/io5'
import CategoryCard from '../components/home/CategoryCard'
import JobCard from '../components/home/JobCard'
import Link from 'next/link'
import ReviewCard from './../components/home/review/ReviewCard'
import Avatar from './../components/home/review/Avatar'

const Home = () => {
  return (
    <>
      <Head>
        <title>Job Seek | Home</title>
      </Head>
      <Navbar />
      <div>
        <div className='pb-20 pt-14'>
          <h1 className='text-5xl text-center font-medium mb-7 leading-relaxed'>Get The <span className='text-[#504ED7]'>Right Job</span> <br /> You Deserve</h1>
          <p className='text-gray-400 text-sm text-center'>1,850,750 jobs listed here! Your dream job is waiting</p>
          <div className='w-full max-w-[800px] m-auto bg-white shadow-xl border border-gray-200 rounded-full h-16 px-4 mt-12'>
            <form className='flex items-center h-full gap-3'>
              <div className='flex items-center gap-3'>
                <AiOutlineSearch className='text-xl text-gray-500' />
                <input type='text' placeholder='Job title or keyword' className='outline-0 h-full px-2 w-full text-sm' />
              </div>
              <div className='w-[1px] h-10 bg-gray-200'></div>
              <div className='flex items-center gap-3'>
                <IoLocation className='text-xl text-gray-500' />
                <input type='text' placeholder='Jawa Tengah' className='outline-0 h-full w-full text-sm' />
              </div>
              <button className='bg-[#504ED7] hover:bg-[#2825C2] transition-[background] text-white text-sm px-6 py-2 rounded-full outline-0'>Search</button>
            </form>
          </div>
        </div>
        <div className='bg-gray-100 py-20 px-16'>
          <h1 className='text-4xl font-medium leading-relaxed text-center mb-10'>One Platform <br /> Many <span className='text-[#504ED7]'>Solutions</span></h1>
          <div className='grid grid-cols-4 gap-10'>
            <CategoryCard
              title='Marketing & Communication'
              total={20}
            />
            <CategoryCard
              title='Marketing & Communication'
              total={20}
            />
            <CategoryCard
              title='Marketing & Communication'
              total={20}
            />
            <CategoryCard
              title='Marketing & Communication'
              total={20}
            />
            <CategoryCard
              title='Marketing & Communication'
              total={20}
            />
            <CategoryCard
              title='Marketing & Communication'
              total={20}
            />
            <CategoryCard
              title='Marketing & Communication'
              total={20}
            />
            <CategoryCard
              title='Marketing & Communication'
              total={20}
            />
          </div>
        </div>
        <div className='py-20 px-16'>
          <h1 className='text-4xl font-medium text-center mb-12'><span className='text-[#504ED7]'>Latest</span> Jobs</h1>
          <div className='grid grid-cols-4 gap-10'>
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
        <div className='pt-16 pb-20'>
          <h1 className='text-4xl font-medium text-center mb-12 leading-relaxed'><span className='text-[#504ED7]'>Reviews</span> of People Who Have <br /> Found Jobs Through Job Seek</h1>
          <ReviewCard
            review='Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ab ad obcaecati molestias iusto error repudiandae sit eum veritatis reprehenderit officia.'
            name='Wade Warren'
            position='Software Engineer'
            organization='Etsy'
          />
          <div className='flex items-center gap-3 justify-center mt-14'>
            <Avatar />
            <Avatar />
            <Avatar />
            <Avatar />
            <Avatar />
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Home