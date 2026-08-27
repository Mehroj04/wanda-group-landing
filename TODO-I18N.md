# i18n status

**42 языка** в селекторе, у каждого есть JSON в `src/i18n/locales/`.

Список кодов: `ar bn bg hr cs da nl en fil fi fr de el hi hu id it ja kk ko lv lt ms no pl pt ro ru sr sk sl es sw sv th tr uk ur uz vi zh tg`.

## Покрытие (аудит 27.08.2026)

| Язык | Отличие от EN | Комментарий |
|---|---|---|
| ru | ~96% | Полный для СНГ |
| zh | ~93% | Английские абзацы убраны; совпадения — ISO / модели WG |
| fil / da / nl | ~91% | Доперевод отзывов, privacy и UI; коды WG / ISO остаются |
| ms | ~90% | То же |
| большинство | 90–95% | Нормально для витрины |

Коды ISO, модели WG-2 и цены в долларах специально остаются латиницей.

## Инструменты

Перегенерация (квота MyMemory может быть исчерпана):

```bash
node scripts/retry-mymemory.mjs
node scripts/audit-locales.mjs
```
