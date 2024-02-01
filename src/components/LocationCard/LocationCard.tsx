export default function LocationCard() {
  return (
    <div>
      <div className='location-card mx-auto h-[200px] w-full max-w-44 overflow-hidden rounded-lg'>
        <div className='location-card__image relative h-[200px] w-full'>
          <img
            src='https://cdn.getyourguide.com/img/location/4372a34a6daf0b50.jpeg/86.jpg'
            alt='location img'
            className='absolute h-full w-full object-cover'
          />
          <div className='absolute z-10 flex h-full w-full flex-col items-start justify-end p-4 text-left text-xl font-bold leading-6 text-white drop-shadow-lg'>
            Barcelona
          </div>
          <div className='absolute bottom-0 left-0 h-[40%] w-full bg-gradient-to-b from-transparent via-[rgba(26,43,73,0.75)] to-[rgba(26,43,73,0.9)]'></div>
        </div>
      </div>
    </div>
  )
}
