import anime from 'animejs';
import Hammer from 'hammerjs';
import { resolveComponent, openBlock, createBlock, createVNode, Fragment, renderList, renderSlot, pushScopeId, popScopeId, withModifiers, toDisplayString, createCommentVNode, withScopeId } from 'vue';

var VNode = {
  functional: true,
  props: {
    node: { type: Object, required: true },
    on: { type: Object, required: false }
  },
  render: ({ $props }, { props, data }) => {
    const isVue2 = $props == undefined;
    const p = (props || $props);

    if (p.on) {
      if (isVue2) {
        p.node.key = data.key;
        p.node.componentOptions.listeners = { ...p.node.componentOptions.listeners, ...p.on };
      } else {
        const onProps = Object.entries(p.on).reduce((prev, [key, value]) => ({ ...prev, [`on${key}`]: value }), {});
        p.node.props = { ...p.node.props, ...onProps };
      }
    }
    return p.node
  },
};

const getNodes = (slot, args = null) => {
  // slots are functions in vue 3
  if (typeof slot == "function") {
    return slot(args)
      .filter(({ type }) => {
        if (typeof type == "symbol")
          // filters comments in slot
          return !["Symbol(Comment)"].includes(type.toString());
        return true;
      })
      .map((n) => (n.children instanceof Array ? n.children : [n]))
      .reduce((nodes, n) => [...nodes, ...n], []);
  }

  return slot;
};

const fadeOut = (el) => {
  el.animate([ // keyframes
      { opacity: 1 },
      { opacity: 0 }
    ], { // options
      duration: 200, 
      fill: 'forwards',
    }
  );
};

const fadeIn = (el) => {
  el.animate([ // keyframes
      { opacity: 0 },
      { opacity: 1 }
    ], { // options
      duration: 200, 
      fill: 'forwards',
    }
  );
};

var script$2 = {
  components: { VNode },
  name: "Stories",
  props: {
    interval: {
      type: Number,
      default: 2000,
    },
    currentIndex: {
      type: Number,
      default: 0,
    },
  },
  watch: {
    currentIndex: {
      handler(val) {
        console.log("watch", val);
        this.index = val;
        this.resetSlide();
      },
    },
  },
  data() {
    const timeline = anime.timeline({
      autoplay: false,
      duration: this.interval,
      easing: "linear",
    });

    return {
      index: this.currentIndex,
      isActive: false,
      timeline: timeline,
    };
  },
  computed: {
    slides() {
      return getNodes(this.$slots.default);
    },
    current() {
      return this.slides[this.index];
    },
  },
  methods: {
    activate() {
      // Start timer
      this.resetSlide();
    },
    deactivate() {
      this.timeline.pause();
    },
    resetSlide() {
      // Jump to beginning of the slide
      this.timeline.pause();
      this.timeline.seek(this.index * this.interval);
      this.timeline.play();
    },
    nextSlide() {
      if (this.index < this.slides.length - 1) {
        this.index++;
        this.resetSlide();
      } else {
        this.nextStory();
      }
    },
    previousSlide() {
      if (this.index > 0) {
        this.index--;
        this.resetSlide();
      } else {
        this.previousStory();
      }
    },
    nextStory() {
      this.$emit("NEXT_STORY");
    },
    previousStory() {
      this.$emit("PREVIOUS_STORY");
    },
    tap(e) {
      const x = e.gesture.srcEvent.x;
      const t = window.innerWidth / 3;

      if (x > t) {
        this.nextSlide();
      } else {
        this.previousSlide();
      }
    },
  },
  mounted() {
    let $timeline = this.$el.getElementsByClassName("timeline")[0];

    // Add progress bars to the timeline animation group
    this.slides.forEach((slide, index) => {
      // vue3 && vue2 support
      const attrs = slide.props ?? slide.data?.attrs ?? {};

      const slices = $timeline.getElementsByClassName("slice");
      // console.log(attrs);
      this.timeline.add({
        targets: slices[index].getElementsByClassName("progress"),
        duration: attrs.interval,
        width: "100%",
        changeBegin: () => {
          // Update the Vue componenet state when progress bar begins to play
          this.index = index;
          this.$emit("onStoryStart", index);
          this.$emit("update:currentIndex", index);
        },
        changeComplete: () => {
          this.$emit("onStoryEnd", index);
        },
        complete: () => {
          // Move to the next story when finished playing all slides
          if (index === this.slides.length - 1) {
            this.nextStory();
            this.$emit("onAllStoriesEnd");
          }
        },
      });
    });

    this.hammer = new Hammer.Manager(this.$refs.stories, {
      domEvents: true,
      recognizers: [
        [Hammer.Pan, { direction: Hammer.DIRECTION_HORIZONTAL }],
        // used as @tap to support stopPropagation
        [Hammer.Tap],

        [Hammer.Press, { time: 1, threshold: 1000000 }],
      ],
    });

    this.hammer.on("press", (e) => {
      this.timeline.pause();
      // hide
      console.log(e);
      fadeOut(this.$el.getElementsByClassName("timeline")[0]);
      fadeOut(this.$el.getElementsByClassName("header")[0]);
      //this.$emit("TIMELINE_PAUSE");
    });

    this.hammer.on("pressup tap", (e) => {
      this.timeline.play();
      //show
      fadeIn(this.$el.getElementsByClassName("timeline")[0]);
      fadeIn(this.$el.getElementsByClassName("header")[0]);
      //this.$emit("TIMELINE_PLAY");
    });

    // Handle swipe
    this.hammer.on("pan", (event) => {
      if (event.isFinal) {
        if (event.deltaX < 0) {
          this.nextStory();
        } else if (event.deltaX > 0) {
          this.previousStory();
        }
      }
    });

    this.timeline.seek(this.index * this.interval);
    this.timeline.play();
  },
};

