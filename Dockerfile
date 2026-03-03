# Stage 1: Dependencies
FROM node:20-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

# Stage 2: Build
FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# Stage 3: Production Dependencies
FROM node:20-alpine AS prod-deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --omit=dev

# Stage 4: Execution
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=7003

# Copy node_modules from production stage
COPY --from=prod-deps /app/node_modules ./node_modules
# Copy only build artifacts
COPY --from=builder /app/build ./build
# Copy necessary configuration files
COPY package.json ./

EXPOSE 7003

CMD ["npm", "run", "start"]