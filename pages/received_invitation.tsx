import Head from 'next/head'
import Footer from './../components/general/Footer'
import Navbar from './../components/general/Navbar'
import OrganizationCard from './../components/general/OrganizationCard'

const ReceivedInvitation = () => {
  return (
    <>
      <Head>
        <title>Job Seek | Received Invitation</title>
      </Head>
      <Navbar />
      <div className='md:py-10 py-6 md:px-16 px-8'>
        <h1 className='text-xl font-medium'>Received Invitation</h1>
        <div className='mt-6 grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 md:gap-10 gap-8'>
          <OrganizationCard />
          <OrganizationCard />
          <OrganizationCard />
          <OrganizationCard />
          <OrganizationCard />
          <OrganizationCard />
          <OrganizationCard />
          <OrganizationCard />
          <OrganizationCard />
          <OrganizationCard />
          <OrganizationCard />
          <OrganizationCard />
        </div>
      </div>
      <Footer />
    </>
  )
}

export default ReceivedInvitation