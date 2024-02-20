import { Schema, schema } from 'src/utils/rules'
import useQueryConfig from './useQueryConfig'
import { createSearchParams, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import omit from 'lodash/omit'
import path from 'src/constants/path.constant'
import { SearchCategory } from 'src/enums/search-category.enum'

type FormData = Pick<Schema, 'searchName' | 'searchCategory'>
const searchNameSchema = schema.pick(['searchName', 'searchCategory'])

export default function useSearchToursGuides() {
  const queryConfig = useQueryConfig()
  const navigate = useNavigate()
  const { control, handleSubmit, trigger, register } = useForm<FormData>({
    defaultValues: {
      searchName: '',
      searchCategory: undefined
    },
    resolver: yupResolver(searchNameSchema)
  })

  const onSubmitSearch = handleSubmit((data: FormData) => {
    const config = queryConfig.order
      ? omit(
          {
            ...queryConfig,
            searchName: data.searchName
          },
          ['order', 'sort_by']
        )
      : {
          ...queryConfig,
          searchName: data.searchName
        }
    const searchPath = `../${data.searchCategory === SearchCategory.TOURS ? path.searchTour : path.searchGuide}`
    const searchQuery = createSearchParams(config).toString()
    navigate(`${searchPath}?${searchQuery}`, {
      replace: true
    })
  })

  return { onSubmitSearch, control, trigger, register }
}
