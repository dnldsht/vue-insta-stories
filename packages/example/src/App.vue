<template>
  <div
    class="
      container
      py-20
      flex flex-col
      md:flex-row
      justify-center
      mx-auto
      h-100vh
      items-center
      p-5
    "
  >
    <div class="flex flex-col justify-center mb-20 md:(mr-20 mb-0)">
      <a
        class="text-5xl font-semibold underline"
        href="https://github.com/UnevenSoftware/vue-insta-stories"
      >
        vue-insta-stories</a
      >
      <p class="mt-4">Instagram stories in your vue projects.</p>

      <div class="bg-gray-200 p-3 mt-4 rounded-lg">
        yarn add vue-insta-stories
      </div>

      <a
        class="mt-4 underline"
        href="https://github.com/UnevenSoftware/vue-insta-stories/tree/main/packages/lib#readme"
      >
        Documentation →</a
      >

      <div class="mt-5">
        Made with 🖤 by <a href="https://github.com/dnldsht">@dnldsht</a> &
        <a href="https://github.com/gilnd">@gilnd</a>
      </div>
    </div>
    <div class="md:(h-730px w-420px) flex justify-center items-center">
      <Stories
        @allStoriesEnd="showStories = false"
        @seeMore="open"
        v-if="showStories"
        class="
          absolute
          top-0
          h-fill
          w-100vw
          md:(h-730px)
          md:(w-420px)
          md:(relative)
          shadow-lg
        "
        :interval="3000"
        :stories="stories"
        :loop="true"
      >
        <template #header="{ story }">
          <story-header :label="story.header ? story.header.label : 'uneven'" />
        </template>

        <template #intro="attrs">
          <intro-slide v-bind="attrs" class="flex-grow"></intro-slide>
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
    StoryHeader,
  },

  data: () => ({
    showStories: true,
    options: {
      interval: 30000,
      currentIndex: 0,
    },
    currentIndex: 3,
    stories: [
      {
        template: "intro",
      },
      "https://picsum.photos/350/200/",
      {
        url: "https://file-examples-com.github.io/uploads/2017/04/file_example_MP4_480_1_5MG.mp4",
        type: "video",
        seeMore: { url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ" },
      },
      "https://picsum.photos/400/201/",
      {
        url: "https://picsum.photos/350/202/",
        header: {
          label: "UnevenSoftware",
        },
        seeMore: {
          label: "Give us a star 🤍",
          url: "https://github.com/UnevenSoftware/vue-insta-stories",
        },
      },
    ],
  }),
  watch: {
    currentIndex(val) {
      console.log("watchapp", val);
    },
  },
  methods: {
    open(story) {
      const { url } = story.seeMore;
      window.open(url);
      console.log("Watch whateve", url);
    },
  },
  mounted() {},
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
