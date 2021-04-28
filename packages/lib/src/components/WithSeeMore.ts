import { SeeMoreOptions } from 'src/types';
import { defineComponent, h, VNode } from 'vue-demi'

const WithSeeMore = defineComponent({
  props: {
    enabled: {
      type: Boolean,
      default: true,
    },
    label: {
      type: String,
      required: false,
    },
  },
  data: () => ({
    opacity: 0,
    yDown: undefined as number | undefined
  }),
  methods: {
    emit() {
      this.$emit("action");
    },
  },
  mounted() {
    this.opacity = 0.9;
  },
  render() {

    const mouseDown = (e: MouseEvent | TouchEvent) => {
      e.stopPropagation()

      if (e instanceof TouchEvent) {
        const touch = e.touches[0] ?? e.changedTouches[0]
        this.yDown = touch.clientY
      }
    }

    const mouseUp = (e: MouseEvent | TouchEvent) => {
      e.stopPropagation()
      this.emit()
    }
    const touchMove = (e: TouchEvent) => {
      e.stopPropagation()

      if (!this.yDown) return
      const touch = e.touches[0] ?? e.changedTouches[0]
      var yDiff = this.yDown - touch.clientY;
      if (yDiff > 0) {

        this.emit()
      }
      this.yDown = undefined
    }

    const events = {
      onMouseup: mouseUp,
      onTouchend: mouseUp,
      onTouchstart: mouseDown,
      onMousedown: mouseDown,
      onTouchmove: touchMove
    }
    const style = { opacity: this.opacity }

    const label = this.label || "See more"
    const seeMore = h('div', { class: 'see-more', ...events }, [
      h('span', { class: 'see-more-icon', style }, '^'),
      h('span', { class: 'see-more-text', style }, label)
    ])

    return h('div', { class: 'see-more-wrapper' }, [
      this.$slots.default?.(),
      seeMore
    ])
  },
})

const wrapWithSeeMore = (storyNode: VNode | VNode[], options?: SeeMoreOptions | boolean, onAction?: Function) => {
  if (!options) return storyNode

  const label = options === true ? undefined : options.label
  return h(WithSeeMore, { label, onAction }, {
    default: () => storyNode
  })
}

export default wrapWithSeeMore


