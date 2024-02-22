import { Guide } from 'src/types/guide.type'
import { SuccessResponseWithPagination } from 'src/types/utils.type'
import http from 'src/utils/http'
import { QueryConfig } from 'src/hooks/useQueryConfig'

const URL_SEARCH_GUIDES = 'guides/search'

const guideApi = {
  searchGuides(params: QueryConfig) {
    return http.get<SuccessResponseWithPagination<Guide[]>>(URL_SEARCH_GUIDES, { params })
  }
}

export default guideApi
