import { RESTDataSource } from 'apollo-datasource-rest'
import cmsConfig from '../.cms.config.json'
import { Contents, Arranged, Favorites } from '../generated/graphql'
import { Contents as ContentsModel } from '../models/contents'
import { Arranged as ArrangedModel } from '../models/arranged'
import { Favorite as FavoriteModel  } from '../models/favorites'

export class MicroCmsRestApi extends RESTDataSource {
  constructor() {
    super()
    this.baseURL = 'https://categorys-bff-min.microcms.io/api/v1/'
    this.initialize({} as any) // <===== this one resolve the issue https://github.com/apollographql/apollo-server/issues/3882#issuecomment-693954273
  }

  // fetch
  async fetchCmsContents<T>(endPoint: string): Promise<T | []> {
    try {
      const { contents } =  await this.get(endPoint, '', {
        headers: { 'X-API-KEY':  cmsConfig.get_api_key },
      })
      return contents
    } catch(error) {
      console.log(error)
      return []
    }
  }

  async fetchAllContents() {
    const res = await this.fetchCmsContents<Contents[]>('contents')
    return res.length
      ? res.map(item => this.contentsReducer(item))
      : []
  }

  async fetchSingleContentsById({ id }: { id: string }) {
    const res = await this.fetchCmsContents<Contents[]>('contents')
    const findResultItem = res.find(item => item.id === id)
    return findResultItem
      ? this.contentsReducer(findResultItem)
      : null
  }

  async fetchContentsByTitle(selectedTitle: string) {
    const allContents = await this.fetchAllContents()
    return allContents.filter(item => item.title === selectedTitle)
  }

  async fetchArranged() {
    const res = await this.fetchCmsContents<Arranged[]>('arranged')
    return res.length
      ? res.map(item => this.arrangedReducer(item))
      : []
  }

  async fetchFavorites() {
    const res = await this.fetchCmsContents<Favorites[]>('favorites')
    return res.length
      ? res.map(item => this.favoritesReducer(item))
      : []
  }

  async fetchFavoritesByCategoryIds() {
    const res = await this.fetchCmsContents<Favorites[]>('favorites')
    return res.length
      ? this.favoritesByCategoryIdsReducer(res)
      : []
  }

  // Reducer
  contentsReducer(contents: ContentsModel) {
    return {
      id: contents.id,
      categoryId: contents.categoryId,
      title: contents.title,
      public_started: contents.public_started,
      public_ended: contents.public_ended,
      priority: contents.priority || 0
    }
  }

  arrangedReducer(arranged: ArrangedModel) {
    return {
      id: arranged.id,
      categoryId: arranged.categoryId,
      contents: arranged!.contents.map(item => this.contentsReducer(item))
    }
  }

  favoritesReducer(favorite: FavoriteModel) {
    return {
      id: favorite.id,
      contents: this.contentsReducer(favorite.contents),
    }
  }

  favoritesByCategoryIdsReducer(favorites: FavoriteModel[]) {
    const categoryIds = [...new Set(favorites.map(item => item.contents.categoryId))]
    return categoryIds.map(categoryId => {
      return {
        categoryId: categoryId,
        contents: (favorites.filter(favorite => favorite.contents.categoryId === categoryId)).map(item => this.contentsReducer(item.contents))
      }
    })
  }
}
