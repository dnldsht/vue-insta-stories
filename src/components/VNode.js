import { defineComponent, isVue2 } from 'vue-demi'
export default defineComponent({
  functional: true,
  props: { node: Object },
  render: ({ $props }, { props }) => {
    return (isVue2 ? props : $props).node
  },
})
