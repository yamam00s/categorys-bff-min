export type Content = {
  id: number
  categoryId: number
  title: string
  public_started: string
  public_ended: string
  priority?: number
}

export const blankContents: Content = {
  id: 0,
  categoryId: 0,
  title: '',
  public_started: '',
  public_ended: '',
  priority: 0
}
