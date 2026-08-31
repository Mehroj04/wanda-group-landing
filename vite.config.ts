import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const env = (globalThis as { process?: { env?: Record<string, string | undefined> } }).process?.env ?? {}

export default defineConfig({
  plugins: [react()],
  define: {
    __WEB3FORMS_ACCESS_KEY__: JSON.stringify(env.WEB3FORMS_ACCESS_KEY || env.VITE_WEB3FORMS_ACCESS_KEY || ''),
  },
})
