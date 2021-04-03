<template>
  <div id="app">
    <Carousel>
      <Story>
        <div
          class="slide"
          v-for="i in 2"
          :key="i"
          :style="{ background: colors[i % colors.length] }"
        >
          Story {{ i }}
        </div>
        <!-- <intro-slide class="flex-grow"></intro-slide> -->
      </Story>

      <Story :startIndex="1">
        <div
          class="slide"
          v-for="i in 2"
          :key="i"
          :style="{ background: colors[i % colors.length] }"
        >
          Hi {{ i }}
        </div>

        <div
          class="slide"
          v-for="i in 2"
          :key="i + 4"
          :style="{ background: colors[i % colors.length] }"
        >
          Hi {{ i }}
        </div>
      </Story>
    </Carousel>
  </div>
</template>

<script>
//import { Carousel, Story } from "../../../src/index.js";
// console.log(Carousel);
import Carousel from "../../../src/components/Carousel.vue";
import Story from "../../../src/components/Stories.vue";
// import IntroSlide from "./components/IntroSlide.vue";

export default {
  name: "App",
  components: { Carousel, Story },

  data: () => ({
    colors: ["#DAF7A6", "#FFC300", "#FF5733"],
  }),
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
