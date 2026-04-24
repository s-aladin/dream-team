# Форма обратной связи

Одностраничное приложение на Vue 3 с адаптивной формой обратной связи. Поддерживает пошаговое заполнение на мобильных устройствах и единую расширенную форму на десктопе. Реализована клиентская валидация полей с debounce, кастомные элементы (звёзды рейтинга, селект, быстрые ответы) с клавиатурной навигацией и ARIA-атрибутами.

## Стек

- **Vue 3** (Composition API, `<script setup>`)
- **Vite**
- **SCSS** (переменные, миксины, модульная структура)
- **Composables** (управление формой через `useFeedbackForm`)

## Структура проекта

```
src/
├── assets/
│   ├── images/
│   └── styles/              # глобальные SCSS: переменные, типографика, анимации, сетка
├── components/
│   ├── fields/              # FieldInput, TextareaInput, RatingStars, QuickReplies, PhoneInput
│   ├── UI/                  # CustomSelect, ProgressBar, StarIcon
│   ├── DesktopForm.vue
│   ├── MobileForm.vue
│   ├── FormController.vue
│   └── ResultScreen.vue
├── composables/
│   └── useFeedbackForm.js   # состояние формы, валидация, debounce
├── constants/
│   └── feedbackFormConstants.js
├── App.vue
└── main.js
```

## Особенности
Адаптивность: десктопная и мобильная версии, определение через window.innerWidth с debounce.

Валидация: пошаговая при сабмите и инкрементальная (с debounce 500 мс) на уровне отдельных полей.

Доступность: role, aria-expanded, aria-selected, role="combobox" в кастомном селекте, radiogroup для звёзд рейтинга, связки for/id на инпутах.

Клавиатурная навигация: полностью поддерживается в селекте (Enter, Esc, стрелки), рейтинге и кнопках.

Архитектура: composable для логики формы, константы вынесены, стили разделены на паршалы с SCSS-переменными и миксинами.

Анимации: плавные переходы между экранами и шагами (fade, slide).