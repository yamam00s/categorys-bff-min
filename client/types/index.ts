export type MicroCmsItem<T> = {
  contents: T
}

export type Status = {
  id: string
  name: string
}

export type Contents = {
  title: string
  description: string
  image: { url: string }
  status: { id: string }[]
}

export type ContentsList = MicroCmsItem<Contents>
