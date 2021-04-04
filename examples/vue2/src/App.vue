<template>
  <div id="app">
    <StoriesCollection>
      <!-- <Story>
        <div
          class="slide"
          v-for="i in 2"
          :key="i"
          :style="{ background: colors[i % colors.length] }"
        >
          Story {{ i }}
        </div>
       
      </Story> -->

      <Stories :current-index.sync="currentIndex">
        <WithSeeMore v-for="i in 10" :key="i" @action="open">
          <div class="slide" :style="{ background: colors[i % colors.length] }">
            Hi {{ i - 1 }}
          </div>
        </WithSeeMore>

        <!-- <div
          class="slide"
          v-for="i in 2"
          :key="i + 4"
          :style="{ background: colors[i % colors.length] }"
        >
          Hi {{ i - 1 }}
        </div> -->
      </Stories>
    </StoriesCollection>
  </div>
</template>

<script>
//import { Carousel, Story } from "../../../src/index.js";
// console.log(Carousel);
import StoriesCollection from "../../../src/components/StoriesCollection.vue";
import Stories from "../../../src/components/Stories.vue";
import WithSeeMore from "../../../src/components/WithSeeMore.vue";
// import IntroSlide from "./components/IntroSlide.vue";

export default {
  name: "App",
  components: { StoriesCollection, Stories, WithSeeMore },

  data: () => ({
    currentIndex: 4,
    colors: ["#DAF7A6", "#FFC300", "#FF5733"],
  }),

  watch: {
    currentIndex(val) {
      console.log("watchapp", val);
    },
  },
  mounted() {
    setTimeout(() => {
      //this.$set()
      this.currentIndex = 0;
      console.log("back");
    }, 2000);
  },
  methods: {
    print(currentIndex) {
      console.log(currentIndex, "wee");
    },
    open() {
      console.log("open");
    },
  },
};
</script>
<style scoped>
.slide {
  /* Take the rest of the page */
  flex-grow: 1;

  /* Center align */
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