const _hoisted_1$1 = { class: "timeline" };
const _hoisted_2 = /*#__PURE__*/createVNode("div", { class: "progress" }, " ", -1 /* HOISTED */);
const _hoisted_3 = { class: "header" };

function render$2(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_VNode = resolveComponent("VNode");

  return (openBlock(), createBlock("div", {
    ref: "stories",
    onTap: _cache[1] || (_cache[1] = (...args) => ($options.tap && $options.tap(...args))),
    class: "stories"
  }, [
    createVNode("div", _hoisted_1$1, [
      (openBlock(true), createBlock(Fragment, null, renderList($options.slides, (slide, i) => {
        return (openBlock(), createBlock("div", {
          class: "slice",
          key: i
        }, [
          _hoisted_2
        ]))
      }), 128 /* KEYED_FRAGMENT */))
    ]),
    createVNode("div", _hoisted_3, [
      renderSlot(_ctx.$slots, "header")
    ]),
    createVNode(_component_VNode, { node: $options.current }, null, 8 /* PROPS */, ["node"])
  ], 544 /* HYDRATE_EVENTS, NEED_PATCH */))
}

function styleInject(css, ref) {
  if ( ref === void 0 ) ref = {};
  var insertAt = ref.insertAt;

  if (!css || typeof document === 'undefined') { return; }

  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';

  if (insertAt === 'top') {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }

  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}

var css_248z$1 = "\n.stories {\n  float: left;\n  position: relative;\n  height: 100vh;\n  width: 100vw;\n  z-index: 1;\n  display: flex;\n  flex-direction: column;\n}\n.header {\n  position: absolute;\n  z-index: 10;\n  top: 22px;\n  left: 16px;\n}\n.timeline {\n  position: absolute;\n  display: flex;\n  flex-grow: 0;\n  width: 100%;\n  background: -webkit-gradient(\n    linear,\n    top,\n    bottom,\n    from(rgba(0, 0, 0, 0.2)),\n    to(rgba(0, 0, 0, 0))\n  );\n  background: linear-gradient(to bottom, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0));\n  padding-bottom: 8px; /* To add more space for gradient */\n  z-index: 10;\n}\n.timeline > .slice {\n  background: rgba(255, 255, 255, 0.5);\n  height: 2px;\n  border-radius: 2px;\n  margin: 6px 3px;\n  width: 100%;\n}\n.timeline > .slice > .progress {\n  background: #fff;\n  height: 2px;\n  border-radius: 2px;\n  width: 0%;\n}\n";
styleInject(css_248z$1);

script$2.render = render$2;
script$2.__file = "src/components/Stories.vue";

