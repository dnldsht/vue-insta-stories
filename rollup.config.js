import { terser } from "rollup-plugin-terser";
import vue from 'rollup-plugin-vue'
import css from 'rollup-plugin-css-only'

/** @type {import('rollup').RollupOptions} */
const options = [
  {
    input: "src/index.js",
    plugins: [vue({ css: false }), css()],
    external: ["vue-demi", "animejs", "hammerjs"],
    output: [
      {
        file: "dist/index.esm.js",
        format: "es",
        sourcemap: true
      },
      {
        file: "dist/index.esm.min.js",
        format: "es",
        sourcemap: true,
        plugins: [
          terser({
            format: {
              comments: false
            }
          })
        ]
      },
      {
        file: "dist/index.cjs.js",
        format: "cjs",
        exports: "named",
        sourcemap: true
      },
      {
        file: "dist/index.cjs.min.js",
        format: "cjs",
        exports: "named",
        sourcemap: true,
        plugins: [
          terser({
            format: {
              comments: false
            }
          })
        ]
      }
    ]
  },
  // {
  //   input: "src/global.ts",
  //   plugins: [resolve(), typescript(), postcss()],
  //   external: ["vue-demi", "echarts", "echarts/core"],
  //   output: [
  //     {
  //       file: "dist/index.umd.js",
  //       format: "umd",
  //       name: "VueECharts",
  //       exports: "default",
  //       sourcemap: true,
  //       globals: {
  //         "vue-demi": "VueDemi",
  //         echarts: "echarts",
  //         "echarts/core": "echarts"
  //       },
  //       plugins: [injectVueDemi]
  //     },
  //     {
  //       file: "dist/index.umd.min.js",
  //       format: "umd",
  //       name: "VueECharts",
  //       exports: "default",
  //       sourcemap: true,
  //       globals: {
  //         "vue-demi": "VueDemi",
  //         echarts: "echarts",
  //         "echarts/core": "echarts"
  //       },
  //       plugins: [
  //         injectVueDemi,
  //         terser({
  //           format: {
  //             comments: false
  //           }
  //         })
  //       ]
  //     }
  //   ]
  // },
  // {
  //   input: "src/index.ts",
  //   plugins: [ingoreCss, dts()],
  //   output: {
  //     file: "dist/index.d.ts",
  //     format: "es"
  //   }
  // }
];

export default options;