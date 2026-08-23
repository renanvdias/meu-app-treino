import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  // IMPORTANTE: Troque para o nome exato do seu futuro repositório no GitHub
  base: '/meu-app-treino/', 
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'apple-touch-icon.png'],
      manifest: {
        name: 'Meu Treino',
        short_name: 'Treino',
        description: 'Acompanhamento de hipertrofia e progressão de carga',
        theme_color: '#1f2937', // Cor do cabeçalho (gray-800)
        background_color: '#111827', // Cor de fundo (gray-900)
        display: 'standalone', // Faz abrir em tela cheia, sem barra de navegador
        icons: [
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ]
})