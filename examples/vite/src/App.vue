<template>
  <div id="app">
    <StoriesCollection :currentIndex="1">
      <Stories :interval="10000">
        <intro-slide class="flex-grow"></intro-slide>
      </Stories>

      <!-- v-model:currentIndex="currentIndex" -->
      <Stories :interval="5000">
        <template #header> <PersonHeader /> </template>

        <div
          class="slide"
          v-for="i in 10"
          :key="i"
          :style="{ background: colors[i % colors.length] }"
        >
          Story {{ i - 1 }}
        </div>
      </Stories>
    </StoriesCollection>
  </div>
</template>

<script>
import StoriesCollection from "../../../src/components/StoriesCollection.vue";
import Stories from "../../../src/components/Stories.vue";
import IntroSlide from "./components/IntroSlide.vue";
import PersonHeader from "./components/PersonHeader.vue";

export default {
  name: "App",
  components: { StoriesCollection, Stories, IntroSlide, PersonHeader },

  data: () => ({
    currentIndex: 3,
    colors: ["#DAF7A6", "#FFC300", "#FF5733"],
  }),
  watch: {
    currentIndex(val) {
      console.log("watchapp", val);
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
