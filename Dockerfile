FROM node:16-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci
RUN npm install

COPY . .

RUN npm run build

# Stage 2: Run the Nest.js application
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install --only=production

COPY --from=builder /app/dist ./dist

CMD ["node", "dist/main"]
