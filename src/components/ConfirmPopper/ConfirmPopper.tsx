import LoadingButton from '@mui/lab/LoadingButton'
import { TextField } from '@mui/material'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Fade from '@mui/material/Fade'
import Paper from '@mui/material/Paper'
import Popper from '@mui/material/Popper'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { Dispatch, SetStateAction } from 'react'
import theme from 'src/theme'

interface ConfirmPopperProps {
  icon: React.ReactNode
  title: string
  content: string
  openPopper: boolean
  popperAnchorEl: null | HTMLElement
  handleClickYes: () => void
  handleClickNo: () => void
  loading: boolean
  reason?: string
  setReason?: Dispatch<SetStateAction<string | undefined>>
  currentAction?: 'deny' | 'accept' | undefined
}

const ConfirmPopper: React.FC<ConfirmPopperProps> = ({
  icon,
  title,
  content,
  openPopper,
  popperAnchorEl,
  handleClickYes,
  handleClickNo,
  loading,
  reason,
  setReason,
  currentAction
}: ConfirmPopperProps) => {
  return (
    <Popper
      sx={{ zIndex: theme.zIndex.modal }}
      open={openPopper}
      anchorEl={popperAnchorEl}
      placement='top-end'
      transition
      disablePortal={false}
      modifiers={[
        {
          name: 'flip',
          enabled: false,
          options: {
            altBoundary: false,
            rootBoundary: 'document',
            padding: 8
          }
        },
        {
          name: 'preventOverflow',
          enabled: false,
          options: {
            altAxis: false,
            altBoundary: false,
            tether: false,
            rootBoundary: 'document',
            padding: 8
          }
        }
      ]}
    >
      {({ TransitionProps }) => (
        <Fade {...TransitionProps} timeout={350}>
          <Paper sx={{ margin: 1, p: 2 }}>
            <Box className='flex items-center gap-2'>
              {icon}
              <Typography className='text-lg font-bold'>{title}</Typography>
            </Box>
            {setReason && currentAction === 'deny' && (
              <TextField
                className='mt-4 w-full'
                label='Reason'
                value={reason}
                onChange={(event) => setReason(event.target.value)}
                variant='outlined'
              />
            )}
            <Typography className='mb-8 mt-4 text-[var(--label-secondary)]'>{content}</Typography>
            <Stack direction='row' spacing={1} className='flex justify-end'>
              <Button onClick={handleClickNo} size='large' color='error'>
                No
              </Button>
              <LoadingButton loading={loading} onClick={handleClickYes} variant='outlined' size='large'>
                Yes
              </LoadingButton>
            </Stack>
          </Paper>
        </Fade>
      )}
    </Popper>
  )
}

export default ConfirmPopper
