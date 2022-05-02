import { ReactElement } from 'react'
import Head from 'next/head'
import Sidebar from './Sidebar'
import Navbar from './Navbar'

interface IProps {
  title: string
  pageTitle?: string
  children: ReactElement
}

const Layout = ({ title, pageTitle, children }: IProps) => {
  return (
    <>
      <Head>
        <title>Job Seek | {title}</title>
      </Head>
      <div className='flex h-screen'>
        <Sidebar />
        <div className='flex-[16]'>
          <Navbar />
          <div className={`px-10 ${!pageTitle ? 'mb-7' : undefined}`}>
            {pageTitle && <h1 className='font-medium text-xl mb-7'>{pageTitle}</h1>}
            {children}
          </div>
        </div>
      </div>
    </>
  )
}

export default Layout