var script$1 = {
  components: { VNode },
  name: "StoriesCollection",
  props: {
    currentIndex: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      on: {
        NEXT_STORY: this.next,
        PREVIOUS_STORY: this.prev,
      },
      index: this.currentIndex,
    };
  },
  watch: {
    currentIndex: {
      handler(val) {
        this.index = val;
      },
    },
  },
  computed: {
    stories() {
      return getNodes(this.$slots.default);
    },
    currentStory() {
      return this.stories[this.index];
    },
  },
  methods: {
    next() {
      if (this.index < this.stories.length - 1) {
        this.index++;
        this.$emit("update:currentIndex", this.index);
      } else {
        this.$emit("onAllStoriesEnd");
      }
    },
    prev() {
      if (this.index > 0) {
        this.index--;
        this.$emit("update:currentIndex", this.index);
      }
    },
  },

  mounted() {
    // console.log(());
  },
};

function render$1(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_v_node = resolveComponent("v-node");

  return (openBlock(), createBlock(_component_v_node, {
    key: `stories${$data.index}`,
    node: $options.currentStory,
    on: $data.on
  }, null, 8 /* PROPS */, ["node", "on"]))
}

script$1.render = render$1;
script$1.__file = "src/components/StoriesCollection.vue";

var script = {
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
    lastTimeStamp: 0,
  }),
  methods: {
    emit(e) {
      // I dont know why the tap event is fired twice
      const t = e?.timeStamp ?? 0;
      if (t == 0) this.$emit("action");
      else {
        if (t - this.lastTimeStamp > 100) this.$emit("action");
        this.lastTimeStamp = t;
      }
    },
  },
  mounted() {
    this.opacity = 0.9;
    if (!this.enabled) return void 0;
    this.hammer = new Hammer.Manager(this.$refs.seeMore, {
      domEvents: true,
      recognizers: [
        [Hammer.Swipe, { direction: Hammer.DIRECTION_VERTICAL }],

        // used as @tap to support stopPropagation
        [Hammer.Tap],
      ],
    });

    this.hammer.on("swipeup", () => {
      this.emit();
    });
  },
};

const _withId = /*#__PURE__*/withScopeId("data-v-a8a678bc");

pushScopeId("data-v-a8a678bc");
const _hoisted_1 = { class: "wrapper" };
popScopeId();

const render = /*#__PURE__*/_withId((_ctx, _cache, $props, $setup, $data, $options) => {
  return (openBlock(), createBlock("div", _hoisted_1, [
    renderSlot(_ctx.$slots, "default"),
    ($props.enabled)
      ? (openBlock(), createBlock("div", {
          key: 0,
          ref: "seeMore",
          onTap: _cache[1] || (_cache[1] = withModifiers((...args) => ($options.emit && $options.emit(...args)), ["stop"])),
          class: "see-more"
        }, [
          renderSlot(_ctx.$slots, "see-more", { emit: $options.emit }, () => [
            createVNode("span", {
              style: { opacity: _ctx.opacity },
              class: "see-more-icon"
            }, "⌃", 4 /* STYLE */),
            createVNode("span", {
              style: { opacity: _ctx.opacity },
              class: "see-more-text"
            }, toDisplayString($props.label), 5 /* TEXT, STYLE */)
          ])
        ], 544 /* HYDRATE_EVENTS, NEED_PATCH */))
      : createCommentVNode("v-if", true)
  ]))
});

var css_248z = "\n.wrapper[data-v-a8a678bc] {\n  flex-grow: 1;\n  display: flex;\n  position: relative;\n}\n.see-more[data-v-a8a678bc] {\n  position: absolute;\n  height: 10vh;\n  flex-direction: column;\n  width: 100%;\n  background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.2));\n  display: flex;\n  align-items: center;\n  justify-content: flex-end;\n  bottom: 0;\n  z-index: 10;\n}\n.see-more-text[data-v-a8a678bc] {\n  color: white;\n  text-align: center;\n  letter-spacing: 0.1em;\n  margin-bottom: 2.2vh;\n  font-weight: bold;\n  font-size: 1rem;\n  text-transform: uppercase;\n  transition: opacity 300ms ease-in-out;\n}\n.see-more-icon[data-v-a8a678bc] {\n  color: white;\n  text-align: center;\n\n  transition: opacity 300ms ease-in-out;\n}\n";
styleInject(css_248z);

script.render = render;
script.__scopeId = "data-v-a8a678bc";
script.__file = "src/components/WithSeeMore.vue";

export { script$2 as Stories, script$1 as StoriesCollection, script as WithSeeMore };
//# sourceMappingURL=vue-insta-stories.esm.js.map
