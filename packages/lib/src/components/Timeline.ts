import { StoryOptions } from 'src/types'
import { defineComponent, } from 'vue-demi'
import h from "../utils/h-demi"
import '../main.css'

const Progress = defineComponent({
  props: {
    progress: {
      type: Number,
      required: true
    }
  },
  render() {
    const style = { width: `${this.progress}%` }
    return h('div', { class: 'slice', }, [h('div', { class: 'progress', style })])
  }
})

export default defineComponent({
  props: {
    stories: {
      type: Array as () => Array<StoryOptions>,
      required: true
    },
    currentIndex: {
      type: Number,
      required: true
    },
    isPaused: {
      type: Boolean,
      required: true
    }
  },
  data: () => ({
    count: 0,
    startTime: 0,
    savedTimeStamp: 0,
    deltaPaused: 0,
    lastPaused: 0,
    animFrameId: -1,
  }),
  watch: {
    currentIndex:{
      immediate: true,
      handler() {
        this.count = 0
        this.startTime = 0
        this.deltaPaused = 0
        cancelAnimationFrame(this.animFrameId)
        this.animFrameId = requestAnimationFrame(this.incrementCount)
      },
    },
    isPaused: {
      immediate: true,
      handler(paused) {
        cancelAnimationFrame(this.animFrameId)
        if (paused) {
          this.lastPaused = performance.now()
        } else {
          if (this.lastPaused)
            this.deltaPaused += performance.now() - this.lastPaused
          this.animFrameId = requestAnimationFrame(this.incrementCount)
        }
      }
    }
  },
  computed: {
    currentStory(): StoryOptions {
      return this.stories[this.currentIndex]
    },
  },
  emits: ['storyEnd'],
  methods: {
    storyEnd() {
      this.$emit('storyEnd', this.currentIndex)
    },
    incrementCount(timestamp: number) {
      if (!this.startTime)
        this.startTime = timestamp;
      const runtime = timestamp - this.startTime - this.deltaPaused;
      this.count = (runtime / this.currentStory.duration) * 100;

      if (this.count < 100)
        this.animFrameId = requestAnimationFrame(this.incrementCount)
      else {
        this.storyEnd()
        cancelAnimationFrame(this.animFrameId)
      }
    }
  },
  render() {
    const current = this.currentIndex
    const count = this.count
    const elements = this.stories.map((_, i) => {
      const progress = i == current ? count : (i < current ? 100 : 0)
      const key = i
      return h(Progress, { key, props: { progress } })
    })

    return h('div', { class: 'timeline', ref: 'timeline' }, elements)
  }
})