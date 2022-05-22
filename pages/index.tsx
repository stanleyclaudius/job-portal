import { GetServerSideProps } from 'next'
import { IJob } from './../utils/Interface'
import Head from 'next/head'
import Navbar from './../components/general/Navbar'
import Footer from './../components/general/Footer'
import ReviewContainer from './../components/home/review/ReviewContainer'
import JobContainer from './../components/home/job/JobContainer'
import CategoryContainer from './../components/home/category/CategoryContainer'
import Jumbotron from './../components/home/Jumbotron'
import axios from 'axios'

export interface ICategories {
  _id: string
  name: string
  count: number
  image: string
}

interface IProps {
  latestJobs: IJob[]
  categories: ICategories[]
}

const Home = ({ latestJobs, categories }: IProps) => {
  return (
    <>
      <Head>
        <title>Job Seek | Home</title>
      </Head>
      <Navbar />
      <div>
        <Jumbotron />
        <CategoryContainer categories={categories} />
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
      latestJobs: res.data.latestJob,
      categories: res.data.categoryDisplay
    }
  }
}