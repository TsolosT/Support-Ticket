import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {

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
              target: 'https://support-ticket-backend-eosin.vercel.app', 
              changeOrigin: true,
              secure: true,
              ws: true,
            },
          },  
      },
    }
})