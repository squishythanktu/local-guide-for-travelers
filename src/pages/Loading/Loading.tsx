import CircularProgress from '@mui/material/CircularProgress'
import Box from '@mui/material/Box'

export default function Loading() {
  return (
    <div className='grow'>
      <div className='page_loading__container flex min-w-80 flex-col gap-2 px-4 py-10 pb-0 text-center md:m-auto lg:w-full lg:max-w-[1400px] xl:px-[72px]'>
        <Box className=' mx-auto my-20 object-cover' sx={{ display: 'flex' }}>
          <CircularProgress />
        </Box>
      </div>
    </div>
  )
}
