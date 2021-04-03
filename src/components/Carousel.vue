<template>
  <v-node :key="`story${currentIndex}`" :node="currentStory" :on="on"></v-node>
</template>
<script>
import VNode from "./VNode";
import { getNodes } from "../utils";
export default {
  components: { VNode },
  data() {
    return {
      on: {
        NEXT_STORY: this.next,
        PREVIOUS_STORY: this.prev,
      },
      currentIndex: 0,
    };
  },
  computed: {
    stories() {
      return getNodes(this.$slots.default);
    },
    currentStory() {
      return this.stories[this.currentIndex];
    },
  },
  methods: {
    next() {
      if (this.currentIndex < this.stories.length - 1) this.currentIndex++;
    },
    prev() {
      if (this.currentIndex > 0) this.currentIndex--;
    },
  },

  mounted() {
    // console.log(());
  },
};
</script>