import { QueryObserverResult, RefetchOptions, useMutation, useQuery } from '@tanstack/react-query'
import { Dispatch, SetStateAction, useState } from 'react'
import guideApi from 'src/apis/guide.api'
/* eslint-disable @typescript-eslint/no-explicit-any */
import ApartmentIcon from '@mui/icons-material/Apartment'
import CakeIcon from '@mui/icons-material/Cake'
import CloseIcon from '@mui/icons-material/Close'
import DescriptionIcon from '@mui/icons-material/Description'
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus'
import HikingIcon from '@mui/icons-material/Hiking'
import ImageIcon from '@mui/icons-material/Image'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import SmartphoneIcon from '@mui/icons-material/Smartphone'
import TimelapseIcon from '@mui/icons-material/Timelapse'
import WarningAmberIcon from '@mui/icons-material/WarningAmber'
import LoadingButton from '@mui/lab/LoadingButton'
import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import Grid from '@mui/material/Grid'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import { AxiosResponse } from 'axios'
import { toast } from 'react-toastify'
import ConfirmPopper from 'src/components/ConfirmPopper/ConfirmPopper'
import { GuideApplicationStatus } from 'src/enums/guide-application-status'
import { GuideApplicationData } from 'src/types/guide-application.type'
import { GuideApplication } from 'src/types/guide.type'
import { SuccessResponse } from 'src/types/utils.type'

interface GuideDetailsDialogProps {
  selectedId: number
  setSelectedId: Dispatch<SetStateAction<number | null>>
  refetch: (
    options?: RefetchOptions | undefined
  ) => Promise<QueryObserverResult<AxiosResponse<SuccessResponse<GuideApplication[]>, any>, Error>>
}

