<template>
  <v-node :key="`stories${index}`" :node="currentStory" :on="on"></v-node>
</template>
<script>
import VNode from "./VNode";
import { getNodes } from "../utils";

export default {
  components: { VNode },
  name: "StoriesCollection",
  props: {
    currentIndex: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      on: {
        NEXT_STORY: this.next,
        PREVIOUS_STORY: this.prev,
      },
      index: this.currentIndex,
    };
  },
  watch: {
    currentIndex: {
      handler(val) {
        this.index = val;
      },
    },
  },
  computed: {
    stories() {
      return getNodes(this.$slots.default);
    },
    currentStory() {
      return this.stories[this.index];
    },
  },
  methods: {
    next() {
      if (this.index < this.stories.length - 1) {
        this.index++;
        this.$emit("update:currentIndex", this.index);
      } else {
        this.$emit("onAllStoriesEnd");
      }
    },
    prev() {
      if (this.index > 0) {
        this.index--;
        this.$emit("update:currentIndex", this.index);
      }
    },
  },

  mounted() {
    // console.log(());
  },
};
</script>