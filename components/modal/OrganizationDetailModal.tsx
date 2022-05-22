import { useState, useEffect, useRef } from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import { IOrganization } from './../../utils/Interface'

interface IProps {
  openModal: boolean
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>
  selectedOrganization: IOrganization
}

const OrganizationDetailModal = ({ openModal, setOpenModal, selectedOrganization }: IProps) => {
  const modalRef = useRef() as React.MutableRefObject<HTMLDivElement>
  const [province, setProvince] = useState('')
  const [city, setCity] = useState('')
  const [district, setDistrict] = useState('')

  useEffect(() => {
    const checkIfClickedOutside = (e: MouseEvent) => {
      if (openModal && modalRef.current && !modalRef.current.contains(e.target as Node)) {
        setOpenModal(false)
      }
    }

    document.addEventListener('mousedown', checkIfClickedOutside)
    return () => document.removeEventListener('mousedown', checkIfClickedOutside)
  }, [openModal])

  useEffect(() =>{ 
    const getProvinceData = () => {
      fetch(`https://dev.farizdotid.com/api/daerahindonesia/provinsi/${selectedOrganization.user?.province}`)
        .then(res => res.json())
        .then(res => setProvince(res.nama))
    }

    getProvinceData()
  }, [selectedOrganization.user?.province])

  useEffect(() =>{ 
    const getCityData = () => {
      fetch(`https://dev.farizdotid.com/api/daerahindonesia/kota/${selectedOrganization.user?.city}`)
        .then(res => res.json())
        .then(res => setCity(res.nama))
    }

    getCityData()
  }, [selectedOrganization.user?.city])

  useEffect(() =>{ 
    const getDistrictData = () => {
      fetch(`https://dev.farizdotid.com/api/daerahindonesia/kecamatan/${selectedOrganization.user?.district}`)
        .then(res => res.json())
        .then(res => setDistrict(res.nama))
    }

    getDistrictData()
  }, [selectedOrganization.user?.district])

  return (
    <div className={`${openModal ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'} modal-background`}>
      <div ref={modalRef} className={`${openModal ? 'translate-y-0' : '-translate-y-12'} modal-box max-w-[600px] max-h-[600px] overflow-auto hide-scrollbar`}>
        <div className='modal-box-header'>
          <h1 className='text-lg font-medium'>Organization Detail</h1>
          <AiOutlineClose onClick={() => setOpenModal(false)} className='cursor-pointer' />
        </div>
        <div className='p-7'>
          <div className='flex items-center gap-4'>
            <div className='w-20 h-20 rounded-full border border-gray-300 shadow-xl shrink-0'>
              <img src={selectedOrganization.user?.avatar} alt={selectedOrganization.user?.name} className='w-full h-full rounded-full object-cover' />
            </div>
            <div>
              <h1 className='font-medium text-lg'>{selectedOrganization.user?.name}</h1>
              <p className='text-gray-500 mt-2 text-sm'>{province}, {city}, {district}, {selectedOrganization.user?.postalCode}</p>
            </div>
          </div>
          <div className='mt-7'>
            <h1 className='font-medium text-lg mb-3'>Description</h1>
            <div className='text-sm text-gray-600 leading-loose break-words' dangerouslySetInnerHTML={{ __html: selectedOrganization.description }} />
          </div>
          <div className='mt-7'>
            <h1 className='font-medium text-lg mb-3'>Address</h1>
            <p>{selectedOrganization.address}</p>
          </div>
          <div className='mt-7'>
            <h1 className='font-medium text-lg mb-3'>Phone Number</h1>
            <p>{selectedOrganization.phoneNumber}</p>
          </div>
          <div className='mt-7'>
            <h1 className='font-medium text-lg mb-3'>Estimated Total Employee</h1>
            <p>&plusmn; {selectedOrganization.totalEmployee} people</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrganizationDetailModal