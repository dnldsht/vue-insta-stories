<template>
  <div @tap="tap" class="stories">
    <div class="timeline">
      <div class="slice" v-for="(slide, i) in slides" :key="i">
        <div class="progress">&nbsp;</div>
      </div>
    </div>

    <div class="header">
      <slot name="header"></slot>
    </div>

    <VNode :node="current"></VNode>
  </div>
</template>

<script>
import anime from "animejs";
import Hammer from "hammerjs";
import VNode from "./VNode";
import { getNodes, fadeOut, fadeIn } from "../utils";

export default {
  components: { VNode },
  name: "Stories",
  props: {
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
    slides() {
      return getNodes(this.$slots.default);
    },
    current() {
      return this.slides[this.index];
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
      if (this.index < this.slides.length - 1) {
        this.index++;
        this.resetSlide();
      } else {
        this.nextStory();
      }
    },
    previousSlide() {
      if (this.index > 0) {
        this.index--;
        this.resetSlide();
      } else {
        this.previousStory();
      }
    },
    nextStory() {
      this.$emit("NEXT_STORY");
    },
    previousStory() {
      this.$emit("PREVIOUS_STORY");
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
    this.slides.forEach((slide, index) => {
      // vue3 && vue2 support
      const attrs = slide.props ?? slide.data?.attrs ?? {};

      const slices = $timeline.getElementsByClassName("slice");
      console.log(attrs);
      this.timeline.add({
        targets: slices[index].getElementsByClassName("progress"),
        duration: attrs.interval,
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
          if (index === this.slides.length - 1) {
            this.nextStory();
            this.$emit("onAllStoriesEnd");
          }
        },
      });
    });

    this.hammer = new Hammer.Manager(this.$el, {
      domEvents: true,
      recognizers: [
        [Hammer.Pan, { direction: Hammer.DIRECTION_HORIZONTAL }],
        [Hammer.Press, { time: 1, threshold: 1000000 }],

        // used as @tap to support stopPropagation
        [Hammer.Tap],
      ],
    });

    this.hammer.on("press", (e) => {
      this.timeline.pause();
      // hide
      fadeOut(this.$el.getElementsByClassName("timeline")[0])
      fadeOut(this.$el.getElementsByClassName("header")[0])
      //this.$emit("TIMELINE_PAUSE");
      
    });

    this.hammer.on("pressup tap", (e) => {
      this.timeline.play();
      //show
      fadeIn(this.$el.getElementsByClassName("timeline")[0]);
      fadeIn(this.$el.getElementsByClassName("header")[0])
      //this.$emit("TIMELINE_PLAY");
    });

    // Handle swipe
    this.hammer.on("pan", (event) => {
      if (event.isFinal) {
        if (event.deltaX < 0) {
          this.nextStory();
        } else if (event.deltaX > 0) {
          this.previousStory();
        }
      }
    });

    this.timeline.seek(this.index * this.interval);
    this.timeline.play();
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="css">
.stories {
  float: left;
  position: relative;
  height: 100vh;
  width: 100vw;
  z-index: 1;
  display: flex;
  flex-direction: column;
}
.header {
  position: absolute;
  z-index: 10;
  top: 22px;
  left: 16px;
}

.timeline {
  position: absolute;
  display: flex;
  flex-grow: 0;
  width: 100%;
  background: -webkit-gradient(linear, top,bottom, from(rgba(0,0,0,0.2)), to(rgba(0,0,0,0)));
  background: linear-gradient(to bottom, rgba(0,0,0,0.2), rgba(0,0,0,0));
  padding-bottom: 8px; /* To add more space for gradient */
  z-index: 10;
}

.timeline > .slice {
  background: rgba(255, 255, 255, 0.5);
  height: 2px;
  border-radius: 2px;
  margin: 6px 3px;
  width: 100%;
}

.timeline > .slice > .progress {
  background: #fff;
  height: 2px;
  border-radius: 2px;
  width: 0%;
}

</style>
