(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('vue-demi'), require('animejs'), require('hammerjs')) :
    typeof define === 'function' && define.amd ? define(['exports', 'vue-demi', 'animejs', 'hammerjs'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.VueInstaStory = {}, global.VueDemi, global.anime, global.Hammer));
}(this, (function (exports, vueDemi, anime, Hammer) { 'use strict';

    function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

    var anime__default = /*#__PURE__*/_interopDefaultLegacy(anime);
    var Hammer__default = /*#__PURE__*/_interopDefaultLegacy(Hammer);

    var Image = vueDemi.defineComponent({
        props: {
            item: {
                type: Object,
                required: true
            }
        },
        render: function () {
            var style = {
                width: "auto",
                maxWidth: "100%",
                maxHeight: "100%",
                margin: "auto"
            };
            return vueDemi.h('img', { src: this.item.url, style: style });
        }
    });

    var Video = vueDemi.defineComponent({
        props: {
            item: {
                type: Object,
                required: true
            }
        },
        render: function () {
            var style = {
                width: "auto",
                maxWidth: "100%",
                maxHeight: "100%",
                margin: "auto"
            };
            return vueDemi.h('video', { src: this.item.url, controls: false, autoPlay: true, style: style });
        }
    });

    var getRender = function (type) {
        switch (type) {
            case 'image':
                return Image;
            case 'video':
                return Video;
            default:
                throw new Error("Did not find a render for type " + type);
        }
    };
    var render = function (item) {
        return vueDemi.h(getRender(item.type), { item: item });
    };

    var fadeOut = function (el) {
        el.animate([
            { opacity: 1 },
            { opacity: 0 }
        ], {
            duration: 200,
            fill: 'forwards',
        });
    };
    var fadeIn = function (el) {
        el.animate([
            { opacity: 0 },
            { opacity: 1 }
        ], {
            duration: 200,
            fill: 'forwards',
        });
    };

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

    var css_248z = ".stories {\n  float: left;\n  position: relative;\n  height: 100vh;\n  width: 100vw;\n  z-index: 1;\n  display: flex;\n  flex-direction: column;\n}\n.header {\n  position: absolute;\n  z-index: 10;\n  top: 22px;\n  left: 16px;\n}\n\n.timeline {\n  position: absolute;\n  display: flex;\n  flex-grow: 0;\n  width: 100%;\n  background: -webkit-gradient(\n    linear,\n    top,\n    bottom,\n    from(rgba(0, 0, 0, 0.2)),\n    to(rgba(0, 0, 0, 0))\n  );\n  background: linear-gradient(to bottom, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0));\n  padding-bottom: 8px; /* To add more space for gradient */\n  z-index: 10;\n}\n\n.timeline > .slice {\n  background: rgba(255, 255, 255, 0.5);\n  height: 2px;\n  border-radius: 2px;\n  margin: 6px 3px;\n  width: 100%;\n}\n\n.timeline > .slice > .progress {\n  background: #fff;\n  height: 2px;\n  border-radius: 2px;\n  width: 0%;\n}";
    styleInject(css_248z);

    var Stories = vueDemi.defineComponent({
        name: "Stories",
        props: {
            stories: {
                type: Array,
                required: true
            },
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
                handler: function (val) {
                    console.log("watch", val);
                    this.index = val;
                    this.resetSlide();
                },
            },
        },
        data: function () {
            var timeline = anime__default['default'].timeline({
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
            items: function () {
                return this.stories.map(function (i) {
                    if (typeof i == 'string')
                        return { url: i, type: 'image' };
                    else
                        return i;
                });
            },
            current: function () {
                return this.items[this.index];
            },
        },
        methods: {
            activate: function () {
                this.resetSlide();
            },
            deactivate: function () {
                this.timeline.pause();
            },
            resetSlide: function () {
                this.timeline.pause();
                this.timeline.seek(this.index * this.interval);
                this.timeline.play();
            },
            nextSlide: function () {
                if (this.index < this.stories.length - 1) {
                    this.index++;
                    this.resetSlide();
                }
            },
            previousSlide: function () {
                if (this.index > 0) {
                    this.index--;
                    this.resetSlide();
                }
            },
            tap: function (e) {
                var x = e.gesture.srcEvent.x;
                var t = window.innerWidth / 3;
                if (x > t) {
                    this.nextSlide();
                }
                else {
                    this.previousSlide();
                }
            },
        },
        mounted: function () {
            var _this = this;
            var $timeline = this.$el.getElementsByClassName("timeline")[0];
            this.items.forEach(function (story, index) {
                var slices = $timeline.getElementsByClassName("slice");
                _this.timeline.add({
                    targets: slices[index].getElementsByClassName("progress"),
                    duration: story.duration,
                    width: "100%",
                    changeBegin: function () {
                        _this.index = index;
                        _this.$emit("onStoryStart", index);
                        _this.$emit("update:currentIndex", index);
                    },
                    changeComplete: function () {
                        _this.$emit("onStoryEnd", index);
                    },
                    complete: function () {
                        if (index === _this.stories.length - 1) {
                            _this.$emit("onAllStoriesEnd");
                        }
                    },
                });
            });
            this.hammer = new Hammer__default['default'].Manager(this.$refs.stories, {
                domEvents: true,
                recognizers: [
                    [Hammer__default['default'].Tap],
                    [Hammer__default['default'].Press, { time: 1, threshold: 1000000 }],
                ],
            });
            this.hammer.on("press", function (e) {
                _this.timeline.pause();
                fadeOut(_this.$el.getElementsByClassName("timeline")[0]);
                fadeOut(_this.$el.getElementsByClassName("header")[0]);
            });
            this.hammer.on("pressup tap", function (e) {
                _this.timeline.play();
                fadeIn(_this.$el.getElementsByClassName("timeline")[0]);
                fadeIn(_this.$el.getElementsByClassName("header")[0]);
            });
            this.timeline.seek(this.index * this.interval);
            this.timeline.play();
        },
        render: function () {
            var slices = this.stories.map(function (_, key) { return vueDemi.h('div', { class: 'slice', key: key }, vueDemi.h('div', { class: 'progress' })); });
            return vueDemi.h('div', { ref: 'stories', class: 'stories' }, [
                vueDemi.h('div', { class: 'timeline' }, slices),
                render(this.current)
            ]);
        }
    });

    exports.Stories = Stories;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=vue-insta-stories.global.js.map
