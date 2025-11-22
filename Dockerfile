FROM node:22-alpine

RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app

COPY apps/web/package.json apps/web/pnpm-lock.yaml* ./
COPY apps/web/package.json ./apps/web/

WORKDIR /app/apps/web

RUN pnpm install

COPY . .

EXPOSE 3000

CMD ["pnpm", "dev"]
