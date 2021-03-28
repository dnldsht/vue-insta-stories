export default {
  functional: true,
  props: ['node'],
  render: ({ $props }, { props }) => {
    return (props || $props).node
  },
}
