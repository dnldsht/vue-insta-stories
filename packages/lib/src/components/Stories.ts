import { defineComponent, h } from 'vue-demi'
import anime from "animejs";
import Hammer from "hammerjs";
import render from './renders'

import { StoryOptions } from '../types';
import { fadeOut, fadeIn } from "../utils";

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
    currentIndex: {
      handler(val) {
        console.log("watch", val);
        this.index = val;
        this.resetSlide();
      },
    },
  },
  data() {
    const timeline = anime.timeline({
      autoplay: false,
      duration: this.interval,
      easing: "linear",
    });

    return {
      index: this.currentIndex,
      isActive: false,
      timeline: timeline,
    };
  },
  computed: {
    items(): StoryOptions[] {
      return this.stories.map(i => {
        if (typeof i == 'string') return { url: i, type: 'image' }
        else return i
      })
    },
    current(): StoryOptions {
      return this.items[this.index];
    },
  },
  methods: {
    activate() {
      // Start timer
      this.resetSlide();
    },
    deactivate() {
      this.timeline.pause();
    },
    resetSlide() {
      // Jump to beginning of the slide
      this.timeline.pause();
      this.timeline.seek(this.index * this.interval);
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

    tap(e) {
      const x = e.gesture.srcEvent.x;
      const t = window.innerWidth / 3;

      if (x > t) {
        this.nextSlide();
      } else {
        this.previousSlide();
      }
    },
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

    this.hammer = new Hammer.Manager(this.$refs.stories, {
      domEvents: true,
      recognizers: [
        // used as @tap to support stopPropagation
        [Hammer.Tap],

        [Hammer.Press, { time: 1, threshold: 1000000 }],
      ],
    });

    this.hammer.on("press", (e) => {
      this.timeline.pause();
      // hide
      fadeOut(this.$el.getElementsByClassName("timeline")[0]);
      fadeOut(this.$el.getElementsByClassName("header")[0]);
      //this.$emit("TIMELINE_PAUSE");
    });

    this.hammer.on("pressup tap", (e) => {
      this.timeline.play();
      //show
      fadeIn(this.$el.getElementsByClassName("timeline")[0]);
      fadeIn(this.$el.getElementsByClassName("header")[0]);
      //this.$emit("TIMELINE_PLAY");
    });

    this.timeline.seek(this.index * this.interval);
    this.timeline.play();
  },

  render() {
    const slices = this.stories.map((_, key) => h('div', { class: 'slice', key }, h('div', { class: 'progress' },)))

    return h('div', { ref: 'stories', class: 'stories' }, [
      h('div', { class: 'timeline' }, slices),
      //h('div', { class: 'header' }, this.$slots.header()),
      render(this.current)
    ])
  }
});

