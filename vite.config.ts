import { fileURLToPath, URL } from 'node:url' // Конвертация URL в файловые пути
import { defineConfig } from 'vite' // Основная функция конфигурации Vite
import vue from '@vitejs/plugin-vue' // Официальный плагин для Vue 3
import vueJsx from '@vitejs/plugin-vue-jsx' // Поддержка JSX в Vue компонентах
import vueDevTools from 'vite-plugin-vue-devtools' // Интеграция Vue DevTools
import tailwindcss from '@tailwindcss/vite'

// =====================
// ОСНОВНАЯ КОНФИГУРАЦИЯ
// =====================
export default defineConfig({
  plugins: [
    vue(), // Активирует обработку .vue файлов
    vueJsx(), // Включает поддержку JSX-синтаксиса
    vueDevTools(), // Добавляет панель разработчика Vue
    tailwindcss(),
  ],
  resolve: {
    alias: {
      // Настройка алиасов для путей (заменяет относительные пути на @/)
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  base: '/my-vue-app/', // Укажите ваш репозиторий
})

// =================
// ШПАРГАЛКА ПО VITE
// =================
/*
1. КОМАНДЫ:
   • dev-сервер: npm run dev (vite)
   • Сборка: npm run build (vite build)
   • Превью сборки: npm run preview (vite preview)

2. ЧАСТО ИСПОЛЬЗУЕМЫЕ ПЛАГИНЫ:
   • @vitejs/plugin-legacy - поддержка старых браузеров
   • vite-plugin-pwa - PWA-функционал
   • unplugin-auto-import - автоматические импорты
   • vite-plugin-svg-icons - работа с SVG

3. ДОБАВЛЕНИЕ ПРЕПРОЦЕССОРОВ:
   css: {
     preprocessorOptions: {
       scss: {
         additionalData: `@import "@/styles/vars.scss";`
       }
     }
   }

4. НАСТРОЙКА СЕРВЕРА:
   server: {
     port: 3000,
     open: true,
     proxy: {
       '/api': 'http://localhost:5000'
     }
   }

5. ОПТИМИЗАЦИЯ СБОРКИ:
   build: {
     minify: 'terser', // Минификация кода
     chunkSizeWarningLimit: 1000, // Лимит предупреждений
     rollupOptions: { // Настройки Rollup
       output: {
         manualChunks: {
           vue: ['vue', 'vue-router'],
         }
       }
     }
   }
*/

// ====================
// ПОЛЕЗНЫЕ ССЫЛКИ:
// ====================
// Официальная документация Vite: https://vitejs.dev/config/
// Все плагины Vite: https://github.com/vitejs/awesome-vite#plugins
// Vue 3 + Vite руководство: https://vuejs.org/guide/scaling-up/tooling.html#vite