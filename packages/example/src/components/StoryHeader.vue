<template>
  <div class="flex items-center">
    <slot v-if="options.custom"></slot>
    <div
      v-else
      class="h-8 w-8 rounded-1 bg-white text-xl flex justify-center items-center shadow-sm"
    >
      💎
    </div>
    <div class="font-bold text-white ml-2">{{ options.label }}</div>
  </div>
</template>
<script>
export default {
  name: "Story Header",
  props: {
    options: {
      type: Object,
      required: false,
      default: {
        label: "uneven",
        custom: false,
      },
    },
  },
};
</script>

<style>
.avatar {
  /* width: 10px;
  height: 10px; */
}
</style>