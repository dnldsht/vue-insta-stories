<template>
  <div id="app">
    <!-- <Stories v-bind="options">
        <intro-slide class="flex-grow"></intro-slide>
      </Stories> -->
    <Stories :stories="stories" :interval="3000" />
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
      "https://picsum.photos/350/200/",
      {
        url:
          "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
        type: "video",
        duration: 10000,
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
