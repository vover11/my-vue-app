import { fileURLToPath } from 'node:url' // Конвертация URL в абсолютные пути
import { mergeConfig, defineConfig, configDefaults } from 'vitest/config' // Утилиты для конфигурации Vitest
import viteConfig from './vite.config' // Основная конфигурация Vite

// =====================
// КОНФИГУРАЦИЯ VITEST
// =====================
export default mergeConfig(
  viteConfig, // Базовые настройки из vite.config.js
  defineConfig({
    test: {
      environment: 'jsdom', // Окружение для тестирования DOM
      exclude: [
        ...configDefaults.exclude, // Стандартные исключения
        'e2e/**' // Игнорируем end-to-end тесты
      ],
      root: fileURLToPath(new URL('./', import.meta.url)), // Корневая директория
    },
  }),
)

// =================
// ШПАРГАЛКА VITEST
// =================
/*
1. ОСНОВНЫЕ КОМАНДЫ:
   • Запуск тестов: npm run test
   • Просмотр покрытия: npm run test --coverage
   • Отладка: npm run test --ui

2. КЛЮЧЕВЫЕ НАСТРОЙКИ:
   • environment: 'jsdom' - эмулирует браузерное окружение
   • globals: true - автоматическая регистрация describe/it
   • setupFiles: ['./tests/setup.ts'] - файл инициализации
   • reporters: ['default', 'junit'] - разные форматы отчетов

3. ПОПУЛЯРНЫЕ ПЛАГИНЫ:
   • @vitest/ui - интерактивный интерфейс
   • @vitest/coverage-c8 - анализ покрытия кода
   • happy-dom - альтернатива jsdom
   • testing-library/vue - утилиты для тестирования Vue

4. ПРИМЕР ТЕСТА:
   import { render } from '@testing-library/vue'
   import Component from './Component.vue'
   
   test('renders correctly', () => {
     const { getByText } = render(Component)
     expect(getByText('Hello')).toBeTruthy()
   })

5. ДОПОЛНИТЕЛЬНЫЕ ОПЦИИ:
   test: {
     // Параллельное выполнение
     threads: true,
     
     // Глобальные переменные
     globals: true,
     
     // Таймауты
     testTimeout: 10000,
     
     // Покрытие кода
     coverage: {
       provider: 'c8',
       reporter: ['text', 'html']
     }
   }
*/

// ====================
// ПОЛЕЗНЫЕ ССЫЛКИ:
// ====================
// Официальная документация: https://vitest.dev/config/
// Примеры конфигураций: https://github.com/vitest-dev/vitest/tree/main/examples
// Vue Testing Guide: https://test-utils.vuejs.org/guide/