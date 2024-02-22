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
      limit: queryParams.limit || '16',
      sortBy: queryParams.sortBy,
      order: queryParams.order,
      overallRating: queryParams.overallRating,
      maxPrice: queryParams.maxPrice,
      minPrice: queryParams.minPrice,
      searchName: queryParams.searchName,
      categoryId: queryParams.categoryId,
      start_date: queryParams.start_date,
      end_date: queryParams.end_date
    },
    isUndefined
  )

  return queryConfig
}
