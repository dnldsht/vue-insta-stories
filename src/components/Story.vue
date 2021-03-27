<template>
  <div class="story">
    <div class="timeline">
      <div class="slice" v-for="(slide, i) in slides" :key="i">
        <div class="progress">&nbsp;</div>
      </div>
    </div>

    <VNode :node="current"></VNode>
  </div>
</template>

<script>
import anime from "animejs/lib/anime.es.js";
import Hammer from "hammerjs";
import VNode from "./VNode";

const SLIDE_DURATION = 2000;

export default {
  components: { VNode },
  name: "VueInstaStory",
  data() {
    const timeline = anime.timeline({
      autoplay: false,
      duration: SLIDE_DURATION,
      easing: "linear",
    });

    return {
      currentSlideIndex: 0,
      isActive: false,
      timeline: timeline,
    };
  },
  computed: {
    slides() {
      const d = this.$slots.default;
      if (typeof d == "function") {
        // vue 3 is weird
        const [{ children }] = d();
        console.log(children);
        return children;
      }

      return d;
    },
    current() {
      console.log(this.slides[this.currentSlideIndex]);
      return this.slides[this.currentSlideIndex];
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
      this.timeline.seek(this.currentSlideIndex * SLIDE_DURATION);
      this.timeline.play();
    },
    nextSlide() {
      if (this.currentSlideIndex < this.slides.length - 1) {
        this.currentSlideIndex++;
        this.resetSlide();
      } else {
        this.nextStory();
      }
    },
    previousSlide() {
      if (this.currentSlideIndex > 0) {
        this.currentSlideIndex--;
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
  },
  async mounted() {
    //if (1 === 1) return true;
    //await this.$nextTick();
    let $timeline = this.$el.getElementsByClassName("timeline")[0];
    //console.log($timeline);

    // Add progress bars to the timeline animation group
    this.slides.forEach((color, index) => {
      const slices = $timeline.getElementsByClassName("slice");
      //console.log(slices);
      this.timeline.add({
        targets: slices[index].getElementsByClassName("progress"),
        width: "100%",
        changeBegin: () => {
          // Update the Vue componenet state when progress bar begins to play
          this.currentSlideIndex = index;
        },
        complete: () => {
          // Move to the next story when finished playing all slides
          if (index === this.slides.length - 1) {
            this.nextStory();
          }
        },
      });
    });

    this.hammer = new Hammer.Manager(this.$el, {
      recognizers: [
        [Hammer.Pan, { direction: Hammer.DIRECTION_HORIZONTAL }],
        [Hammer.Tap],
        [Hammer.Press, { time: 1, threshold: 1000000 }],
      ],
    });

    this.hammer.on("press", () => {
      this.timeline.pause();
    });

    this.hammer.on("pressup tap", () => {
      this.timeline.play();
    });

    // Tap on the side to navigate between slides
    this.hammer.on("tap", (event) => {
      if (event.center.x > window.innerWidth / 3) {
        this.nextSlide();
      } else {
        this.previousSlide();
      }
    });
    this.timeline.play();

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
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="css" scoped>
.story {
  float: left;
  position: relative;
  height: 100vh;
  width: 100vw;
  z-index: 1;
  display: flex;
  flex-direction: column;
}

.timeline {
  position: absolute;
  display: flex;
  flex-grow: 0;
  width: 100%;
}

.timeline > .slice {
  background: rgba(255, 255, 255, 0.9);
  height: 2px;
  border-radius: 2px;
  margin: 6px 3px;
  width: 100%;
}

.timeline > .slice > .progress {
  background: #555;
  height: 2px;
  border-radius: 2px;
  width: 0%;
}
</style>
