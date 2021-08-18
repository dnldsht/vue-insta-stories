<template>
  <div class="flex items-center">
    <div
      class="
        h-8
        w-8
        rounded-1
        bg-white
        text-xl
        flex
        justify-center
        items-center
        shadow-sm
      "
    >
      💎
    </div>
    <div class="font-bold text-white ml-2">{{ label }}</div>
  </div>
</template>
<script>
export default {
  name: "Story Header",
  props: {
    label: {
      type: String,
      default: "uneven",
    },
  },
};
</script>