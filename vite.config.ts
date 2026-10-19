import { defineConfig } from 'vite'
import { devtools } from '@tanstack/devtools-vite'

import { tanstackStart } from '@tanstack/react-start/plugin/vite'

import viteReact from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { nitro } from 'nitro/vite'

const config = defineConfig({
  resolve: { tsconfigPaths: true },
  plugins: [
    devtools(),
    nitro({ rollupConfig: { external: [/^@sentry\//] } }),
    tailwindcss(),
    tanstackStart({
      importProtection: {
        client: {
          files: ['**/src/server/**'],
        },
      },
    }),
    viteReact(),
  ],
  build: {
    rolldownOptions: {
      onLog(level, log, defaultHandler) {
        if (level == 'warn' && log.code == 'MODULE_LEVEL_DIRECTIVE' && log.message.includes('"use client"')) return
        defaultHandler(level, log)
      },
    },
  },
})

export default config
