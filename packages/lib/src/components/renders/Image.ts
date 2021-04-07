import { StoryOptions } from 'src/types'
import { defineComponent, h } from 'vue-demi'

export default defineComponent({
  props: {
    story: {
      type: Object as () => StoryOptions,
      required: true
    }
  },
  render() {
    const style = {
      width: "auto",
      maxWidth: "100%",
      maxHeight: "100%",
      margin: "auto"
    }

    const imageLoaded = () => {
      this.$emit('play', this.story.url)
    }

    return h('img', { src: this.story.url, style, onLoad: imageLoaded })
  }
})