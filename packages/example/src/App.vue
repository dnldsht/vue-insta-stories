<template>
  <div id="app">
    <!-- <Stories v-bind="options">
        <intro-slide class="flex-grow"></intro-slide>
      </Stories> -->
    <Stories :stories="stories">
      <template #header><story-header /></template>
      <template #intro>
        <intro-slide class="flex-grow"></intro-slide>
      </template>
    </Stories>
  </div>
</template>

<script>
import { Stories } from "vue-insta-stories";

import IntroSlide from "./components/IntroSlide.vue";
import StoryHeader from "./components/StoryHeader.vue";
import { defineComponent, isVue2 } from "vue-demi";

export default defineComponent({
  components: {
    Stories,
    IntroSlide,
    StoryHeader,
  },

  data: () => ({
    options: {
      interval: 30000,
      currentIndex: 0,
    },
    currentIndex: 3,
    stories: [
      { type: "custom", template: "intro" },
      "https://picsum.photos/350/200/",
      {
        url:
          "https://file-examples-com.github.io/uploads/2017/04/file_example_MP4_480_1_5MG.mp4",
        type: "video",
      },
      "https://picsum.photos/400/201/",
      "https://picsum.photos/350/202/",
    ],
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
  mounted() {},
});
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
