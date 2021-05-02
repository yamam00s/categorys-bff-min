import { RESTDataSource } from 'apollo-datasource-rest'
import { Content } from '../models/contents'
import cmsConfig from '../.cms.config.json'

export class MicroCmsRestApi extends RESTDataSource {
  constructor() {
    super()
    this.baseURL = 'https://categorys-bff-min.microcms.io/api/v1/'
    this.initialize({} as any) // <===== this one resolve the issue https://github.com/apollographql/apollo-server/issues/3882#issuecomment-693954273
  }

  async getContents() {
    try {
      const response = await this.get('contents', '', {
        headers: { 'X-API-KEY':  cmsConfig.get_api_key },
      })
      const { contents } = response
      return contents.map(content => this.contentsReducer(content))
    } catch(error) {
      console.log(error)
      return []
    }
  }

  async getContentsByTitle(selectedTitle: string) {
    const allContents = await this.getContents()
    return allContents.filter(content => content.title === selectedTitle)
  }

  contentsReducer(content: Content) {
    return {
      id: content.id!,
      categoryId: content.categoryId,
      title: content.title,
      public_started: content.public_started,
      public_ended: content.public_ended,
      priority: content.priority || 0
    }
  }
}
