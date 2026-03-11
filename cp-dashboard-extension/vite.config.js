import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],


  // file kholo aur usme base: './' add kar do. Ye Chrome ko batayega ki files local hain. Tumhari file aisi dikhni chahiye:
  base: './', // <-- Ye line add karni hai
})
