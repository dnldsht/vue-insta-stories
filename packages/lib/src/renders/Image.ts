import { StoryOptions } from 'src/types'
import { defineComponent } from 'vue-demi'
import h from "../utils/h-demi"

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

    // this.$emit('action', 'pause', false)

    const imageLoaded = () => {
      // this.$emit('action', 'play')
    }

    const params = {
      style,
      domProps: {
        src: this.story.url
      },
      // on: {
      //   load: imageLoaded
      // }
    }

    return h('img', params)
  }
})