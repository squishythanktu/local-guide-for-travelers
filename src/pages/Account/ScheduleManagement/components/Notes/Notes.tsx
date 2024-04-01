const Notes: React.FC = () => {
  return (
    <div className='schedule__notes flex flex-wrap gap-2 lg:gap-6'>
      <div className='flex items-center gap-1 lg:gap-3'>
        <div className='h-3 w-3 rounded-full border border-red-500 bg-[#fff0f1]  lg:h-5 lg:w-5'></div>
        <div className='text-sm lg:text-base'>Day off</div>
      </div>
      <div className='flex items-center gap-1 lg:gap-3'>
        <div className='h-3 w-3 rounded-full border border-yellow-500 bg-[#fff9eb] lg:h-5 lg:w-5'></div>
        <div className='text-sm lg:text-base'>Booked date (full day)</div>
      </div>
      <div className='flex items-center gap-1  lg:gap-3'>
        <div className='h-3 w-3 rounded-full border border-green-500 bg-[#e9fbf0] lg:h-5 lg:w-5'></div>
        <div className='text-sm lg:text-base'>Booked date (by hour)</div>
      </div>
    </div>
  )
}
export default Notes
