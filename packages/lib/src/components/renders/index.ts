import { StoryOptions } from 'src/types'
import { h, Slots } from 'vue-demi'
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

const render = ({ story, ...otherProps }: RenderProps, $slots: Slots) => {

  const { type, template } = story
  if (type === 'custom') {
    console.log(story)
    if (!template) throw new Error("if you use custom type you must define `template`")
    const slot = $slots[template]
    if (!slot) throw new Error(`unable to find the template '${template}'`)

    return slot({ story, ...otherProps })

  }
  return h(getRender(type), { story, ...otherProps })
}

export default render