# --- Build stage ---
FROM node:20 AS builder
WORKDIR /app

# kopiujemy tylko package.json + lock, aby bazowy layer cache'ował instalację deps
COPY package*.json ./

RUN npm install

# kopiujemy resztę projektu
COPY . .

RUN npm run build

# --- Runtime stage ---
FROM node:20-alpine
WORKDIR /app

ENV NODE_ENV=production

COPY --from=builder /app ./

EXPOSE 3000

CMD ["npm", "start"]
