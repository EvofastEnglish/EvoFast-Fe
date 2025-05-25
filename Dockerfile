# Stage 1: Build the application
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Production image
FROM node:20-alpine AS runner
WORKDIR /app
#ENV NODE_ENV production
COPY --from=builder /app/package.json ./package.json
RUN npm install --only=production
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
EXPOSE 3000
CMD ["npm", "start"]