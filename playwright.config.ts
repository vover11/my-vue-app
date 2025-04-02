import process from 'node:process' // Для работы с переменными окружения
import { defineConfig, devices } from '@playwright/test' // Базовые инструменты Playwright

/**
 * Основная конфигурация Playwright для E2E-тестов
 */
export default defineConfig({
  // Папка с тестами
  testDir: './e2e',
  
  // Таймауты
  timeout: 30 * 1000, // Максимальное время выполнения теста (30 сек)
  expect: {
    timeout: 5000, // Максимальное время ожидания в expect (5 сек)
  },

  // Настройки для CI-окружения
  forbidOnly: !!process.env.CI, // Запрет test.only на CI
  retries: process.env.CI ? 2 : 0, // Повторы только на CI
  workers: process.env.CI ? 1 : undefined, // Параллелизм (на CI - 1 worker)

  // Отчётность
  reporter: 'html', // Генерация HTML-отчёта

  // Общие настройки
  use: {
    actionTimeout: 0, // Таймаут действий (без ограничений)
    baseURL: process.env.CI ? 'http://localhost:4173' : 'http://localhost:5173', // Базовый URL
    trace: 'on-first-retry', // Запись трассировки при повторе
    headless: !!process.env.CI, // Без GUI только на CI
  },

  // Браузеры для тестирования
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
    // Закомментированы примеры мобильных и брендовых браузеров
  ],

  // Локальный сервер для тестов
  webServer: {
    command: process.env.CI ? 'npm run preview' : 'npm run dev', // Команда запуска
    port: process.env.CI ? 4173 : 5173, // Порт
    reuseExistingServer: !process.env.CI, // Переиспользование сервера
  },
})

// ===================
// ШПАРГАЛКА PLAYWRIGHT
// ===================
/*
1. ОСНОВНЫЕ КОМАНДЫ:
   • Запуск тестов: npx playwright test
   • Генерация отчёта: npx playwright show-report
   • Запуск в UI-режиме: npx playwright test --ui
   • Дебаг: npx playwright test --debug

2. КЛЮЧЕВЫЕ НАСТРОЙКИ:
   • testDir - папка с тестами
   • timeout - максимальное время теста
   • projects - список браузеров/устройств
   • webServer - конфигурация тестового сервера

3. ПОПУЛЯРНЫЕ ДОПОЛНЕНИЯ:
   • Видеозапись тестов: 
     use: { video: 'on' }
   • Скриншоты при падении:
     use: { screenshot: 'only-on-failure' }
   • Глобальные хуки:
     globalSetup: './global-setup.ts',
     globalTeardown: './global-teardown.ts'

4. ПРИМЕР ТЕСТА:
   import { test, expect } from '@playwright/test'
   
   test('basic test', async ({ page }) => {
     await page.goto('/')
     await expect(page).toHaveTitle('My App')
     await page.click('button')
     await expect(page.locator('.result')).toHaveText('Success')
   })

5. ПОЛЕЗНЫЕ ССЫЛКИ:
   • Документация: https://playwright.dev/docs/intro
   • API Reference: https://playwright.dev/docs/api/class-playwright
   • Примеры тестов: https://playwright.dev/docs/sample-tests
*/



// Этот конфигурационный файл Playwright предназначен для **end-to-end (E2E) тестирования** вашего веб-приложения. Вот что именно он тестирует:

// ### 🌐 **Что тестирует Playwright с этой конфигурацией?**
// 1. **Работоспособность приложения в основных браузерах**:
//    - `Chromium` (движок Chrome/Edge)
//    - `Firefox`
//    - `WebKit` (движок Safari)
//    *(мобильные и другие браузеры закомментированы, но могут быть добавлены)*

// 2. **Критические пользовательские сценарии**:
//    - Загрузка страниц (`page.goto()`)
//    - Навигация по приложению
//    - Работа с формами (ввод текста, клики)
//    - Проверка содержимого страниц (`expect().toHaveText()`)
//    - Состояние элементов (видимость, активность)

// 3. **Особенности вашей конфигурации**:
//    - Тесты запускаются на **вашем локальном сервере** (`npm run dev` на порту 5173)
//    - На CI (GitHub Actions и т.д.) использует **продакшен-сборку** (`npm run preview` на порту 4173)
//    - Проверяет корректность работы как в **headless-режиме** (без GUI, на CI), так и с открытым браузером (локально)

// ### 🔍 **Где искать сами тесты?**
// Тесты лежат в папке `./e2e` (указано в `testDir`). Пример структуры:
// ```
// e2e/
//   ├── auth.spec.ts  # Тесты авторизации
//   ├── cart.spec.ts  # Тесты корзины
//   └── home.spec.ts  # Тесты главной страницы
// ```

// ### 🛠 **Как именно проходит тестирование?**
// 1. **Запускается ваш сервер** (Vite/Vue-приложение)
// 2. **Playwright открывает браузеры** и имитирует действия пользователя:
//    ```ts
//    await page.goto('/login')  // Переход на страницу
//    await page.fill('#email', 'test@test.com')  // Ввод данных
//    await page.click('button[type="submit"]')  // Клик по кнопке
//    await expect(page).toHaveURL('/dashboard')  // Проверка перехода
//    ```
// 3. **Фиксируются результаты**:
//    - HTML-отчёт (из-за `reporter: 'html'`)
//    - При необходимости — скриншоты, видео (если добавить `video: 'on'`)

// ### 🚨 **Что делает конфиг особым?**
// - **Автоматическая адаптация под CI/локальную среду**:
//   ```js
//   baseURL: process.env.CI ? 'http://localhost:4173' : 'http://localhost:5173'
//   ```
// - **Защита от случайных `test.only` на CI** (`forbidOnly: !!process.env.CI`)
// - **Трассировка шагов для дебага** (`trace: 'on-first-retry'`)

// ### 📌 **Пример теста для Vue-приложения**
// ```ts
// // e2e/home.spec.ts
// import { test, expect } from '@playwright/test'

// test('Главная страница загружается', async ({ page }) => {
//   await page.goto('/')
//   await expect(page).toHaveTitle('Моё Vue-приложение')
//   await expect(page.locator('h1')).toHaveText('Добро пожаловать')
// })
// ```

// ### 💡 **Когда это особенно полезно?**
// - Проверка работы роутинга (`vue-router`)
// - Тестирование форм (логин, регистрация)
// - Валидация SSR-контента (если используется)
// - Проверка адаптивности (при добавлении мобильных устройств)

// **Итог:** Этот конфиг тестирует **фактическое поведение вашего приложения в реальных браузерах**, как это увидел бы конечный пользователь. Все тесты находятся в `e2e/` и могут быть дополнены под ваши нужды.