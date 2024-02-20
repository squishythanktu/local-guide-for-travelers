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
      page: queryParams.page || '0',
      limit: queryParams.limit || '8',
      sortBy: queryParams.sortBy,
      order: queryParams.order,
      overallRating: queryParams.overallRating,
      max_price: queryParams.max_price,
      min_price: queryParams.min_price,
      searchName: queryParams.searchName,
      category: queryParams.category,
      start_date: queryParams.start_date,
      end_date: queryParams.end_date
    },
    isUndefined
  )

  return queryConfig
}
