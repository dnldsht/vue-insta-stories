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

interface RenderProps {
  story: StoryOptions
  onPlay: () => void
  onVideoDuration: (duration: number) => void
  isPaused: boolean
}

const render = ({ story, ...otherProps }: RenderProps) => {
  return h(getRender(story.type), { story, ...otherProps })
}

export default render