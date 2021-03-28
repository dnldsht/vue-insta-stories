import Vue3 from 'rollup-plugin-vue'
import Vue2 from 'rollup-plugin-vue2'
import PostCSS from 'rollup-plugin-postcss'
import NodeResolve from '@rollup/plugin-node-resolve'

const buildVue2 = process.env.VUE2 != undefined

const VuePlugin = buildVue2 ? Vue2 : Vue3
import pkg from './package.json'

if (buildVue2) {
  console.log("Building Vue 2")
} else {
  console.log("Building Vue 3")
}

const external = ['animejs', 'hammerjs', 'vue']

const plugins = [
  NodeResolve(),
  VuePlugin({
    target: 'browser',
    cssModulesOptions: {
      generateScopedName: '[local]___[hash:base64:5]',
    },
  }),
  PostCSS(),
]

export default [
  {
    plugins,
    external,
    input: 'src/Story.vue',
    output: [
      {
        format: 'esm',
        file: pkg.module,
        sourcemap: true,
      },
      {
        exports: 'default',
        format: 'cjs',
        file: pkg.main
      },
      {
        file: pkg.unpkg,
        format: 'umd',
        name: 'VueInstaStory',
        sourcemap: true,
        globals: {
          'animejs': 'anime',
          'hammerjs': 'Hammer',
          'vue': 'Vue',
        },
      }
    ]
  }
]