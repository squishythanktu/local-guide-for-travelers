/* eslint-disable @typescript-eslint/no-explicit-any */
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber'
import ExpandLess from '@mui/icons-material/ExpandLess'
import ExpandMore from '@mui/icons-material/ExpandMore'
import HikingIcon from '@mui/icons-material/Hiking'
import HomeWorkIcon from '@mui/icons-material/HomeWork'
import PersonIcon from '@mui/icons-material/Person'
import TourIcon from '@mui/icons-material/Tour'
import TrendingUpIcon from '@mui/icons-material/TrendingUp'
import Collapse from '@mui/material/Collapse'
import Divider from '@mui/material/Divider'
import MuiDrawer from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import { Theme, styled } from '@mui/material/styles'
import * as React from 'react'
import { SyntheticEvent, useState } from 'react'
import { Link } from 'react-router-dom'
import path from 'src/constants/path.constant'
import { drawerWidth } from 'src/constants/width-height.constant'
import theme from 'src/theme'
import MuiDrawer from '@mui/material/Drawer'
import Collapse from '@mui/material/Collapse'
import ExpandLess from '@mui/icons-material/ExpandLess'
import ExpandMore from '@mui/icons-material/ExpandMore'
import path from 'src/constants/path.constant'
import { Link } from 'react-router-dom'
import HomeWorkIcon from '@mui/icons-material/HomeWork'
import HikingIcon from '@mui/icons-material/Hiking'
import { SyntheticEvent, useState } from 'react'
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber'

interface AdminDrawerProps {
  handleDrawerClose: () => void
  open: boolean
}

const openedMixin = (theme: Theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen
  }),
  overflowX: 'hidden'
})

const closedMixin = (theme: Theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`
  }
})

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar
}))

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(({ theme, open }): any => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme)
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme)
  })
}))

const AdminDrawer: React.FC<AdminDrawerProps> = ({ handleDrawerClose, open }: AdminDrawerProps) => {
  const [openCollapseSalesReport, setOpenCollapseSalesReport] = useState(false)
  const [openCollapseTourManagement, setOpenCollapseTourManagement] = useState(false)
  const [openCollapseGuideManagement, setOpenCollapseGuideManagement] = useState(false)

  const handleClickSalesReport = (event: SyntheticEvent) => {
    event.stopPropagation()
    setOpenCollapseSalesReport(!openCollapseSalesReport)
  }

  const handleClickTourManagement = (event: SyntheticEvent) => {
    event.stopPropagation()
    setOpenCollapseTourManagement(!openCollapseTourManagement)
  }

  const handleClickGuideManagement = (event: SyntheticEvent) => {
    event.stopPropagation()
    setOpenCollapseGuideManagement(!openCollapseGuideManagement)
  }

  return (
    <Drawer variant='permanent' open={open}>
      <DrawerHeader>
        <IconButton onClick={handleDrawerClose}>
          {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
        </IconButton>
      </DrawerHeader>
      <Divider />
      <List>
        <ListItem disablePadding sx={{ display: 'block' }}>
          <ListItemButton
            sx={{
              minHeight: 48,
              justifyContent: open ? 'initial' : 'center',
              px: 2.5
            }}
            onClick={handleClickTourManagement}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: open ? 3 : 'auto',
                justifyContent: 'center'
              }}
            >
              <TourIcon />
            </ListItemIcon>
            <ListItemText primary='Tour Management' sx={{ opacity: open ? 1 : 0 }} />
            {openCollapseTourManagement ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
        </ListItem>
        <Collapse in={openCollapseTourManagement} timeout='auto' unmountOnExit>
          <List component='div' disablePadding>
            <ListItemButton sx={{ pl: 4 }} component={Link} to={path.tourConfirmation}>
              <ListItemIcon>
                <ConfirmationNumberIcon />
              </ListItemIcon>
              <ListItemText primary='Tour Confirmation' />
            </ListItemButton>
          </List>
        </Collapse>
        <ListItem disablePadding sx={{ display: 'block' }}>
          <ListItemButton
            sx={{
              minHeight: 48,
              justifyContent: open ? 'initial' : 'center',
              px: 2.5
            }}
            onClick={handleClickGuideManagement}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: open ? 3 : 'auto',
                justifyContent: 'center'
              }}
            >
              <PersonIcon />
            </ListItemIcon>
            <ListItemText primary='Guide Management' sx={{ opacity: open ? 1 : 0 }} />
            {openCollapseGuideManagement ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
        </ListItem>
        <Collapse in={openCollapseGuideManagement} timeout='auto' unmountOnExit>
          <List component='div' disablePadding>
            <ListItemButton sx={{ pl: 4 }} component={Link} to={path.guideConfirmation}>
              <ListItemIcon>
                <ConfirmationNumberIcon />
              </ListItemIcon>
              <ListItemText primary='Guide Confirmation' />
            </ListItemButton>
          </List>
        </Collapse>
        <ListItem disablePadding sx={{ display: 'block' }}>
          <ListItemButton
            sx={{
              minHeight: 48,
              justifyContent: open ? 'initial' : 'center',
              px: 2.5
            }}
            onClick={handleClickSalesReport}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: open ? 3 : 'auto',
                justifyContent: 'center'
              }}
            >
              <TrendingUpIcon />
            </ListItemIcon>
            <ListItemText primary='Sales Report' sx={{ opacity: open ? 1 : 0 }} />
            {openCollapseSalesReport ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
        </ListItem>
        <Collapse in={openCollapseSalesReport} timeout='auto' unmountOnExit>
          <List component='div' disablePadding>
            <ListItemButton sx={{ pl: 4 }} component={Link} to={path.salesReportOfTour}>
              <ListItemIcon>
                <HomeWorkIcon />
              </ListItemIcon>
              <ListItemText primary='Tour' />
            </ListItemButton>
            <ListItemButton sx={{ pl: 4 }} component={Link} to={path.salesReportOfGuide}>
              <ListItemIcon>
                <HikingIcon />
              </ListItemIcon>
              <ListItemText primary='Guide' />
            </ListItemButton>
          </List>
        </Collapse>
      </List>
    </Drawer>
  )
}

export default AdminDrawer
