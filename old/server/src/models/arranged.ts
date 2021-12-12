import { Contents, blankContents } from './contents'

export type Arranged = {
  id: string
  categoryId: number
  contents: Contents[]
}

export const blankArranged: Arranged = {
  id: '',
  categoryId: 0,
  contents: [blankContents]
}

