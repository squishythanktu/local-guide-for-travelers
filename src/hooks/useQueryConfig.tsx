import useQueryParams from './useQueryParams'
import isUndefined from 'lodash/isUndefined'
import omitBy from 'lodash/omitBy'
import { TourListConfig } from 'src/types/tour.type'

export type QueryConfig = {
  [key in keyof TourListConfig]: string
}

export default function useQueryConfig() {
  const queryParams: QueryConfig = useQueryParams()
  const queryConfig: QueryConfig = omitBy(
    {
      page: queryParams.page || '1',
      limit: queryParams.limit || '20',
      sort_by: queryParams.sort_by,
      order: queryParams.order,
      rating_filter: queryParams.rating_filter,
      max_price: queryParams.max_price,
      min_price: queryParams.min_price,
      search_name: queryParams.search_name,
      category: queryParams.category,
      start_date: queryParams.start_date,
      end_date: queryParams.end_date
    },
    isUndefined
  )

  return queryConfig
}
