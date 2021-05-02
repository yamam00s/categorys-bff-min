import { RESTDataSource } from 'apollo-datasource-rest'
import { Content } from '../models/contents'

export class MicroCmsRestApi extends RESTDataSource {
  constructor() {
    super()
    this.baseURL = 'https://categorys-bff-min.microcms.io/api/v1/'
  }

  async getContents() {
    const response = await this.get('contents')
    return Array.isArray(response)
    ? response.map(content => this.contentsReducer(content))
    : []
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
