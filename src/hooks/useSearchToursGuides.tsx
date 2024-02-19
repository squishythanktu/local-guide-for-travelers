import { Schema, schema } from 'src/utils/rules'
import useQueryConfig from './useQueryConfig'
import { createSearchParams, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import omit from 'lodash/omit'
import path from 'src/constants/path.constant'
import { SearchCategory } from 'src/enums/search-category.enum'

type FormData = Pick<Schema, 'search_name' | 'search_category'>
const searchNameSchema = schema.pick(['search_name', 'search_category'])

export default function useSearchToursGuides() {
  const queryConfig = useQueryConfig()
  const navigate = useNavigate()
  const { control, handleSubmit, trigger, register } = useForm<FormData>({
    defaultValues: {
      search_name: '',
      search_category: undefined
    },
    resolver: yupResolver(searchNameSchema)
  })

  const onSubmitSearch = handleSubmit((data: FormData) => {
    console.log(data)

    const config = queryConfig.order
      ? omit(
          {
            ...queryConfig,
            search_name: data.search_name
          },
          ['order', 'sort_by']
        )
      : {
          ...queryConfig,
          search_name: data.search_name
        }
    const searchPath = `../${data.search_category === SearchCategory.TOURS ? path.searchTour : path.searchGuide}`
    const searchQuery = createSearchParams(config).toString()
    navigate(`${searchPath}?${searchQuery}`, {
      replace: true
    })
  })

  return { onSubmitSearch, control, trigger, register }
}
