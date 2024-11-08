import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
   // Get the API base URL from environment variables
    const env = loadEnv(mode, process.cwd(), '')
    const API_BASE_URL = JSON.stringify(env.API_BASE_URL);

    return {
      plugins: [react()],
      server: {
        port: 5173,
        proxy: mode === 'development'
          ? {
              '/api': {
                target: 'http://localhost:5000',  // Local backend server
                changeOrigin: true,
                secure: false,
                ws: true,
              },
            }
          : {
            '/api': {
              target: API_BASE_URL, 
              changeOrigin: true,
              secure: false,
              ws: true,
            },
          },  
      },
    }
})