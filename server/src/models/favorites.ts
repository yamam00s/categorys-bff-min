import { Contents, blankContents } from './contents'

export type Favorites = {
  id: string
  contents: Contents
}

export const blankFavorites: Favorites = {
  id: '',
  contents: blankContents
}

