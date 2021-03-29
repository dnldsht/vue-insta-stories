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
import anime from "animejs";
import Hammer from "hammerjs";
import VNode from "./VNode";

export default {
  components: { VNode },
  name: "VueInstaStory",
  props: {
    duration: {
      type: Number,
      default: 2000,
    },
    startIndex: {
      type: Number,
      default: 0,
    },
  },
  data() {
    const timeline = anime.timeline({
      autoplay: false,
      duration: this.duration,
      easing: "linear",
    });

    return {
      currentSlideIndex: this.startIndex,
      isActive: false,
      timeline: timeline,
    };
  },
  computed: {
    slides() {
      const slot = this.$slots.default;

      // slots are functions in vue 3
      if (typeof slot == "function") {
        return slot()
          .filter(({ type }) => {
            if (typeof type == "symbol")
              // filters comments in slot
              return !["Symbol(Comment)"].includes(type.toString());
            return true;
          })
          .map((n) => (n.children instanceof Array ? n.children : [n]))
          .reduce((nodes, n) => [...nodes, ...n], []);
      }

      return slot;
    },
    current() {
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
      this.timeline.seek(this.currentSlideIndex * this.duration);
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
  mounted() {
    let $timeline = this.$el.getElementsByClassName("timeline")[0];

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

    this.timeline.seek(this.currentSlideIndex * this.duration);
    this.timeline.play();
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="css">
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
