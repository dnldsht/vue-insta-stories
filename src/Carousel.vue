<template>
  <v-node :key="`story${currentIndex}`" :node="currentStory" :on="on"></v-node>
</template>
<script>
import VNode from "./VNode";
import { getNodes } from "./utils";
export default {
  components: { VNode },
  data(vm) {
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
      // console.log(this.$scopedSlots?.default ?? this.$slots.default);
      return getNodes(this.$scopedSlots?.default ?? this.$slots.default);
    },
    currentStory() {
      console.log("cur", this.currentIndex, this.stories[this.currentIndex]);
      return this.stories[this.currentIndex];
    },
  },
  methods: {
    next() {
      if (this.currentIndex < this.stories.length - 1) this.currentIndex++;
      console.log("neeeex");
    },
    prev() {
      if (this.currentIndex > 1) this.currentIndex--;
    },
  },

  mounted() {
    // console.log(());
  },
};
</script>