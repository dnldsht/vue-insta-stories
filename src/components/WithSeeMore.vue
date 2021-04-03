<template>
  <div class="wrapper">
    <slot />

    <div ref="seeMore" v-if="enabled" class="see-more">
      <!-- <slot :emit="emit" name="see-more"> -->
      <span :style="{ opacity }" class="see-more-icon">⌃</span>
      <span :style="{ opacity }" class="see-more-text">{{ label }}</span>
      <!-- </slot> -->
    </div>
  </div>
</template>
<script>
import Hammer from "hammerjs";
export default {
  props: {
    enabled: {
      type: Boolean,
      default: true,
    },
    label: {
      type: String,
      default: "See more!",
    },
  },
  data: () => ({
    opacity: 0,
  }),
  methods: {
    emit() {
      this.$emit("action");
    },
  },
  mounted() {
    this.opacity = 0.9;
    if (!this.enabled) return void 0;
    this.hammer = new Hammer.Manager(this.$refs.seeMore, {
      domEvents: true,
      recognizers: [
        [Hammer.Swipe, { direction: Hammer.DIRECTION_VERTICAL }],
        [Hammer.Tap],
      ],
    });

    this.hammer.set({ domEvents: true });

    this.hammer.on("swipeup", (event) => {
      this.emit();
      console.log("swipeup");
    });

    this.hammer.on("tap", (event) => {
      this.emit();
    });
  },
};
</script>
<style scoped>
.wrapper {
  flex-grow: 1;
  display: flex;
  position: relative;
}
.see-more {
  position: absolute;
  height: 10vh;
  flex-direction: column;
  width: 100%;
  background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.2));
  display: flex;
  align-items: center;
  justify-content: flex-end;
  bottom: 0;
  z-index: 10;
}

.see-more-text {
  color: white;
  text-align: center;
  letter-spacing: 0.1em;
  margin-bottom: 2.2vh;

  font-size: 0.8em;
  transition: opacity 300ms ease-in-out;
}
.see-more-icon {
  color: white;
  text-align: center;

  transition: opacity 300ms ease-in-out;
}
</style>