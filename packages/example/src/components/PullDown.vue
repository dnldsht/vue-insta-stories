<template>
  <div v-on="events" :style="style" class="pull-down">
    <slot v-if="!hide" />
    <slot v-else name="activator">
      <button @click="hide = false" class="underline">Start over!</button>
    </slot>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, ref } from "vue";
export default defineComponent({
  setup() {
    const style = reactive({ top: "0px", width: "100%", borderRadius: "0px" });

    const resetStyle = () => {
      style.top = `0px`;
      style.borderRadius = "0px";
      style.width = `100%`;
    };
    const yDown = ref(null);

    const hide = ref(false);
    const yDiff = ref(0);

    const mouseDown = (e: MouseEvent | TouchEvent) => {
      e.stopPropagation();

      if (e instanceof TouchEvent) {
        const touch = e.touches[0] ?? e.changedTouches[0];
        yDown.value = touch.clientY;
      }
    };

    const touchMove = (e: TouchEvent) => {
      e.stopPropagation();

      if (!yDown.value) return;
      const touch = e.touches[0] ?? e.changedTouches[0];
      yDiff.value = yDown.value - touch.clientY;
      if (yDiff.value < 0) {
        const diff = -yDiff.value;
        style.top = `${diff}px`;

        const r = Math.min(6, diff);
        style.borderRadius = `${r}px`;
        const w = Math.max(94, 100 - diff);
        style.width = `${w}%`;
      }
    };

    const touchEnd = (e: TouchEvent) => {
      if (yDiff.value < -40) {
        hide.value = true;
        resetStyle();
        // close
      } else {
        // back up
        resetStyle();
      }
    };

    const events = {
      // mouseup: mouseUp,
      // touchend: mouseUp,
      touchstart: mouseDown,
      touchend: touchEnd,
      mousedown: mouseDown,
      touchmove: touchMove,
    };

    return { events, style, hide };
  },
});
</script>
<style>
.pull-down {
  overflow: hidden;
}
</style>