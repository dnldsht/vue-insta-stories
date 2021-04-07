import { defineComponent, h } from 'vue-demi'
import anime from "animejs";
import render from './renders'

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
      default: 2000,
    },
    currentIndex: {
      type: Number,
      default: 0,
    },
  },
  watch: {
    currentIndex(val) {
      console.log("watch", val);
      this.index = val;
      this.resetSlide();

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
    const timeline = anime.timeline({
      autoplay: false,
      duration: this.interval,
      easing: "linear",
    });

    return {
      index: this.currentIndex,
      timeline: timeline,
      paused: false,
      mouseDownTimeout: undefined as NodeJS.Timeout | undefined,
      items: [] as StoryOptions[]
    };
  },

  methods: {
    resetSlide() {
      this.timeline.pause();
      const offset = this.items.slice(0, this.index).reduce((tot, { duration }) => tot + duration, 0)
      this.timeline.seek(offset);
      this.timeline.play();
    },
    nextSlide() {
      if (this.index < this.stories.length - 1) {
        this.index++;
        this.resetSlide();
      }
    },
    previousSlide() {
      if (this.index > 0) {
        this.index--;
        this.resetSlide();
      }
    },
    togglePause() {
      this.paused = !this.paused
    },

    pause(anim = true) {
      this.timeline.pause()

      if (anim) {


        // TODO: delay and check if is still paused
        fadeOut(this.$refs.timeline as HTMLElement)
        fadeOut(this.$refs.header as HTMLElement)
      }
    },

    play(anim = true) {

      this.timeline.play()
      if (anim) {
        fadeIn(this.$refs.timeline as HTMLElement)
        fadeIn(this.$refs.header as HTMLElement)
      }
    }
  },
  mounted() {

    let $timeline = this.$el.getElementsByClassName("timeline")[0];

    // Add progress bars to the timeline animation group
    this.items.forEach((story, index) => {

      const slices = $timeline.getElementsByClassName("slice");
      // console.log(attrs);
      this.timeline.add({
        targets: slices[index].getElementsByClassName("progress"),
        duration: story.duration,
        width: "100%",
        changeBegin: () => {
          // Update the Vue componenet state when progress bar begins to play
          this.index = index;
          this.$emit("onStoryStart", index);
          this.$emit("update:currentIndex", index);
        },
        changeComplete: () => {
          this.$emit("onStoryEnd", index);
        },
        complete: () => {
          // Move to the next story when finished playing all slides
          if (index === this.stories.length - 1) {
            this.$emit("onAllStoriesEnd");
          }
        },
      });
    });

    this.timeline.play();
  },

  render() {
    const slices = this.items.map((_, key) => h('div', { class: 'slice', key }, h('div', { class: 'progress' })))
    const story = this.items[this.index]

    // story
    const onAction = (action: string, data?: any) => {

      switch (action) {
        case 'play':
          this.play(false)
          break
        case 'pause':
          this.pause(false)
          break
        case 'duration':
          const duration = data as number
          // TODO jibo divertiti
          console.log(duration)
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
      h('div', { class: 'timeline', ref: 'timeline' }, slices),
      header ? h('div', { class: 'header', ref: 'header' }, header()) : null,
      render(renderProps, this.$slots)
    ])
  }
});

