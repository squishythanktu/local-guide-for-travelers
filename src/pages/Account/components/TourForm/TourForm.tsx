import { yupResolver } from '@hookform/resolvers/yup'
import { Autocomplete, Box, Button, MenuItem, TextField, Chip } from '@mui/material'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { Controller, useForm } from 'react-hook-form'
import categoryApi from 'src/apis/category.api'
import ControlledTextField from 'src/components/ControlledTextField'
import { Unit } from 'src/enums/unit.enum'
import { TourCategory } from 'src/types/tour.type'
import { TourSchema, tourSchema } from 'src/utils/rules'

interface Props {
  onSubmit: (data: TourFormData) => void
  onCancel: () => void
}

type TourFormData = TourSchema

export default function TourForm({ onCancel, onSubmit }: Props) {
  const { data: categoriesData } = useQuery({
    queryKey: ['categories'],
    queryFn: () => categoryApi.getCategories(),
    placeholderData: keepPreviousData,
    staleTime: 1 * 60 * 1000
  })
  const {
    trigger,
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<TourFormData>({
    defaultValues: {
      name: '',
      description: '',
      province: '',
      transportation: '',
      duration: 0,
      unit: '',
      includeService: '',
      categories: [],
      pricePerTraveler: 0,
      limitTraveler: 0,
      extraPrice: 0,
      estimatedLocalCashNeeded: 0
    },
    resolver: yupResolver(tourSchema)
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box className='flex flex-col gap-2'>
        <div className='tour-form__field-group mb-4 flex flex-col gap-6 lg:flex-row lg:justify-between'>
          <ControlledTextField
            className='min-h-[100px] grow lg:w-1/2'
            control={control}
            name={'name'}
            label={'Name *'}
          />
          <ControlledTextField
            className='min-h-[100px] grow lg:w-1/2'
            control={control}
            name={'province'}
            label={'Province * '}
          />
        </div>
        <div className='tour-form__field-group mb-4 flex flex-col gap-6 lg:flex-row lg:justify-between'>
          <ControlledTextField
            className='min-h-[100px] grow lg:w-1/4'
            type='number'
            control={control}
            name={'pricePerTraveler'}
            label={'Price per traveler *'}
            prefix='$'
          />
          <ControlledTextField
            className='min-h-[100px] grow lg:w-1/4'
            type='number'
            control={control}
            name={'limitTraveler'}
            label={'Limit traveler *'}
          />
          <ControlledTextField
            className='min-h-[100px] grow lg:w-1/4'
            type='number'
            control={control}
            name={'extraPrice'}
            label={'Extra price *'}
            prefix='$'
          />
          <ControlledTextField
            className='min-h-[100px] grow lg:w-1/4'
            type='number'
            control={control}
            name={'estimatedLocalCashNeeded'}
            label={'Estimated local cash needed *'}
            prefix='$'
          />
        </div>
        <div className='tour-form__field-group mb-4 flex flex-col gap-6 lg:flex-row lg:justify-between'>
          {categoriesData?.data.data && (
            <Controller
              control={control}
              name='categories'
              render={({ field }) => {
                const handleChange = (event, value) => {
                  const isValidValue = value.every((selectedCategory: TourCategory) =>
                    categoriesData?.data.data.some((category) => category.id === selectedCategory.id)
                  )
                  if (isValidValue) {
                    field.onChange(value)
                    trigger('categories')
                  } else {
                    field.onChange([])
                    trigger('categories')
                  }
                }

                return (
                  <Autocomplete
                    multiple
                    id='categories'
                    options={categoriesData.data.data}
                    getOptionLabel={(option) => (option.name ? option.name : '')}
                    isOptionEqualToValue={(option, value) => option && option.id === value.id}
                    value={Array.isArray(field.value) ? field.value : []}
                    className='h-fit grow lg:w-1/3'
                    onChange={handleChange}
                    renderTags={(value, getTagProps) => {
                      const numTags = value.length
                      const limitTags = 1
                      return (
                        <>
                          {value.slice(0, limitTags).map((option, index) => (
                            <Chip {...getTagProps({ index })} key={index} label={option.name ? option.name : ''} />
                          ))}

                          {numTags > limitTags && ` +${numTags - limitTags}`}
                        </>
                      )
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        variant='outlined'
                        label='Categories'
                        error={!!errors.categories?.message}
                        InputLabelProps={{
                          shrink: true
                        }}
                      />
                    )}
                  />
                )
              }}
            />
          )}
          <ControlledTextField
            className='min-h-[100px] w-full grow lg:w-1/3'
            control={control}
            name={'transportation'}
            label={'Transportation *'}
          />
          <ControlledTextField
            className='min-h-[100px] w-full grow lg:w-1/6'
            type='number'
            control={control}
            name={'duration'}
            label={'Duration *'}
          />
          <Controller
            control={control}
            name='unit'
            render={({ field }) => (
              <TextField
                select
                label='Unit'
                id='unit'
                variant='outlined'
                error={!!errors.unit?.message}
                className='h-fit w-full grow lg:w-1/6'
                {...field}
                InputLabelProps={{
                  shrink: true
                }}
                onChange={(event) => {
                  field.onChange(event)
                  trigger('unit')
                }}
              >
                {Object.values(Unit).map((value) => (
                  <MenuItem key={value} value={value}>
                    {value}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />
        </div>
        <ControlledTextField
          fullWidth={true}
          multiline={true}
          rows={3}
          control={control}
          name={'itinerary'}
          label={'Itinerary *'}
          className='min-h-32'
        />
        <ControlledTextField
          fullWidth={true}
          multiline={true}
          rows={3}
          control={control}
          name={'includeService'}
          label={'Include Service'}
          className='mb-6'
        />
        <ControlledTextField
          fullWidth={true}
          multiline={true}
          rows={3}
          control={control}
          name={'description'}
          label={'Description'}
        />
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'end',
          gap: 2,
          paddingTop: '16px'
        }}
      >
        <Button variant='contained' className='w-fit' size='large' onClick={onCancel}>
          Cancel
        </Button>
        <Button variant='contained' className='w-fit' size='large' type='submit'>
          Submit
        </Button>
      </Box>
    </form>
  )
}