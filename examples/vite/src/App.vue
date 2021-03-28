<template>
  <div id="app">
    <Story>
      <div
        class="slide"
        v-for="i in 10"
        :key="i"
        :style="{ background: colors[i % colors.length] }"
      >
        Story {{ i }}
      </div>
    </Story>
  </div>
</template>

<script>
// import Story from "vue-insta-stories/src/components/Story";
import Story from "../../../src/Story.vue";
export default {
  name: "App",
  components: { Story },

  data: () => ({
    colors: ["#DAF7A6", "#FFC300", "#FF5733"],
  }),
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
