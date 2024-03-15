import NotificationsIcon from '@mui/icons-material/Notifications'
import Badge from '@mui/material/Badge'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'
import Typography from '@mui/material/Typography'
import { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import NotificationItem from './NotificationItem/NotificationItem'
import { useInfiniteQuery } from '@tanstack/react-query'
import { AppContext } from 'src/contexts/app.context'
import notificationApi from 'src/apis/notifications.api'
import Loading from 'src/pages/Loading'
import { useInView } from 'react-intersection-observer'
import { Notification as NotificationType } from 'src/types/notification.type'
import Skeleton from '@mui/material/Skeleton'

interface NotificationProps {
  textColor: string
}

const Notification: React.FC<NotificationProps> = ({ textColor }: NotificationProps) => {
  const { profile } = useContext(AppContext)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const { ref, inView } = useInView()
  const {
    data: notificationsData,
    isPending,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage
  } = useInfiniteQuery({
    queryKey: [`notification of user with id ${profile?.id}`],
    queryFn: notificationApi.getNotifications,
    initialPageParam: 0,
    getNextPageParam: (lastPage, __allPages, lastPageParam) => {
      if (lastPage.data.data.length === 0) return undefined
      return lastPageParam + 1
    }
  })

  useEffect(() => {
    if (inView && hasNextPage) fetchNextPage()
  }, [inView, hasNextPage, fetchNextPage])

  const open = Boolean(anchorEl)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => setAnchorEl(event.currentTarget)

  const handleClose = () => setAnchorEl(null)

  return (
    <Box
      className='relative ml-2 flex cursor-pointer flex-col items-center 
text-base md:after:absolute md:after:bottom-[0px] md:after:left-0 md:after:h-[2.25px] 
md:after:w-0 md:after:bg-orange-500 md:after:transition-all md:after:duration-300 lg:hover:after:w-full'
    >
      <Button
        aria-label='notification'
        size='small'
        onClick={handleClick}
        className='flex flex-col text-inherit'
        disableRipple
        disableFocusRipple
        sx={{
          color: textColor,
          '&.MuiButtonBase-root:hover': {
            bgcolor: 'transparent'
          }
        }}
      >
        <Badge variant='dot' color='error'>
          <NotificationsIcon sx={{ color: textColor }} />
        </Badge>
        <span className='mt-[5px] hidden lg:block lg:text-sm'>Notifications</span>
      </Button>
      <Menu
        disableScrollLock
        id='basic-menu'
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button'
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        sx={{
          maxHeight: '500px',
          '& .MuiPaper-root': {
            marginTop: '4px',
            minWidth: 350
          },
          '& .MuiList-root': {
            paddingY: 0
          }
        }}
      >
        <Box sx={{ background: (theme) => theme.palette.primary.main, paddingY: '10px', paddingX: '16px' }}>
          <Typography variant='subtitle2' sx={{ color: 'white', fontSize: '1.1rem' }}>
            Notifications
          </Typography>
        </Box>
        {isPending && (
          <Box sx={{ marginY: '0.5rem' }}>
            <Loading />
          </Box>
        )}
        {!isPending &&
          notificationsData?.pages.map((page, index) => {
            if (page.data.data.length === 0) {
              return (
                <Box
                  key={index}
                  sx={{
                    display: 'flex',
                    marginY: '1rem',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <img
                    src='/assets/images/empty-notification.png'
                    alt='Empty notification'
                    style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                  />
                  <Typography variant='h6' sx={{ fontWeight: '800' }}>
                    No notifications Yet
                  </Typography>
                  <Typography variant='body1' sx={{ textAlign: 'center', fontSize: '14px' }}>
                    You have no notifications right now. <br /> Come back later
                  </Typography>
                </Box>
              )
            }
            return page.data.data.map((noti: NotificationType, index) => {
              if (page.data.data.length === index + 1)
                return <NotificationItem innerRef={ref} key={noti.id} data={noti} />
              return <NotificationItem key={noti.id} data={noti} />
            })
          })}
        {isFetchingNextPage && (
          <>
            <Box sx={{ display: 'flex', gap: 1, paddingX: '1rem', paddingY: '0.5rem' }}>
              <Skeleton variant='circular' width={40} height={40} />
              <Skeleton variant='text' sx={{ flexGrow: 1 }} />
            </Box>
            <Box sx={{ display: 'flex', gap: 1, paddingX: '1rem', paddingY: '0.5rem' }}>
              <Skeleton variant='circular' width={40} height={40} />
              <Skeleton variant='text' sx={{ flexGrow: 1 }} />
            </Box>
          </>
        )}
        <Box sx={{ paddingY: '10px', paddingX: '16px' }}>
          {/* TODO: Handle see all recent activities API */}
          <Link to='/'>
            <Typography
              sx={{
                display: 'flex',
                justifyContent: 'center',
                color: (theme) => theme.palette.primary.light,
                fontSize: '14px',
                '&:hover': { color: (theme) => theme.palette.primary.main }
              }}
            >
              See all recent activities
            </Typography>
          </Link>
        </Box>
      </Menu>
    </Box>
  )
}
export default Notification
