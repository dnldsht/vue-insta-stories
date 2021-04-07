import { StoryOptions } from 'src/types'
import { h } from 'vue-demi'
import Image from './Image'
import Video from './Video'
// export { Image }

const getRender = (type: string) => {
  switch (type) {
    case 'image':
      return Image
    case 'video':
      return Video
    default:
      throw new Error(`Did not find a render for type ${type}`)
  }
}

const render = (item: StoryOptions) => {
  return h(getRender(item.type), { item })
}

export default render