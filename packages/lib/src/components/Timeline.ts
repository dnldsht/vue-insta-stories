import { StoryOptions } from 'src/types'
import { defineComponent, h } from 'vue-demi'
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
    return h('div', { class: 'slice', }, h('div', { class: 'progress', style }))
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
    animFrameId: -1
  }),
  watch: {
    currentIndex(val) {
      this.count = 0
      this.startTime = 0
      cancelAnimationFrame(this.animFrameId)
      this.animFrameId = requestAnimationFrame(this.incrementCount)
    },
    isPaused: {
      immediate: true,
      handler(paused) {
        cancelAnimationFrame(this.animFrameId)

        if (!paused)
          this.animFrameId = requestAnimationFrame(this.incrementCount)
      }
    }
  },
  computed: {
    currentStory(): StoryOptions {
      return this.stories[this.currentIndex]
    },
  },
  emits: ['storyStart', 'storyEnd', 'allStoriesEnd'],
  methods: {
    storyStart() {
      this.$emit('storyStart', this.currentIndex)
    },
    storyEnd() {
      this.$emit('storyEnd', this.currentIndex)

    },
    allStoriesEnd() {
      this.$emit('allStoriesEnd', this.currentIndex)
    },
    incrementCount(timestamp) {
      if (this.count == 0) this.storyStart()
      if (!this.startTime) {
        this.startTime = timestamp;
      }
      const runtime = timestamp - this.startTime;
      
      
      this.count = (runtime / this.currentStory.duration) * 100;

      if (this.count < 100)
        this.animFrameId = requestAnimationFrame(this.incrementCount)
      else {
        this.storyEnd()
        if (this.currentIndex == this.stories.length - 1)
          this.allStoriesEnd()
        cancelAnimationFrame(this.animFrameId)
      }
    }
  },
  render() {
    const current = this.currentIndex
    const count = this.count
    console.log("render c: ", count);
    return this.stories.map((_, i) => {
      const progress = i == current ? count : (i < current ? 100 : 0)
      const key = i
      return h(Progress, { key, progress })
    })
  }
})