import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    // Αν το ανεβάσεις σε GitHub Pages σε repo π.χ. /basket-camp/, βάλε base: '/basket-camp/'
    base: '/'
})
