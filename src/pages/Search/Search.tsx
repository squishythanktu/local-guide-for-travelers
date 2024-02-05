import MenuItem from '@mui/material/MenuItem'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import SvgIcon from '@mui/material/SvgIcon'
import { isEmpty, omitBy } from 'lodash'
import { useState } from 'react'
import { createSearchParams, useNavigate } from 'react-router-dom'
import DotsIcon from 'src/assets/svg/dots.svg'
import NoodleIcon from 'src/assets/svg/noodle.svg'
import CurrencyInput from 'src/components/CurrencyInput/CurrencyInput'
import DateRangePicker from 'src/components/DateRangePicker/DateRangePicker'
import TourCard from 'src/components/TourCard'
import path from 'src/constants/path.constant'
import useQueryConfig, { QueryConfig } from 'src/hooks/useQueryConfig'

export default function Search() {
  const queryConfig: QueryConfig = useQueryConfig()
  const navigate = useNavigate()

  const getInitialSortingValue = () => {
    if (queryConfig.sort_by && queryConfig.order) {
      return `${queryConfig.sort_by}-${queryConfig.order}`
    }
    return ''
  }

  const getInitialPrice = (name: 'min_price' | 'max_price') => {
    return queryConfig[name] || ''
  }

  const [sortingValue, setSortingValue] = useState<string>(getInitialSortingValue())
  const [minPrice, setMinPrice] = useState<string>(getInitialPrice('min_price'))
  const [maxPrice, setMaxPrice] = useState<string>(getInitialPrice('max_price'))

  const handleSortChange = (event: SelectChangeEvent<string>) => {
    const selectedValue = event.target.value
    setSortingValue(selectedValue)
    const [sortBy, order] = selectedValue.split('-')
    navigate({
      pathname: path.search,
      search: createSearchParams({
        ...queryConfig,
        sort_by: sortBy,
        order
      }).toString()
    })
  }

  const handleCurrencyInputChange = (name: string, value: string) => {
    if (parseFloat(value) <= 0 || value === '') return

    let newMinPrice = minPrice
    let newMaxPrice = maxPrice

    if (name === 'min_price' && value !== minPrice) {
      newMinPrice = value
    }

    if (name === 'max_price' && value !== maxPrice) {
      newMaxPrice = value
    }

    if (newMinPrice !== minPrice || newMaxPrice !== maxPrice) {
      setMinPrice(newMinPrice)
      setMaxPrice(newMaxPrice)

      navigateToSearch(newMinPrice, newMaxPrice)
    }
  }

  const navigateToSearch = (newMinPrice: string, newMaxPrice: string) => {
    navigate({
      pathname: path.search,
      search: createSearchParams(
        omitBy(
          {
            ...queryConfig,
            min_price: newMinPrice,
            max_price: newMaxPrice
          },
          isEmpty
        )
      ).toString()
    })
  }

  return (
    <>
      <div className='search-container__header container mt-4 flex min-w-80 flex-col items-start justify-between gap-4 md:flex-row'>
        <div className='header-title flex w-full'>
          <SvgIcon component={DotsIcon} inheritViewBox className=' mr-2 mt-0 h-20 w-full max-w-12 lg:mt-3' />
          <div className='search-container__header-content flex w-full flex-col'>
            <span className='text-base font-semibold sm:text-xl'>Things to do in</span>
            <div className='search-container__header-content--noodle flex flex-row justify-between gap-8'>
              <div className='flex pt-2'>
                <h1 className='pr-4 text-[2rem] leading-[3rem] sm:text-[2.75rem] lg:text-[5rem] lg:leading-[5.25rem]'>
                  {queryConfig.search_name}
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
        <DateRangePicker className='w-full max-w-[462px]' queryConfig={queryConfig} />
      </div>
      <div className='search-container__actions mt-4'>
        <div className='actions-container container'>
          <h2 className='my-4 text-3xl leading-8 lg:text-4xl lg:leading-[2.75rem]'>All tours</h2>
          <div className='sort-filter-container flex flex-col flex-nowrap items-start justify-between gap-4 py-3 md:flex-row md:items-center'>
            <div className='filter-container flex gap-4'>
              <CurrencyInput
                name='min_price'
                label='Min price'
                prefix='$'
                value={minPrice}
                onChange={handleCurrencyInputChange}
                className='w-auto'
              />
              <CurrencyInput
                name='max_price'
                label='Max price'
                prefix='$'
                value={maxPrice}
                onChange={handleCurrencyInputChange}
                className='w-auto'
              />
            </div>
            <div className='sort-container flex items-center'>
              <Select
                name='sort-by'
                value={sortingValue}
                onChange={handleSortChange}
                displayEmpty
                inputProps={{ 'aria-label': 'Without label' }}
                className='h-14 min-w-48'
              >
                <MenuItem value='price-asc'>Price - Low to high</MenuItem>
                <MenuItem value='price-desc'>Price - High to low</MenuItem>
                <MenuItem value='rating-asc'>Rating - Low to high</MenuItem>
                <MenuItem value='rating-desc'>Rating - High to low</MenuItem>
              </Select>
            </div>
          </div>
          <div className='my-4 text-sm font-semibold  text-[var(--label-secondary)]'>46 tours found.</div>
          <div className='collection-body mb-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4'>
            <TourCard />
            <TourCard />
            <TourCard />
            <TourCard />
          </div>
        </div>
      </div>
    </>
  )
}
