# Wanda Group — Gas Cylinder Manufacturer

Современный двуязычный лендинг (RU/EN) для **Wanda Group Gas Cylinder Manufacturer**.

## Возможности

- React + TypeScript + Vite
- Переключатель языка RU / EN
- Фото продукции и производства (Unsplash)
- SVG-логотип компании
- Форма заявок с отправкой на email через [Formspree](https://formspree.io)
- WhatsApp и прямые ссылки на email/телефон
- Галерея производства
- SEO: meta-теги и Open Graph
- Готов к деплою на Vercel и Netlify

## Быстрый старт

### 1. Установите Node.js

Скачайте [Node.js LTS](https://nodejs.org/) и перезапустите терминал.

### 2. Запустите проект

```bash
cd C:\Users\user\Projects\wanda-group-landing
npm install
npm run dev
```

Откройте http://localhost:5173

### 3. Настройте форму обратной связи

1. Зарегистрируйтесь на https://formspree.io (бесплатно)
2. Создайте новую форму и укажите email для получения заявок
3. Скопируйте ID формы (например `xyzabcde`)
4. Создайте файл `.env` в корне проекта:

```
VITE_FORMSPREE_FORM_ID=ваш_id_формы
```

5. Перезапустите `npm run dev`

Без Formspree ID форма покажет сообщение с прямым email `sales@wandagroup.com`.

## Сборка для продакшена

```bash
npm run build
npm run preview
```

## Деплой

### Vercel (рекомендуется)

1. Загрузите проект на GitHub
2. Зайдите на https://vercel.com → Import Project
3. Добавьте переменную окружения:
   - `VITE_FORMSPREE_FORM_ID` = ваш ID формы
4. Deploy — сайт будет доступен по адресу `*.vercel.app`

Файл `vercel.json` уже настроен.

### Netlify

1. Загрузите проект на GitHub
2. Зайдите на https://netlify.com → Add new site
3. Build command: `npm run build`
4. Publish directory: `dist`
5. Добавьте env variable `VITE_FORMSPREE_FORM_ID`
6. Deploy

Файл `netlify.toml` уже настроен.

## Настройка контента

| Что изменить | Файл |
|---|---|
| Переводы RU/EN | `src/i18n/translations.ts` |
| Email, телефон, адрес | `src/config/site.ts` |
| Фото | `src/config/images.ts` |
| Цвета и шрифты | `src/index.css` |

## Структура

```
src/
├── components/     # Секции лендинга
├── config/         # Контакты, фото, Formspree
├── i18n/           # Переводы и контекст языка
└── App.tsx         # Главная страница
```

## Замена фото на свои

Положите изображения в папку `public/images/` и обновите пути в `src/config/images.ts`:

```ts
hero: {
  main: '/images/your-hero.jpg',
  ...
}
```

Рекомендуемые размеры: Hero 900×1100, продукты 600×400, галерея 600×450.
