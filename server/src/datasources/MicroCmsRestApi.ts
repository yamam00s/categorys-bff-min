import { RESTDataSource } from 'apollo-datasource-rest'
import { Contents } from '../models/contents'
import { Arranged } from '../models/arranged'
import { Favorite } from '../models/favorites'
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
      return []
    }
  }

  async fetchAllContents() {
    const { contents } = await this.fetchCmsContents('contents')
    return contents.length
      ? contents.map(item => this.contentsReducer(item))
      : []
  }

  async fetchSingleContentsById({ id }: { id: string }) {
    const { contents } = await this.fetchCmsContents('contents')
    const findResultItem = contents.find(item => item.id === id)
    return findResultItem
      ? this.contentsReducer(findResultItem)
      : null
  }

  async fetchContentsByTitle(selectedTitle: string) {
    const allContents = await this.fetchAllContents()
    return allContents.filter(item => item.title === selectedTitle)
  }

  async fetchArranged() {
    const { contents } = await this.fetchCmsContents('arranged')
    return contents.length
      ? contents.map(item => this.arrangedReducer(item))
      : []
  }

  async fetchFavorites() {
    const { contents } = await this.fetchCmsContents('favorites')
    return contents.length
      ? contents.map(item => this.favoritesReducer(item))
      : []
  }

  async fetchFavoritesByCategoryIds() {
    const { contents } = await this.fetchCmsContents('favorites')
    return contents.length
      ? this.favoritesByCategoryIdsReducer(contents)
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

  favoritesReducer(favorite: Favorite) {
    return {
      id: favorite.id,
      contents: this.contentsReducer(favorite.contents),
    }
  }

  favoritesByCategoryIdsReducer(favorites: Favorite[]) {
    const categoryIds = [...new Set(favorites.map(item => item.contents.categoryId))]
    return categoryIds.map(categoryId => {
      return {
        categoryId: categoryId,
        contents: (favorites.filter(favorite => favorite.contents.categoryId === categoryId)).map(item => this.contentsReducer(item.contents))
      }
    })
  }
}
