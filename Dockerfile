# -----------------------------
# Stage 1: Dependencies
# -----------------------------
FROM node:20-alpine AS deps
WORKDIR /app

# Enable Corepack and config Yarn 4.x (Berry)
RUN corepack enable && corepack prepare yarn@4.9.2 --activate

# Copy package.json, lockfile and Yarn config (Berry)
COPY package.json yarn.lock* .yarnrc.yml .yarn ./

# Install dependencies reproducible
RUN yarn install --immutable

# -----------------------------
# Stage 2: Builder
# -----------------------------
FROM node:20-alpine AS builder
WORKDIR /app

# Copy node_modules from deps stage
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NEXT_TELEMETRY_DISABLED=1

# Build Next.js
RUN yarn build

# -----------------------------
# Stage 3: Runner
# -----------------------------
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production

# Copy standalone output
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY public ./public

CMD ["node", "server.js"]
