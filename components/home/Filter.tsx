const Filter = () => {
  return (
    <div className='flex-1'>
      <h1 className='font-medium text-xl border-b border-gray-200 pb-8'>Details</h1>
      <p className='text-gray-400 text-sm font-medium mt-5 mb-4'>Schedule</p>
      <div className='flex items-center gap-4 mb-3'>
        <input type='checkbox' id='fullTime' />
        <label htmlFor='fullTime' className='text-sm'>Full Time</label>
      </div>
      <div className='flex items-center gap-4 mb-3'>
        <input type='checkbox' id='partTime' />
        <label htmlFor='partTime' className='text-sm'>Part Time</label>
      </div>
      <div className='flex items-center gap-4 mb-3'>
        <input type='checkbox' id='projectWork' />
        <label htmlFor='projectWork' className='text-sm'>Project Work</label>
      </div>
      <div className='flex items-center gap-4 mb-3'>
        <input type='checkbox' id='volunteering' />
        <label htmlFor='volunteering' className='text-sm'>Volunteering</label>
      </div>
      <div className='flex items-center gap-4 mb-8'>
        <input type='checkbox' id='internship' />
        <label htmlFor='internship' className='text-sm'>Internship</label>
      </div>
      <hr />
      <p className='text-gray-400 text-sm font-medium mt-5 mb-4'>Employment Type</p>
      <div className='flex items-center gap-4 mb-3'>
        <input type='checkbox' id='fullDay' />
        <label htmlFor='fullDay' className='text-sm'>Full Day</label>
      </div>
      <div className='flex items-center gap-4 mb-3'>
        <input type='checkbox' id='shiftWork' />
        <label htmlFor='shiftWork' className='text-sm'>Shift Work</label>
      </div>
      <div className='flex items-center gap-4 mb-3'>
        <input type='checkbox' id='flexibleSchedule' />
        <label htmlFor='flexibleSchedule' className='text-sm'>Flexible Schedule</label>
      </div>
      <div className='flex items-center gap-4 mb-8'>
        <input type='checkbox' id='shiftMethod' />
        <label htmlFor='shiftMethod' className='text-sm'>Shift Method</label>
      </div>
      <hr />
      <p className='text-gray-400 text-sm font-medium mt-5 mb-4'>Professional Level</p>
      <div className='flex items-center gap-4 mb-3'>
        <input type='checkbox' id='traineeLevel' />
        <label htmlFor='traineeLevel' className='text-sm'>Trainee Level</label>
      </div>
      <div className='flex items-center gap-4 mb-3'>
        <input type='checkbox' id='juniorLevel' />
        <label htmlFor='juniorLevel' className='text-sm'>Junior Level</label>
      </div>
      <div className='flex items-center gap-4 mb-3'>
        <input type='checkbox' id='middleLevel' />
        <label htmlFor='middleLevel' className='text-sm'>Middle Level</label>
      </div>
      <div className='flex items-center gap-4 mb-3'>
        <input type='checkbox' id='seniorLevel' />
        <label htmlFor='seniorLevel' className='text-sm'>Senior Level</label>
      </div>
      <div className='flex items-center gap-4'>
        <input type='checkbox' id='directorLevel' />
        <label htmlFor='directorLevel' className='text-sm'>Director Level</label>
      </div>
    </div>
  )
}

export default Filter