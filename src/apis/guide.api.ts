import { Guide } from 'src/types/guide.type'
import { SuccessResponse, SuccessResponseWithPagination } from 'src/types/utils.type'
import http from 'src/utils/http'
import { QueryConfig } from 'src/hooks/useQueryConfig'

const URL_SEARCH_GUIDES = 'guides/search'
const GUIDE = 'guides'

const guideApi = {
  searchGuides(params: QueryConfig) {
    return http.get<SuccessResponseWithPagination<Guide[]>>(URL_SEARCH_GUIDES, { params })
  },
  getProfile(id: string) {
    return http.get<SuccessResponse<Guide>>(`${GUIDE}/${id}`)
  }
}

export default guideApi
