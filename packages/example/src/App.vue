<template>
  <div class="container py-20 flex flex-col md:flex-row justify-center mx-auto h-100vh items-center p-5">
    <div class="flex flex-col justify-center mb-20 md:(mr-20 mb-0)">
      <a
        class="text-5xl font-semibold underline"
        href="https://github.com/UnevenSoftware/vue-insta-stories">
        Your stats are ready! :O</a>
      <p class="mt-4">Here is what we found out!.</p>

      <div class="bg-gray-200 p-3 mt-4 rounded-lg">
        yarn add vue-insta-stories
      </div>

      <a class="mt-4 underline"
        href="https://github.com/UnevenSoftware/vue-insta-stories/tree/main/packages/lib#readme">
        Documentation →</a>

      <div class="mt-5">
        Made with 🖤 by <a href="https://github.com/dnldsht">@dnldsht</a> &
        <a href="https://github.com/gilnd">@gilnd</a>
      </div>
    </div>
    <div class="md:(h-730px w-420px) flex justify-center items-center">
      <Stories
        @onAllStoriesEnd="showStories = false"
        v-if="showStories"
        class="absolute top-0 h-100vh w-100vw md:(h-730px w-420px relative) shadow-lg"
        :interval="3000"
        :loop="true"
        :stories="stories">
        <template #header><story-header /></template>
        <template #intro>
          <intro-slide class="flex-grow"></intro-slide>
        </template>
      </Stories>

      <button v-else @click="showStories = true" class="underline">
        Start over!
      </button>
    </div>
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
    StoryHeader
  },

  data: () => ({
    showStories: true,
    options: {
      interval: 30000,
      currentIndex: 0
    },
    currentIndex: 3,
    stories: [
      { type: "custom", template: "intro" },
      "https://picsum.photos/350/200/",
      {
        url:
          "https://file-examples-com.github.io/uploads/2017/04/file_example_MP4_480_1_5MG.mp4",
        type: "video"
      },
      "https://picsum.photos/400/201/",
      "https://picsum.photos/350/202/"
    ]
  }),
  watch: {
    currentIndex(val) {
      console.log("watchapp", val);
    }
  },
  methods: {
    open() {
      console.log("Watch whateve");
    }
  },
  mounted() {}
});
</script>
<style scoped>
.st {
  width: 420px;
  height: 730px;
}
.story {
  /* Take the rest of the page */
  flex-grow: 1;

  /* Center align */
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
