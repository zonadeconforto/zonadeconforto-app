FROM node:22-alpine

RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app

RUN mkdir -p /app/apps/web

COPY apps/web/package.json apps/web/pnpm-lock.yaml* ./
COPY apps/web/package.json ./apps/web/
COPY apps/web/prisma ./apps/web/prisma

WORKDIR /app/apps/web

RUN pnpm install

COPY . .

EXPOSE 3000

CMD ["pnpm", "dev"]
