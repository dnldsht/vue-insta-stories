import { defineComponent, h } from 'vue-demi'
import render from '../renders'

import Timeline from './Timeline'

import { StoryOptions } from '../types';
import { fadeOut, fadeIn, getX } from "../utils";

import '../main.css'

export default defineComponent({
  name: "Stories",
  props: {
    stories: {
      type: Array as () => Array<StoryOptions | string>,
      required: true
    },
    interval: {
      type: Number,
      default: 10000,
    },
    currentIndex: {
      type: Number,
      default: 0,
    },
  },
  watch: {
    currentIndex(val) {
      this.index = val;
    },
    paused(val) {
      if (val) this.pause()
      else this.play()
    },
    stories: {
      immediate: true,
      handler(val: Array<StoryOptions | string>) {
        this.items = val.map(i => {
          let defaults = {
            duration: this.interval,
            type: 'image',
          }

          if (typeof i == 'string') return { ...defaults, url: i }
          else return { ...defaults, ...i }
        })
      }
    }
  },
  data() {
    return {
      index: this.currentIndex,
      paused: false,
      mouseDownTimeout: undefined as NodeJS.Timeout | undefined,
      items: [] as StoryOptions[]
    };
  },

  methods: {
    nextSlide() {
      if (this.index < this.stories.length - 1) {
        this.index++;
      }
    },
    previousSlide() {
      if (this.index > 0) {
        this.index--;
      }
    },
    togglePause() {
      this.paused = !this.paused
    },
    pause(anim = true) {
      if (anim) {
        // TODO: delay and check if is still paused
        fadeOut(this.$refs.timeline as HTMLElement)
        fadeOut(this.$refs.header as HTMLElement)
      }
    },
    play(anim = true) {
      // this.timeline.play()
      if (anim) {
        fadeIn(this.$refs.timeline as HTMLElement)
        fadeIn(this.$refs.header as HTMLElement)
      }
    },
    storyStart(index: number) {
      this.$emit('storyStart', index)
    },
    storyEnd(index: number) {
      this.nextSlide()
      this.$emit('storyEnd', index)
    },
    allStoriesEnd() {
      this.$emit('allStoriesEnd',)
    },
  },

  render() {
    const story = this.items[this.index]

    const timelineProps = {
      stories: this.items,
      currentIndex: this.index,
      isPaused: this.paused,
      onStoryStart: this.storyStart,
      onStoryEnd: this.storyEnd,
      onAllStoriesEnd: this.allStoriesEnd,
    }


    // story
    const onAction = (action: string, data?: any) => {

      switch (action) {
        case 'play':
          //this.play(false)
          break
        case 'pause':
          this.pause(false)
          break
        case 'duration':
          const duration = data as number
          this.items[this.index].duration = duration
          break
        default:
          console.log(action, data)
      }
    }


    // stories event handlers
    const mouseDown = (e: MouseEvent | TouchEvent) => {
      e.preventDefault()
      this.mouseDownTimeout = setTimeout(() => this.togglePause(), 150)
    }

    const mouseUp = (e: MouseEvent | TouchEvent) => {
      e.preventDefault()
      this.mouseDownTimeout && clearTimeout(this.mouseDownTimeout)
      if (this.paused) this.paused = false
      else {
        const x = getX(e)
        const t = window.innerWidth / 3;
        if (x > t) {
          this.nextSlide();
        } else {
          this.previousSlide();
        }
      }
    }

    const storiesEvents = {
      onTouchstart: mouseDown,
      onTouchend: mouseUp,
      onMousedown: mouseDown,
      onMouseup: mouseUp
    }


    const renderProps =
      { story, onAction, isPaused: this.paused }

    const header = this.$slots.header

    return h('div', { ref: 'stories', class: 'stories', ...storiesEvents }, [
      h('div', { class: 'timeline', ref: 'timeline' }, h(Timeline, timelineProps)),
      header ? h('div', { class: 'header', ref: 'header' }, header()) : null,
      render(renderProps, this.$slots)
    ])
  }
});

