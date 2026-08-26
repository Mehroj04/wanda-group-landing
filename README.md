# Wanda Group — производитель газовых баллонов

Лендинг **Wanda Group** (ацетилен, пропан, генераторы, аксессуары).  
Прод: https://www.wandagroups.com

React + Vite + TypeScript. **42 языка**. Форма: Web3Forms + запасной маршрут `/api/inquiry`.

## Стек

- React 19, Vite 6, TypeScript
- 42 локали в `src/i18n/locales/*.json`
- Контакты: телефон, WhatsApp, Telegram, WeChat QR, email
- Фото в `public/images/wg/`
- SEO: `robots.txt`, `sitemap.xml` (42 URL + hreflang), canonical, JSON-LD
- Аналитика: `@vercel/analytics`, Speed Insights; GA4 опционально через `VITE_GA_MEASUREMENT_ID`
- Хостинг: Vercel (scope `wanda-group`)

## Быстрый старт

```bash
cd C:\Users\user\Projects\wanda-group-landing
npm install
npx vite --host 127.0.0.1 --port 5188 --strictPort
```

Откройте http://127.0.0.1:5188/

Либо `npm run dev` (порт Vite по умолчанию).

### Форма заявок

Ключ Web3Forms задаётся на Vercel:

- `VITE_WEB3FORMS_ACCESS_KEY` — публичный ключ для браузера
- `WEB3FORMS_ACCESS_KEY` — тот же ключ на сервере для `/api/inquiry`

Локально скопируйте `.env.example` в `.env`. Без ключа форма уходит на `/api/inquiry` или предлагает `sales@wandagroups.com`.

Опционально GA4:

```
VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

## Сборка

```bash
npm run build
npm run preview
```

## Деплой

Только по явной команде «deploy»:

```bash
npx vercel deploy --prod --yes --scope wanda-group
```

После выкладки имеет смысл отправить sitemap в [Google Search Console](https://search.google.com/search-console) и [Яндекс.Вебмастер](https://webmaster.yandex.ru/) — без этого новый домен в выдаче появляется медленно.

## Контент

| Что изменить | Файл |
|---|---|
| Контакты, адрес | `src/config/site.ts` |
| Фото | `src/config/images.ts`, `src/config/story.ts` |
| Языки | `src/i18n/languages.ts`, `src/i18n/locales/*.json` |
| SEO | `src/config/seo.ts`, `index.html`, `public/robots.txt`, `public/sitemap.xml` |
| Форма | `src/components/Contact.tsx`, `api/inquiry.js` |
| Аналитика | `src/config/analytics.ts`, `src/main.tsx` |

## Структура

```
src/
├── components/     # секции лендинга
├── config/         # контакты, фото, SEO, аналитика
├── i18n/           # 42 языка
└── App.tsx
public/
├── images/wg/      # продукция, галерея, стори, QR WeChat
├── robots.txt
└── sitemap.xml
api/
└── inquiry.js      # запасная отправка заявки
```
