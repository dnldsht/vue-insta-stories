export default {
  functional: true,
  render: (h, { props }) => {
    return props.node || h(null)
  },
}
