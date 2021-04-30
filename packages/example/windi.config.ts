import { defineConfig } from 'vite-plugin-windicss'
import plugin from 'windicss/plugin'

const hfill = plugin(({ addUtilities }) => {
  addUtilities({
    '.h-fill': {
      'height': ['100vh', '-webkit-fill-available'],
    },
  })
})

export default defineConfig({
  plugins: [
    hfill
  ]
})
