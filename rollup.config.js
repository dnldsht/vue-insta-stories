import vue from 'rollup-plugin-vue'
import PostCSS from 'rollup-plugin-postcss'
import NodeResolve from '@rollup/plugin-node-resolve'

import pkg from './package.json'

const external = ['animejs', 'hammerjs', 'vue']

const plugins = [

  NodeResolve(),
  vue({
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