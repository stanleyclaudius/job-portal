import Head from 'next/head'
import Navbar from './../components/general/Navbar'
import Footer from './../components/general/Footer'
import ReviewContainer from './../components/home/review/ReviewContainer'
import JobContainer from './../components/home/job/JobContainer'
import CategoryContainer from './../components/home/category/CategoryContainer'
import Jumbotron from './../components/home/Jumbotron'
import { GetServerSideProps } from 'next'
import axios from 'axios'
import { IJob } from '../redux/types/jobTypes'

interface IProps {
  latestJobs: IJob[]
}

const Home = ({ latestJobs }: IProps) => {
  return (
    <>
      <Head>
        <title>Job Seek | Home</title>
      </Head>
      <Navbar />
      <div>
        <Jumbotron />
        <CategoryContainer />
        <JobContainer jobs={latestJobs} />
        <ReviewContainer />
      </div>
      <Footer />
    </>
  )
}

export default Home

export const getServerSideProps: GetServerSideProps = async(context) => {
  const res = await axios.get(`${process.env.CLIENT_URL}/api/home`)

  return {
    props: {
      latestJobs: res.data.latestJob
    }
  }
}