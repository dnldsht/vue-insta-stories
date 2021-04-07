import { StoryOptions } from 'src/types'
import { defineComponent, h } from 'vue-demi'

export default defineComponent({
  props: {
    item: {
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
    return h('img', { src: this.item.url, style })
  }
})