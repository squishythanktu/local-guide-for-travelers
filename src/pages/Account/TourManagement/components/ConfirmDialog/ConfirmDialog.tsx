import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import Button from '@mui/material/Button'

interface Props {
  handleCloseDialog: () => void
  handleConfirm: () => void
  title: string
}

export default function ConfirmDialog({ handleCloseDialog, handleConfirm, title }: Props) {
  return (
    <Dialog open={true} aria-labelledby='draggable-dialog-title'>
      <DialogTitle style={{ cursor: 'move' }} id='draggable-dialog-title'>
        {title}
      </DialogTitle>
      <DialogContent>
        <DialogContentText>Are you sure you want to delete this tour?</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseDialog}>Cancel</Button>
        <Button onClick={handleConfirm}>OK</Button>
      </DialogActions>
    </Dialog>
  )
}
