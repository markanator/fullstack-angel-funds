# Install dependencies only when needed
FROM node:18-alpine AS base
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
RUN  yarn global add pnpm

FROM base AS deps
WORKDIR /app
COPY ./backend/package.json ./backend/pnpm-lock.yaml .
RUN pnpm i --frozen-lockfile

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
ADD prisma .
RUN npx prisma generate
COPY ./backend/ .
RUN pnpm build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY --from=build /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=build /app/dist ./dist
COPY --from=build /app/package*.json ./
ADD prisma ./prisma

ENV NODE_ENV production
ENV PORT 8080
EXPOSE 8080

CMD ["pnpm", "start"]
