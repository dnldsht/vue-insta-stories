<template>
  <div id="app">
    <Carousel>
      <Story :start-index="0">
        <intro-slide class="flex-grow"></intro-slide>
      </Story>

      <Story>
        <div
          class="slide"
          v-for="i in 2"
          :key="i"
          :style="{ background: colors[i % colors.length] }"
        >
          Story {{ i }}
        </div>
      </Story>
    </Carousel>
  </div>
</template>

<script>
import Carousel from "../../../src/components/Carousel.vue";
import Story from "../../../src/components/Stories.vue";
import IntroSlide from "./components/IntroSlide.vue";

export default {
  name: "App",
  components: { Carousel, Story, IntroSlide },

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
