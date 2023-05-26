import { defineComponent } from 'vue-demi'
import render from '../renders'

import Timeline from './Timeline'
import wrapWithSeeMore from './WithSeeMore'

import { StoryOptions } from '../types';
import { fadeOut, fadeIn, getX } from "../utils";
import h, { slot } from "../utils/h-demi"

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
      default: 2000,
    },
    currentIndex: {
      type: Number,
      default: 0,
    },
    isPaused: {
      type: Boolean,
      required: false
    },
    loop: {
      type: Boolean,
      default: false,
      required: false,
    }
  },
  emits: ['storyStart', 'storyEnd', 'allStoriesEnd', 'update:currentIndex', 'update:isPaused', 'seeMore'],
  watch: {
    currentIndex(val) {
      this.index = val;
    },
    isPaused: {
      immediate: true,
      handler(val) {
        this.paused = val
      },
    },
    paused(val) {
      if (val) this.pause()
      else this.play()
      this.$emit('update:isPaused', val)
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
      } else if (this.loop) {
        this.index = 0;
      }
    },
    previousSlide() {
      if (this.index > 0)
        this.index--;
      else if (this.loop)
        this.index = this.stories.length - 1;
    },
    togglePause() {
      this.paused = !this.paused
    },
    pause() {
      fadeOut((this.$refs.timeline as any).$el as HTMLElement)
      if (this.$refs.header)
        fadeOut(this.$refs.header as HTMLElement)
    },
    play() {
      fadeIn((this.$refs.timeline as any).$el as HTMLElement)
      if (this.$refs.header)
        fadeIn(this.$refs.header as HTMLElement)
    },
    storyStart(index: number) {
      this.$emit('storyStart', index)
      this.$emit('update:currentIndex', index)
    },
    storyEnd(index: number) {
      this.nextSlide()
      this.$emit('storyEnd', index)
    },
    allStoriesEnd() {
      if (this.loop) {
        this.index = 0;
      } else this.$emit('allStoriesEnd')
    },
  },

  render() {
    const story = this.items[this.index]

    const timelineProps = {

      props: {
        stories: this.items,
        currentIndex: this.index,
        isPaused: this.paused,
      },
      on: {
        storyStart: this.storyStart,
        storyEnd: this.storyEnd,
        allStoriesEnd: this.allStoriesEnd,
      }
    }


    // story
    const onAction = (action: string, data?: any) => {


      switch (action) {
        case 'play':
          //this.paused = false
          //this.play()
          break
        case 'pause':
          //this.paused = true
          //this.pause()
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
        const { width } = (this.$refs.stories as HTMLElement).getBoundingClientRect()
        const t = width / 3;
        if (x > t) {
          this.nextSlide();
        } else {
          this.previousSlide();
        }
      }
    }

    const storiesEvents = {
      touchstart: mouseDown,
      touchend: mouseUp,
      mousedown: mouseDown,
      mouseup: mouseUp
    }

    const onSeeMore = () => {
      this.paused = true
      this.$emit('seeMore', story)
    }

    const renderProps =
      { story, onAction, isPaused: this.paused }

    const header = this.$slots.header

    const storyVnode = render(renderProps, this.$slots)
    return h('div', { ref: 'stories', class: 'vue-insta-stories', on: storiesEvents }, [
      h(Timeline, { ref: 'timeline', ...timelineProps }),
      //h('div', { class: 'timeline', ref: 'timeline' }, [h(Timeline, timelineProps)]),
      header ? h('div', { class: 'header', ref: 'header' }, slot(header, { story })) : null,
      wrapWithSeeMore(storyVnode, story.seeMore, onSeeMore)
    ])
  }
});

