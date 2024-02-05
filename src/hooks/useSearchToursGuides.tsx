import { Schema, schema } from 'src/utils/rules'
import useQueryConfig from './useQueryConfig'
import { createSearchParams, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import omit from 'lodash/omit'
import path from 'src/constants/path.constant'

type FormData = Pick<Schema, 'search_name'>
const searchNameSchema = schema.pick(['search_name'])

export default function useSearchToursGuides() {
  const queryConfig = useQueryConfig()
  const navigate = useNavigate()
  const { control, handleSubmit, trigger } = useForm<FormData>({
    defaultValues: {
      search_name: ''
    },
    resolver: yupResolver(searchNameSchema)
  })

  const onSubmitSearch = handleSubmit((data) => {
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
    navigate({
      pathname: path.search,
      search: createSearchParams(config).toString()
    })
  })

  return { onSubmitSearch, control, trigger }
}
