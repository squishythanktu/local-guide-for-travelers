import CloseIcon from '@mui/icons-material/Close'
import LoadingButton from '@mui/lab/LoadingButton'
import { Dialog, DialogActions, DialogContent, DialogTitle, IconButton, TextField } from '@mui/material'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { Dispatch, SetStateAction } from 'react'

interface ConfirmDialogProps {
  icon: React.ReactNode
  title: string
  content: string
  openDialog: boolean
  handleClickYes: () => void
  handleClickNo: () => void
  loading: boolean
  reason?: string
  setReason?: Dispatch<SetStateAction<string | undefined>>
  currentAction?: 'deny' | 'accept' | undefined
}

const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  icon,
  title,
  content,
  openDialog,
  handleClickYes,
  handleClickNo,
  loading,
  reason,
  setReason,
  currentAction
}: ConfirmDialogProps) => {
  return (
    <>
      <Dialog fullWidth maxWidth='xs' open={openDialog}>
        <DialogTitle style={{ cursor: 'move', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box className='flex items-center gap-2'>
            {icon}
            <Typography className='text-lg font-bold'>{title}</Typography>
          </Box>
          <IconButton onClick={handleClickNo}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          {setReason && currentAction === 'deny' && (
            <TextField
              className='mt-4 w-full'
              label={
                <Box sx={{ fontWeight: '500' }}>
                  Reason
                  <Typography component='span' sx={{ color: 'red' }}>
                    *
                  </Typography>
                </Box>
              }
              value={reason}
              onChange={(event) => setReason(event.target.value)}
              variant='outlined'
            />
          )}
          <Box sx={{ paddingTop: '1rem' }}>{content}</Box>
        </DialogContent>
        <DialogActions>
          <Stack direction='row' spacing={1} className='flex justify-end'>
            <Button onClick={handleClickNo} size='large' color='error'>
              No
            </Button>
            <LoadingButton loading={loading} onClick={handleClickYes} variant='outlined' size='large'>
              Yes
            </LoadingButton>
          </Stack>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default ConfirmDialog
