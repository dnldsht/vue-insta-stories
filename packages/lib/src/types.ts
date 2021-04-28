export interface SeeMoreOptions {
  label: string
}

export interface StoryOptions {
  url: string
  type: string
  duration: number
  template?: string
  seeMore?: SeeMoreOptions | boolean
}