import FmdGoodOutlinedIcon from '@mui/icons-material/FmdGoodOutlined'
import SearchIcon from '@mui/icons-material/Search'
import Autocomplete from '@mui/material/Autocomplete'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import TextField from '@mui/material/TextField'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useQuery } from '@tanstack/react-query'
import debounce from 'lodash/debounce'
import { useEffect, useMemo, useState } from 'react'
import { Controller } from 'react-hook-form'
import { useLocation } from 'react-router-dom'
import searchSuggestionApi from 'src/apis/suggestion.api'
import { SearchType } from 'src/enums/search-type.enum'
import useQueryConfig from 'src/hooks/useQueryConfig'
import useSearchToursGuides from 'src/hooks/useSearchToursGuides'
import theme from 'src/theme'
import { SeachResult, SearchSuggestionResult } from 'src/types/search-suggestion-result.type'

const SearchBar: React.FC = () => {
  const queryConfig = useQueryConfig()
  const location = useLocation()
  const { onSubmitSearch, control, trigger, register, setValue } = useSearchToursGuides()
  const [search, setSearch] = useState({
    searchType: (location.pathname.includes(SearchType.GUIDE) ? SearchType.GUIDE : SearchType.TOUR) as string,
    searchValue: queryConfig.searchValue || ''
  })
  const [isTypingMode, setIsTypingMode] = useState<boolean>(false)
  const [searchSuggestionResults, setSearchSuggestionResults] = useState<SeachResult[]>([])
  const isMdBreakpoint = useMediaQuery(theme.breakpoints.up('md'))
  const { data: searchSuggestionData } = useQuery({
    queryKey: ['searchSuggestion', search.searchType, search.searchValue],
    queryFn: () => searchSuggestionApi.getSearchSuggestions(search),
    staleTime: 1 * 1000,
    enabled: search.searchValue.trim() !== '' && !!isTypingMode
  })

  const handleSearchValueChange = useMemo(
    () =>
      debounce((searchValue: string, action: 'select' | 'type') => {
        if (searchValue !== search.searchValue && action === 'type') setSearch({ ...search, searchValue })
      }, 300),
    [search, setSearch]
  )

  const transformSearchSuggestions = (result: SearchSuggestionResult) => {
    const convertedAddresses = result.addresses.map((address) => ({
      resultName: address
    }))
    return [...convertedAddresses, ...result.toursOrGuiders]
  }

  useEffect(() => {
    if (searchSuggestionData?.data?.data) {
      const mergedSearchResults = transformSearchSuggestions(searchSuggestionData.data.data)
      setSearchSuggestionResults(mergedSearchResults)
    }
  }, [searchSuggestionData])

  return (
    <form className='search-bar col-span-3 flex items-center' onSubmit={onSubmitSearch}>
      <Box className='relative flex w-full items-center rounded-full border-2 border-solid border-[var(--border-primary)] bg-white focus:border-2 focus:border-solid focus:border-blue-500'>
        <div className='search-icon flex h-full w-auto items-center justify-center border-r-2 border-solid border-[var(--border-primary)]'>
          <Controller
            control={control}
            name='searchType'
            render={({ field }) => (
              <Select
                displayEmpty
                id='searchType'
                value={search.searchType}
                label='Categories'
                {...register('searchType')}
                onChange={(event) => {
                  field.onChange(event)
                  trigger('searchType')
                  setSearch({ ...search, searchType: event.target.value })
                }}
                className='h-full w-12 overflow-auto md:w-[100px]'
                sx={{
                  boxShadow: 'none',
                  '.MuiOutlinedInput-notchedOutline': { border: 0 },
                  '&.MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
                    border: 0
                  },
                  '&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    border: 0
                  }
                }}
                MenuProps={{ disableScrollLock: true }}
              >
                <MenuItem value={SearchType.TOUR}>Tour</MenuItem>
                <MenuItem value={SearchType.GUIDE}>Guide</MenuItem>
              </Select>
            )}
          />
        </div>
        <Controller
          control={control}
          name='searchValue'
          render={({ field }) => (
            <Autocomplete
              fullWidth
              freeSolo
              disableClearable
              value={search.searchValue}
              options={searchSuggestionResults || []}
              getOptionLabel={(option) => (typeof option === 'string' ? option : option?.resultName || '')}
              renderInput={(params) => (
                <TextField
                  {...params}
                  onChange={(event) => {
                    setIsTypingMode(true)
                    field.onChange(event)
                    trigger('searchValue')
                    handleSearchValueChange(event.target.value, 'type')
                  }}
                  placeholder={search.searchType === SearchType.TOUR ? 'Search tours' : 'Search guides'}
                  fullWidth
                  sx={{ '& fieldset': { border: 'none' } }}
                />
              )}
              renderOption={(props, option) => {
                const handleOptionClick = () => {
                  setIsTypingMode(false)
                  setSearch({ ...search, searchValue: option.resultName })
                  setValue('searchValue', option.resultName)
                  onSubmitSearch()
                }
                return (
                  <Box
                    component='li'
                    sx={{ '& > img': { mr: 2, flexShrink: 0 } }}
                    {...props}
                    onClick={handleOptionClick}
                  >
                    {option.imageLink ? (
                      <img
                        loading='lazy'
                        style={{
                          height: 42,
                          width: 42,
                          borderRadius: '8px',
                          objectFit: 'cover'
                        }}
                        srcSet={`${option.imageLink} 2x`}
                        src={`${option.imageLink}`}
                        alt=''
                      />
                    ) : (
                      <Box
                        style={{
                          width: 42,
                          height: 42,
                          borderRadius: '8px',
                          background: 'var(--supportive-over-view)',
                          marginRight: '16px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                      >
                        <FmdGoodOutlinedIcon />
                      </Box>
                    )}
                    {option.resultName}
                  </Box>
                )
              }}
              componentsProps={{ popper: { style: { width: 'fit-content', minWidth: '300px' } } }}
            />
          )}
        />
        {isMdBreakpoint ? (
          <Button
            type='submit'
            className='mr-2 rounded-full font-semibold md:inline-block'
            variant='contained'
            size={'large'}
          >
            <SearchIcon />
          </Button>
        ) : (
          <IconButton type='submit' color='primary' aria-label='search' className='mr-2'>
            <SearchIcon />
          </IconButton>
        )}
      </Box>
    </form>
  )
}

export default SearchBar
