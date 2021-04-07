
import typescript from '@rollup/plugin-typescript';
import PostCSS from 'rollup-plugin-postcss'
import pkg from './package.json'

const external = ['animejs', 'hammerjs', '"vue-demi"']

const plugins = [
  typescript(),
  PostCSS(),
]

export default [
  {
    plugins,
    external,
    input: 'src/index.ts',
    output: [
      {
        format: 'esm',
        file: pkg.module,
        sourcemap: true,
      },
      {
        exports: 'named',
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
          'vue-demi': 'VueDemi',
        },
      }
    ]
  }
]