import Box from '@mui/material/Box'
import { styled } from '@mui/material/styles'
import * as React from 'react'
import AdminDrawer from 'src/components/AdminDrawer/AdminDrawer'
import AdminHeader from 'src/components/AdminHeader/AdminHeader'

interface AdminLayoutProps {
  children?: React.ReactNode
}

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar
}))

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }: AdminLayoutProps) => {
  const [open, setOpen] = React.useState(false)

  const handleDrawerOpen = () => {
    setOpen(true)
  }

  const handleDrawerClose = () => {
    setOpen(false)
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <AdminHeader handleDrawerOpen={handleDrawerOpen} open={open} />
      <AdminDrawer handleDrawerClose={handleDrawerClose} open={open} />
      <Box component='main' sx={{ flexGrow: 1, p: 3, background: 'var(--light-grey-background)' }}>
        <DrawerHeader />
        {children}
      </Box>
    </Box>
  )
}

export default AdminLayout
