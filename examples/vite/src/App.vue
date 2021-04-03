<template>
  <div id="app">
    <StoriesCollection :currentIndex="0">
      <Stories v-bind="options">
        <WithSeeMore @action="open">
          <intro-slide class="flex-grow"></intro-slide>
        </WithSeeMore>
      </Stories>
      <Stories :interval="5000">
        <template #header> <PersonHeader /> </template>

        <WithSeeMore
          v-for="i in 10"
          :key="i"
          :enabled="i % 2 == 0"
          @action="open"
        >
          <div class="story" :style="{ background: colors[i % colors.length] }">
            Story {{ i - 1 }}
          </div>
        </WithSeeMore>
      </Stories>
    </StoriesCollection>
  </div>
</template>

<script>
import StoriesCollection from "../../../src/components/StoriesCollection.vue";
import Stories from "../../../src/components/Stories.vue";
import WithSeeMore from "../../../src/components/WithSeeMore.vue";
import IntroSlide from "./components/IntroSlide.vue";
import PersonHeader from "./components/PersonHeader.vue";

export default {
  name: "App",
  components: {
    StoriesCollection,
    Stories,
    IntroSlide,
    PersonHeader,
    WithSeeMore,
  },

  data: () => ({
    options: {
      interval: 30000,
      currentIndex: 0,
    },
    currentIndex: 3,
    colors: ["#DAF7A6", "#FFC300", "#FF5733"],
  }),
  watch: {
    currentIndex(val) {
      console.log("watchapp", val);
    },
  },
  methods: {
    open() {
      console.log("Watch whateve");
    },
  },
};
</script>
<style scoped>
.story {
  /* Take the rest of the page */
  flex-grow: 1;

  /* Center align */
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
