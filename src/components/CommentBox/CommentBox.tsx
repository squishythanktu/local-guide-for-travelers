import LoadingButton from '@mui/lab/LoadingButton'
import { Box } from '@mui/material'
import Rating from '@mui/material/Rating'
import TextField from '@mui/material/TextField'
import { useContext } from 'react'
import { AppContext } from 'src/contexts/app.context'

const CommentBox: React.FC = () => {
  const { profile } = useContext(AppContext)

  return (
    <Box className='comment-box mb-6 flex border-b '>
      <div className='review-card__user-photo mr-4 flex max-w-10'>
        <span className='flex h-10 w-10 items-center justify-center rounded-full bg-slate-200 text-xl font-bold uppercase text-slate-800'>
          {profile?.email.slice(0, 1)}
        </span>
      </div>
      <Box className='mb-6 mt-[-6px] flex w-full flex-col gap-4'>
        <TextField id='outlined-multiline-flexible' placeholder='Add a comment...' multiline rows={4} fullWidth />
        <Box className='flex flex-col items-center gap-2 md:flex-row'>
          <span>Are you satisfied? Reply 1 ~ 5, 5 being very satisfied: </span>
          <Rating
            name='size-large'
            defaultValue={2}
            sx={{
              alignSelf: 'center',
              '& .MuiRating-icon': { fontSize: '1.5rem' }
            }}
          />
        </Box>
        <Box className='flex justify-end'>
          <LoadingButton
            loading
            loadingPosition='end'
            variant='outlined'
            size='large'
            className='w-full self-end md:w-28'
          >
            Post
          </LoadingButton>
        </Box>
      </Box>
    </Box>
  )
}

export default CommentBox
