import { Box, Rating } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import guideApi from 'src/apis/guide.api'
import NotFound from '../NotFound/NotFound'
import TourAndReview from './components/Tour&Review'

export default function GuideProfile() {
  const { id } = useParams()

  const { data: guideProfileData, isPending } = useQuery({
    queryKey: [`guide profile of ${id}`],
    queryFn: () => guideApi.getProfile(id ? id : ''),
    staleTime: 6 * 1000
  })

  return (
    <>
      {!isPending && guideProfileData?.data.data && (
        <div className='container my-6 flex flex-col gap-6 '>
          <Box
            sx={{
              borderColor: (theme) => theme.palette.primary.main
            }}
            className='rounded-2xl border md:grid md:grid-cols-4'
          >
            <div className='self-center pt-6 md:col-span-1'>
              <div className='flex flex-col items-center gap-2'>
                <div className='avatar'>
                  <img
                    src='/assets/images/homepage-cover.jpg'
                    alt='Avatar'
                    className='h-20 w-20 rounded-full object-cover'
                  />
                </div>
                <div className='name font-semibold'>{guideProfileData?.data.data.fullName || 'N/A'}</div>
                <div className='rating-overall-container flex flex-wrap items-center justify-center gap-1'>
                  <Rating
                    value={guideProfileData?.data.data.overallRating || 0}
                    precision={0.1}
                    size='small'
                    readOnly
                  />
                  <span className='rating-overall__number text-sm font-semibold'>
                    {guideProfileData?.data.data.overallRating || 0}
                  </span>
                  <span className='rating-overall__reviews text-sm font-semibold  text-[var(--label-secondary)]'>
                    {/* TODO: Replace by tour total reviews from API */}
                    (244 reviews)
                  </span>
                </div>
              </div>
            </div>
            <div className='md:col-span-3'>
              <div className='personal-info flex flex-col gap-2 px-4 pt-4'>
                <Box
                  sx={{ backgroundColor: (theme) => theme.palette.primary.light }}
                  className='mb-2 flex justify-center rounded-lg px-4  py-2'
                >
                  <span className='font-bold'>Personal information</span>
                </Box>
                <Box className='grid grid-cols-2 gap-1 px-4'>
                  <div className='text-sm font-bold'>
                    Full name: <span className='text-sm'>{guideProfileData?.data.data.fullName || 'N/A'}</span>
                  </div>
                  <div className='text-sm font-bold'>
                    Email: <span className='text-sm'>{guideProfileData?.data.data.email || 'N/A'}</span>
                  </div>
                  <div className='text-sm font-bold'>
                    Date of birth: <span className='text-sm'>{'N/A'}</span>
                  </div>
                  <div className='text-sm font-bold'>
                    Phone number: <span className='text-sm'>{guideProfileData?.data.data.phone || 'N/A'}</span>
                  </div>
                  <div className='text-sm font-bold'>
                    Address: <span className='text-sm'>{guideProfileData?.data.data.address || 'N/A'}</span>
                  </div>
                  {/* <div className='text-sm font-bold'>
            Biography: <span className='text-sm'>{guideProfileData?.data.data.biography || 'N/A'}</span>
          </div> */}
                </Box>
              </div>
              <div className='skills-credentials-info flex flex-col gap-2 p-4'>
                <Box
                  sx={{ backgroundColor: (theme) => theme.palette.primary.light }}
                  className='mb-2 flex  justify-center rounded-lg px-4 py-2'
                >
                  <span className='font-bold'>Skills & Credentials </span>
                </Box>
                <Box className='px-4 text-sm font-bold'>
                  Language skills:{' '}
                  <span className='text-sm'>
                    {Array.isArray(guideProfileData?.data?.data?.languageSkill) &&
                    guideProfileData?.data?.data?.languageSkill.length > 0
                      ? guideProfileData?.data?.data?.languageSkill.map((item) => item).join(', ')
                      : 'N/A'}
                  </span>
                </Box>
                <Box className='px-4 text-sm font-bold'>
                  Credential: <span className='text-sm'>{guideProfileData?.data.data.credential || 'N/A'}</span>
                </Box>
              </div>
            </div>
          </Box>
          <TourAndReview guideId={id} />
        </div>
      )}
      {!isPending && !guideProfileData?.data.data && <NotFound />}
    </>
  )
}
