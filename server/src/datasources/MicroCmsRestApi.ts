import { RESTDataSource } from 'apollo-datasource-rest'
import { Contents } from '../models/contents'
import { Arranged } from '../models/arranged'
import cmsConfig from '../.cms.config.json'

export class MicroCmsRestApi extends RESTDataSource {
  constructor() {
    super()
    this.baseURL = 'https://categorys-bff-min.microcms.io/api/v1/'
    this.initialize({} as any) // <===== this one resolve the issue https://github.com/apollographql/apollo-server/issues/3882#issuecomment-693954273
  }

  // fetch
  async fetchCmsContents(endPoint: string) {
    try {
      return await this.get(endPoint, '', {
        headers: { 'X-API-KEY':  cmsConfig.get_api_key },
      })
    } catch(error) {
      console.log(error)
      return null
    }
  }

  async fetchAllContents() {
    const { contents } = await this.fetchCmsContents('contents')
    return contents
      ? contents.map(item => this.contentsReducer(item))
      : []
  }

  async fetchContentsByTitle(selectedTitle: string) {
    const allContents = await this.fetchAllContents()
    return allContents.filter(item => item.title === selectedTitle)
  }

  async fetchArranged() {
    const { contents } = await this.fetchCmsContents('arranged')
    return contents
      ? contents.map(item => this.arrangedReducer(item))
      : []
  }

  // Reducer
  contentsReducer(contents: Contents) {
    return {
      id: contents.id,
      categoryId: contents.categoryId,
      title: contents.title,
      public_started: contents.public_started,
      public_ended: contents.public_ended,
      priority: contents.priority || 0
    }
  }

  arrangedReducer(arranged: Arranged) {
    return {
      id: arranged.id,
      categoryId: arranged.categoryId,
      contents: arranged.contents.map(item => this.contentsReducer(item))
    }
  }
}
