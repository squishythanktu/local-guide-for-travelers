import { Link } from 'react-router-dom'
import SvgIcon from '@mui/material/SvgIcon'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import { ReactComponent as GoogleIcon } from 'src/assets/google.svg'
import { ReactComponent as FacebookIcon } from 'src/assets/facebook.svg'
import { ReactComponent as Instagram } from 'src/assets/instagram.svg'

export default function Footer() {
  return (
    <Box
      className='py-8 text-lg'
      sx={{ color: (theme) => theme.palette.grey[50], backgroundColor: (theme) => theme.palette.grey[900] }}
    >
      <div className='block min-w-80 px-4 py-0 md:mx-auto md:px-8 lg:w-full lg:max-w-[1400px] xl:px-24'>
        <div className='grid grid-cols-1 gap-4 md:grid-cols-5'>
          <div className='col-span-1 mb-4 flex flex-col gap-3 md:col-span-2 md:mb-10'>
            <div className='text-lg font-bold uppercase'>Contact Information</div>
            <div className=''>
              <b>Head Office:</b> 32-34 Nguyen Ba Hoc, Da Nang
            </div>
            <div className=''>
              <b>Email:</b> localguide@gmail.com
            </div>
            <div className=''>
              <b>Hotline:</b> 0981237654
            </div>
          </div>
          <div className='col-span-1 mb-4 flex flex-col gap-3 md:col-span-2 md:mb-10'>
            <div className='text-lg font-bold uppercase'>subscribe us</div>
            <span className=''>To get the latest news and promotion!</span>
            <div className='flex gap-2'>
              <TextField
                label='Enter your email'
                variant='filled'
                size='small'
                sx={{
                  backgroundColor: (theme) => theme.palette.warning.contrastText
                }}
              />
              <Button className='uppercase' variant='contained' size='small'>
                Subscribe
              </Button>
            </div>
            <div className='uppercase'>follow us on social media</div>
            <div className='flex gap-3'>
              <SvgIcon component={GoogleIcon} inheritViewBox className='h-8 w-8 md:h-10 md:w-10' />
              <SvgIcon component={FacebookIcon} inheritViewBox className='h-8 w-8 md:h-10 md:w-10' />
              <SvgIcon component={Instagram} inheritViewBox className='h-8 w-8 md:h-10 md:w-10' />
            </div>
          </div>
          <div className='col-span-1 flex flex-col gap-3 md:col-span-1'>
            <div className='text-lg font-bold uppercase'>Policy</div>
            <Link to=''>Booking Policy</Link>
            <Link to=''>Customer's Rights</Link>
            <Link to=''>Privacy Policy</Link>
            <Link to=''>Baggage Regulations</Link>
            <Link to=''>Frequently Asked Questions</Link>
          </div>
        </div>
      </div>
    </Box>
  )
}
