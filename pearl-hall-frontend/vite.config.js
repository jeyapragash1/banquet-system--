import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  // This line tells the build process that your project lives in a sub-folder.
  // It ensures all links to CSS, JS, and images work correctly.
  base: '/banquet-system-/',

  // These are the essential plugins for your project to function.
  // We are NOT leaving them out.
  plugins: [
    tailwindcss(),
    react()
  ],
})