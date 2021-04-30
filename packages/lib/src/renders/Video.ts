import { StoryOptions } from 'src/types'
import { defineComponent } from 'vue-demi'
import h from "../utils/h-demi"

export default defineComponent({
  props: {
    story: {
      type: Object as () => StoryOptions,
      required: true
    },
    isPaused: {
      type: Boolean,
      required: true
    }
  },
  watch: {
    isPaused(val) {
      if (val) this.vid.pause()
      else this.vid.play()
    }
  },
  data: () => ({
    muted: false
  }),
  computed: {
    vid(): HTMLVideoElement {
      return this.$el as HTMLVideoElement
    }
  },
  render() {
    const style = {
      width: "auto",
      maxWidth: "100%",
      maxHeight: "100%",
      margin: "auto"
    }

    const videoAttrs = {
      controls: true,
      autoPlay: true,
      playsInline: true,
      muted: this.muted,
      'webkit-playsinline': true
    }

    const loadeddata = async () => {

      this.$emit('action', 'duration', this.vid.duration * 1000)
      try {
        await this.vid.play()
      } catch (e) {
        // if autoplay fails 
        this.muted = true
        this.$nextTick(async () => await this.vid.play())
      }
    }

    this.$emit('action', 'pause')

    const playing = () => {
      this.$emit('action', 'play')
    }

    const params = {
      style,
      domProps: {
        src: this.story.url,
        ...videoAttrs
      },
      on: {
        loadeddata, playing
      },
    }

    return h('video', params)
  }
})