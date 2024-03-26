import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import Button from '@mui/material/Button'

interface ConfirmDialogProps {
  handleClose: () => void
  handleConfirm: () => void
  title: string
  content: string
}

const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  handleClose,
  handleConfirm,
  title,
  content
}: ConfirmDialogProps) => {
  return (
    <Dialog open={true} aria-labelledby='dialog'>
      <DialogTitle style={{ cursor: 'move' }} id='dialog-title'>
        {title}
      </DialogTitle>
      <DialogContent>
        <DialogContentText>{content}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleConfirm}>OK</Button>
      </DialogActions>
    </Dialog>
  )
}

export default ConfirmDialog
