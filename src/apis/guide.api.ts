import { Guide } from 'src/types/guide.type'
import { SuccessResponseWithPagination } from 'src/types/utils.type'
import http from 'src/utils/http'

const URL_GET_GUIDES = 'guides/search'

const guideApi = {
  searchGuides(params: any) {
    return http.get<SuccessResponseWithPagination<Guide[]>>(URL_GET_GUIDES, { params })
  }
}

export default guideApi
