// ==============================================
// КОНФИГУРАЦИЯ ESLINT ДЛЯ VUE 3 + TYPESCRIPT ПРОЕКТА
// ==============================================

// Основные плагины
import pluginVue from 'eslint-plugin-vue' // Линтинг для Vue-файлов
import { defineConfigWithVueTs, vueTsConfigs } from '@vue/eslint-config-typescript' // Vue + TS поддержка
import pluginVitest from '@vitest/eslint-plugin' // Для тестов Vitest
import pluginPlaywright from 'eslint-plugin-playwright' // Для e2e-тестов Playwright
import skipFormatting from '@vue/eslint-config-prettier/skip-formatting' // Интеграция с Prettier

export default defineConfigWithVueTs(
  // 1. Указываем какие файлы нужно проверять
  {
    name: 'app/files-to-lint',
    files: ['**/*.{ts,mts,tsx,vue}'], // TS, Vue и JSX-файлы
  },

  // 2. Указываем что игнорировать
  {
    name: 'app/files-to-ignore',
    ignores: [
      '**/dist/**',      // Игнорируем папку сборки
      '**/dist-ssr/**',  // Игнорируем SSR сборку
      '**/coverage/**'   // Игнорируем отчеты тестов
    ],
  },

  // 3. Базовые правила для Vue (essential)
  pluginVue.configs['flat/essential'],

  // 4. Рекомендуемые правила для Vue + TypeScript
  vueTsConfigs.recommended,
  
  // 5. Правила для Vitest (только для тестов)
  {
    ...pluginVitest.configs.recommended,
    files: ['src/**/__tests__/*'], // Применяем только к тестам
  },
  
  // 6. Правила для Playwright (e2e тесты)
  {
    ...pluginPlaywright.configs['flat/recommended'],
    files: ['e2e/**/*.{test,spec}.{js,ts,jsx,tsx}'],
  },
  
  // 7. Отключаем проверку форматирования (для Prettier)
  skipFormatting,
)

// ==============================================
// ШПАРГАЛКА ПО КОНФИГУ
// ==============================================
/*
1. ЗАПУСК ПРОВЕРКИ:
   - В терминале: `eslint .`
   - Для автофикса: `eslint . --fix`

2. ЧТО ПРОВЕРЯЕТ:
   - Синтаксис Vue/TS
   - Стиль кода
   - Unit-тесты (Vitest)
   - e2e-тесты (Playwright)

3. КАК РАСШИРИТЬ:
   - Добавить правила: `rules: { 'vue/multi-word-component-names': 'off' }`
   - Добавить поддержку JSX: раскомментировать блок configureVueProject
   - Добавить новые плагины: import новыйПлагин + добавить в конфиг

4. ЧАСТО ИСПОЛЬЗУЕМЫЕ ПРАВИЛА:
   - 'vue/no-unused-components' - неиспользуемые компоненты
   - '@typescript-eslint/no-explicit-any' - запрет any типов
   - 'vitest/expect-expect' - проверка assertions в тестах
*/






// import pluginVue from 'eslint-plugin-vue'
// import { defineConfigWithVueTs, vueTsConfigs } from '@vue/eslint-config-typescript'
// import pluginVitest from '@vitest/eslint-plugin'
// import pluginPlaywright from 'eslint-plugin-playwright'
// import skipFormatting from '@vue/eslint-config-prettier/skip-formatting'

// // To allow more languages other than `ts` in `.vue` files, uncomment the following lines:
// // import { configureVueProject } from '@vue/eslint-config-typescript'
// // configureVueProject({ scriptLangs: ['ts', 'tsx'] })
// // More info at https://github.com/vuejs/eslint-config-typescript/#advanced-setup

// export default defineConfigWithVueTs(
//   {
//     name: 'app/files-to-lint',
//     files: ['**/*.{ts,mts,tsx,vue}'],
//   },

//   {
//     name: 'app/files-to-ignore',
//     ignores: ['**/dist/**', '**/dist-ssr/**', '**/coverage/**'],
//   },

//   pluginVue.configs['flat/essential'],
//   vueTsConfigs.recommended,
  
//   {
//     ...pluginVitest.configs.recommended,
//     files: ['src/**/__tests__/*'],
//   },
  
//   {
//     ...pluginPlaywright.configs['flat/recommended'],
//     files: ['e2e/**/*.{test,spec}.{js,ts,jsx,tsx}'],
//   },
//   skipFormatting,
// )
