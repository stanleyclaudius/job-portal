import { BiChevronLeft, BiChevronRight } from 'react-icons/bi'

interface IProps {
  totalPage: number
  currPage: number
  setCurrPage: React.Dispatch<React.SetStateAction<number>>
}

const Pagination = ({ totalPage, currPage, setCurrPage }: IProps) => {
  const handleClickPage = (page: number) => {
    setCurrPage(page)
  }

  const handleClickArrow = (type: string) => {
    let newPage = 1
    if (type === 'prev') {
      newPage = currPage - 1
      if (newPage < 1) newPage = 1
    } else if (type === 'next') {
      newPage = currPage + 1
      if (newPage > totalPage) newPage = totalPage
    }
    setCurrPage(newPage)
  }

  return (
    <div className='flex justify-center items-center gap-7 mt-8'>
      {
        currPage !== 1 &&
        <BiChevronLeft onClick={() => handleClickArrow('prev')} className='text-xl cursor-pointer' />
      }
      {
        Array.from(Array(totalPage).keys()).map(item => (
          <p key={item} onClick={() => handleClickPage(item + 1)} className={`cursor-pointer text-lg ${currPage === item + 1 ? 'text-white bg-blue-500 rounded-full w-7 h-7 text-center font-medium' : 'text-gray-600'}`}>{item + 1}</p>
        ))
      }
      {
        currPage !== totalPage &&
        <BiChevronRight onClick={() => handleClickArrow('next')} className='text-xl cursor-pointer' />
      }
    </div>
  )
}

export default Pagination