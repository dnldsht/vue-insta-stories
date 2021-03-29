export default {
  functional: true,
  props: ['node', 'on', 'key'],
  render: ({ $props }, { props }) => {
    const isVue2 = $props == undefined
    const p = (props || $props)

    if (p.on) {
      if (isVue2) {
        p.node.componentOptions.listeners = p.on
      } else {
        const onProps = Object.entries(p.on).reduce((prev, [key, value]) => ({ ...prev, [`on${key}`]: value }), {})
        p.node.props = { ...p.node.props, ...onProps }
      }
    }
    return p.node
  },
}
