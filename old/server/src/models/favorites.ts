import { Contents, blankContents } from './contents'

export type Favorite = {
  id: string
  contents: Contents
}

export const blankFavorite: Favorite = {
  id: '',
  contents: blankContents
}

