import Head from 'next/head'
import Navbar from './../components/general/Navbar'
import Footer from './../components/general/Footer'
import ReviewContainer from './../components/home/review/ReviewContainer'
import JobContainer from './../components/home/job/JobContainer'
import CategoryContainer from './../components/home/category/CategoryContainer'
import Jumbotron from './../components/home/Jumbotron'

const Home = () => {
  return (
    <>
      <Head>
        <title>Job Seek | Home</title>
      </Head>
      <Navbar />
      <div>
        <Jumbotron />
        <CategoryContainer />
        <JobContainer />
        <ReviewContainer />
      </div>
      <Footer />
    </>
  )
}

export default Home