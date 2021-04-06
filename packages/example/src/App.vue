<template>
  <div id="app">
    <StoriesCollection>
      <Stories v-bind="options">
        <intro-slide class="flex-grow"></intro-slide>
      </Stories>
      <Stories :interval="1000">
        <template #header>
          <StoryHeader :options="{ label: 'test' }" />
          <!--<StoryHeader :options="{custom: true}">💎 
            <span>with <code>html</code></span>
          </StoryHeader>
          -->
        </template>

        <WithSeeMore v-for="i in 10" :key="i" @action="open">
          <div class="story" :style="{ background: colors[i % colors.length] }">
            Story {{ i - 1 }}
          </div>
        </WithSeeMore>
      </Stories>
    </StoriesCollection>
  </div>
</template>

<script>
import { Stories, StoriesCollection, WithSeeMore } from "vue-insta-stories";

import IntroSlide from "./components/IntroSlide.vue";
import StoryHeader from "./components/StoryHeader.vue";

export default {
  components: {
    StoriesCollection,
    Stories,
    IntroSlide,
    StoryHeader,
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
