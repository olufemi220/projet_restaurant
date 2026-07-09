FROM node:16-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM nginx:1.25-alpine AS production

COPY --from=build /app/build /usr/share/nginx/html
