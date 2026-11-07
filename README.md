# online-store

Интернет-магазин: React (Vite) + Express + MongoDB.

## Запуск через Docker

Нужны Docker и Docker Compose.

```bash
cp .env.example .env          # впишите JWT_SECRET (openssl rand -hex 32)
docker compose up -d --build  # mongo + backend + frontend (nginx)
docker compose --profile seed run --rm seed   # один раз: заполнить категории
```

Приложение: http://localhost:8080

| Сервис     | Описание                                                        |
|------------|-----------------------------------------------------------------|
| `caddy`    | только в проде: TLS (Let's Encrypt), HTTP→HTTPS, HSTS           |
| `frontend` | nginx со сборкой Vite; проксирует `/api` и `/uploads` в backend |
| `backend`  | Express API на порту 8000 (доступен только внутри сети compose) |
| `mongo`    | MongoDB 7, данные в volume `mongo-data`                         |
| `seed`     | разовый запуск `seed.js` (profile `seed`)                       |

Загруженные изображения хранятся в volume `uploads`.

Полезные команды:

```bash
docker compose logs -f backend   # логи
docker compose down              # остановить
docker compose down -v           # остановить и удалить данные
```

## Сеть

```
интернет ──80/443──▶ caddy ──edge──▶ frontend (nginx) ──app──▶ backend ──data──▶ mongo
                     (prod)          (локально: :8080)
```

- `edge` — единственная сеть с доступом наружу; наружу опубликован только `caddy` (в проде) или `frontend` (локально).
- `app` и `data` — `internal: true`: у backend и mongo нет выхода в интернет, и они недоступны с хоста. frontend не видит mongo.
- nginx: rate limit (`/api/auth/login|register` — 10 запросов/мин с одного IP, остальной `/api` — 20 запросов/с; при превышении 429), gzip, заголовки безопасности, реальный IP клиента из `X-Forwarded-For` (доверяется только сети `edge`, `172.30.250.0/24`).
- Healthchecks: `GET /api/health` (backend), `GET /healthz` (nginx); сервисы стартуют по готовности зависимостей.

## Продакшен (HTTPS)

На сервере с Docker: откройте порты 80 и 443, направьте A-запись домена на IP сервера и задайте в `.env` переменные `DOMAIN` и `JWT_SECRET`.

```bash
docker compose -f docker-compose.yml -f docker-compose.prod.yml up -d --build
```

Caddy сам получит и будет обновлять сертификат Let's Encrypt. Порт 8080 в этом режиме не публикуется.

## Локальная разработка без Docker

Нужны Node.js 22 и запущенная MongoDB на `localhost:27017`.

```bash
cd backend && npm install && npm run dev     # http://localhost:8000
cd frontend && npm install && npm run dev    # http://localhost:5173
```

## Переменные окружения

Backend (`backend/.env`, см. `backend/.env.example`):

- `MONGO_URI` — строка подключения к MongoDB (по умолчанию `mongodb://localhost:27017/online-shop`)
- `JWT_SECRET` — секрет для JWT
- `PORT` — порт API (по умолчанию `8000`)

Frontend (на этапе сборки):

- `VITE_API_BASE_URL` — базовый URL API (по умолчанию `http://localhost:8000/api`, в Docker — `/api`)
- `VITE_IMAGE_BASE_URL` — базовый URL картинок (по умолчанию `http://localhost:8000`, в Docker — пусто)

## CI

GitHub Actions (`.github/workflows/ci.yml`): lint и сборка фронтенда, проверка бэкенда, сборка Docker-образов.