const GuideDetailsDialog: React.FC<GuideDetailsDialogProps> = ({
  selectedId,
  setSelectedId,
  refetch
}: GuideDetailsDialogProps) => {
  const [currentAction, setCurrentAction] = useState<'deny' | 'accept' | undefined>(undefined)
  const [openPopper, setOpenPopper] = useState<boolean>(false)
  const [reason, setReason] = useState<string>()

  const handleAction = (action: 'accept' | 'deny') => {
    setOpenPopper((prev) => !prev)
    setCurrentAction(action)
  }

  const updateStatusGuideApplicationMutation = useMutation({
    mutationFn: (body: GuideApplicationData) => guideApi.updateStatusApplication(selectedId, body)
  })

  const handleSubmit = () => {
    let formattedData: GuideApplicationData = {
      status: GuideApplicationStatus.PENDING
    }
    if (currentAction === 'accept') {
      formattedData = { status: GuideApplicationStatus.ACCEPTED }
    } else {
      if (!reason) {
        toast.error('Reason deny is required.')
        return
      }
      formattedData = { status: GuideApplicationStatus.DENIED, reasonDeny: reason }
    }
    updateStatusGuideApplicationMutation.mutate(formattedData, {
      onSuccess: () => {
        handleCancel()
        toast.success(`${currentAction} guide successfully.`)
        refetch()
        setSelectedId(null)
      },
      onError: (error) => {
        toast.error(error.message)
      }
    })
  }

  const handleCancel = () => {
    setOpenPopper(false)
  }

  const { data: guideApplicationData, isPending: isPendingGuideDetail } = useQuery({
    queryKey: [`get guide application by id ${selectedId}`],
    queryFn: () => guideApi.getGuideApplicationById(selectedId)
  })

  return (
    <>
      <Dialog fullWidth maxWidth='sm' open={true}>
        <DialogTitle
          style={{ cursor: 'move', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
          id='dialog-title'
        >
          <Typography sx={{ fontWeight: '800', fontSize: '1.2rem' }}>Guide Details</Typography>
          <IconButton
            onClick={() => {
              setSelectedId(null)
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          <DialogContentText>
            {isPendingGuideDetail ? (
              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <CircularProgress />
              </Box>
            ) : (
              <Box className='flex flex-col gap-4'>
                <Box className='guide-details__row flex justify-center gap-4'>
                  <Grid
                    container
                    spacing={{ xs: 2, md: 3 }}
                    columns={{ xs: 4, sm: 8, md: 12 }}
                    className='guide-details__row-grid'
                  >
                    <Grid item xs={4} sm={8} md={12} className='guide-details__description flex items-center gap-2'>
                      <HikingIcon />
                      <Typography variant='body1' className='font-semibold'>
                        Name:
                      </Typography>
                      <span>
                        {guideApplicationData?.data.data.user.fullName
                          ? `${guideApplicationData?.data.data.user.fullName} (${guideApplicationData?.data.data.user.email})`
                          : guideApplicationData?.data.data.user.email}
                      </span>
                    </Grid>
                    <Grid item xs={4} sm={8} md={6} className='guide-details__description flex items-center gap-2'>
                      <ApartmentIcon />
                      <Typography variant='body1' className='font-semibold'>
                        Address:
                      </Typography>
                      <span>{guideApplicationData?.data.data.user.address || 'N/A'}</span>
                    </Grid>
                    <Grid item xs={4} sm={8} md={6} className='guide-details__description flex items-center gap-2'>
                      <TimelapseIcon />
                      <Typography variant='body1' className='font-semibold'>
                        Experience:
                      </Typography>
                      <span>{guideApplicationData?.data.data.yearsOfExperience} year(s)</span>
                    </Grid>
                    <Grid item xs={4} sm={8} md={6} className='guide-details__description flex items-center gap-2'>
                      <SmartphoneIcon />
                      <Typography variant='body1' className='font-semibold'>
                        Phone number:
                      </Typography>
                      <span>{guideApplicationData?.data.data.user.phone}</span>
                    </Grid>
                    <Grid item xs={4} sm={8} md={6} className='guide-details__description flex items-center gap-2'>
                      <CakeIcon />
                      <Typography variant='body1' className='font-semibold'>
                        Date of birth:
                      </Typography>
                      <span>{guideApplicationData?.data.data.user.dateOfBirth?.slice(0, 10)}</span>
                    </Grid>
                    <Grid item xs={4} sm={8} md={12} className='guide-details__description flex items-center gap-2'>
                      <DirectionsBusIcon />
                      <Typography variant='body1' className='font-semibold'>
                        Transportation:
                      </Typography>
                      <span>{guideApplicationData?.data.data.transportation}</span>
                    </Grid>
                    <Grid item xs={4} sm={8} md={12} className='guide-biography flex items-center gap-2'>
                      <DescriptionIcon />
                      <Typography variant='body1' className='font-semibold'>
                        Biography:
                      </Typography>
                      <span>{guideApplicationData?.data.data.biography}</span>
                    </Grid>
                    {guideApplicationData?.data.data.licenseImages &&
                      guideApplicationData?.data.data.licenseImages.length > 0 && (
                        <Grid item xs={4} sm={8} md={12} className='guide-details__description flex flex-col gap-2'>
                          <Box className='flex gap-2'>
                            <ImageIcon />
                            <Typography variant='body1' className='font-semibold'>
                              Image(s)
                            </Typography>
                          </Box>
                          <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 8, sm: 12, md: 12 }}>
                            {guideApplicationData.data.data.licenseImages.map((image, i) => (
                              <Grid
                                item
                                xs={2}
                                sm={2}
                                md={2}
                                key={i}
                                sx={{
                                  display: 'flex',
                                  justifyContent: 'start',
                                  alignItems: 'center',
                                  position: 'relative'
                                }}
                              >
                                <img
                                  src={image.imageLink}
                                  style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover',
                                    aspectRatio: '1 / 1'
                                  }}
                                  alt=''
                                />
                              </Grid>
                            ))}
                          </Grid>
                        </Grid>
                      )}
                  </Grid>
                </Box>
              </Box>
            )}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <LoadingButton
            loading={currentAction === 'deny' ? updateStatusGuideApplicationMutation.isPending : false}
            onClick={() => handleAction('deny')}
            variant='contained'
            size='large'
            color='error'
          >
            Deny
          </LoadingButton>
          <LoadingButton
            loading={currentAction === 'accept' ? updateStatusGuideApplicationMutation.isPending : false}
            variant='contained'
            size='large'
            onClick={() => handleAction('accept')}
          >
            Accept
          </LoadingButton>
        </DialogActions>
        <ConfirmPopper
          icon={currentAction === 'accept' ? <InfoOutlinedIcon /> : <WarningAmberIcon />}
          title={currentAction === 'accept' ? 'Accept guide' : 'Deny guide'}
          content={
            currentAction === 'accept'
              ? 'Are you sure want to accept this guide?'
              : 'Are you sure want to deny this guide?'
          }
          openDialog={openPopper}
          handleClickYes={handleSubmit}
          handleClickNo={handleCancel}
          loading={updateStatusGuideApplicationMutation.isPending}
          reason={reason}
          setReason={setReason}
          currentAction={currentAction}
        />
      </Dialog>
    </>
  )
}
export default GuideDetailsDialog
