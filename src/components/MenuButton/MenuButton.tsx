import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import Button from '@mui/material/Button'
import Popover from '@mui/material/Popover'
import { ReactNode, useState } from 'react'

interface Props {
  jsx: ReactNode
  text: string
}

const MenuButton = ({ jsx, text }: Props) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const open = Boolean(anchorEl)

  return (
    <>
      <Button
        id='demo-customized-button'
        aria-controls={open ? 'demo-customized-menu' : undefined}
        aria-haspopup='true'
        aria-expanded={open ? 'true' : undefined}
        variant='contained'
        disableElevation
        onClick={handleClick}
        size='large'
        endIcon={<KeyboardArrowDownIcon />}
        className='min-h-[50px]'
      >
        {text}
      </Button>
      <Popover
        id='demo-customized-menu'
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        disableScrollLock
        transformOrigin={{ horizontal: 'left', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
        className='p-4'
        sx={{
          '& .MuiPaper-root': {
            marginTop: '8px',
            borderRadius: '12px'
          }
        }}
      >
        {jsx}
      </Popover>
    </>
  )
}

export default MenuButton
