import Pagination from '@mui/material/Pagination'
import Skeleton from '@mui/material/Skeleton'
import SvgIcon from '@mui/material/SvgIcon'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { ChangeEvent } from 'react'
import { createSearchParams, useNavigate } from 'react-router-dom'
import tourApi from 'src/apis/tour.api'
import DotsIcon from 'src/assets/svg/dots.svg'
import NoodleIcon from 'src/assets/svg/noodle.svg'
import TourCard from 'src/components/TourCard'
import useQueryConfig, { QueryConfig } from 'src/hooks/useQueryConfig'
import { Tour } from 'src/types/tour.type'
import SortFilterTours from './components'

export default function SearchTours() {
  const queryConfig: QueryConfig = useQueryConfig()
  const navigate = useNavigate()
  const { data: toursData, isPending } = useQuery({
    queryKey: ['toursSearch', queryConfig],
    queryFn: () => tourApi.searchTours(queryConfig),
    placeholderData: keepPreviousData,
    staleTime: 2 * 1000
  })

  const handlePaginationChange = (_event: ChangeEvent<unknown>, value: number) => {
    navigate({
      search: createSearchParams({
        ...queryConfig,
        page: (value - 1).toString()
      }).toString()
    })
  }

  return (
    <>
      <div className='search-container__header container mt-4 flex min-w-80 flex-col items-start justify-between gap-4 md:flex-row'>
        <div className='header-title flex w-full'>
          <SvgIcon component={DotsIcon} inheritViewBox className=' mr-2 mt-0 h-20 w-full max-w-12 lg:mt-3' />
          <div className='search-container__header-content flex w-full flex-col'>
            <span className='text-base font-semibold sm:text-2xl'>Things to do in</span>
            <div className='search-container__header-content--noodle flex flex-row justify-between gap-8'>
              <div className='flex pt-2'>
                <h1 className='pr-4 text-[2rem] leading-[3rem] sm:text-[2.75rem] lg:text-[5rem] lg:leading-[5.25rem]'>
                  {queryConfig.searchName}
                </h1>
                <SvgIcon
                  component={NoodleIcon}
                  inheritViewBox
                  className='mt-[-20px] hidden h-[10rem] w-full max-w-[14em] lg:block'
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='search-container__actions mt-4'>
        <div className='actions-container container'>
          <h2 className='my-4 text-3xl leading-8 lg:text-4xl lg:leading-[2.75rem]'>All tours</h2>
          <SortFilterTours />
          <div className='my-4 text-sm font-semibold  text-[var(--label-secondary)]'>
            {`${toursData?.data.data.totalOfResult} guides found.`}
          </div>
          <div className='collection-body mb-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4'>
            {isPending
              ? Array(8)
                  .fill(0)
                  .map((_, index) => <Skeleton variant='rounded' width='100%' height='300px' key={index} />)
              : toursData?.data.data.tourDTOS.map((tourData: Tour) => (
                  <TourCard key={tourData.id} tourData={tourData} />
                ))}
          </div>
        </div>
      </div>
      {toursData && (
        <Pagination
          onChange={handlePaginationChange}
          count={toursData.data.data.totalOfPage as unknown as number}
          className='my-6 flex justify-center'
          size='large'
          variant='outlined'
          color='primary'
        />
      )}
    </>
  )
}
