<template>
  <div id="app">
    <Carousel>
      <!-- <Stories :interval="10000">
        <intro-slide class="flex-grow"></intro-slide>
      </Stories> -->

      <Stories :interval="5000">
        <div
          class="slide"
          v-for="i in 10"
          :key="i"
          :style="{ background: colors[i % colors.length] }"
        >
          Story {{ i }}
        </div>
      </Stories>
    </Carousel>
  </div>
</template>

<script>
import Carousel from "../../../src/components/Carousel.vue";
import Stories from "../../../src/components/Stories.vue";
import IntroSlide from "./components/IntroSlide.vue";

export default {
  name: "App",
  components: { Carousel, Stories, IntroSlide },

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
