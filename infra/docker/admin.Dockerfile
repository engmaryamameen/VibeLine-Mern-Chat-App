FROM node:20-alpine
WORKDIR /app
RUN corepack enable
COPY . .
RUN pnpm install --frozen-lockfile=false
RUN pnpm --filter @vibeline/admin build
EXPOSE 3001
CMD ["pnpm", "--filter", "@vibeline/admin", "start"]
