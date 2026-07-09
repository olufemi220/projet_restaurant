FROM node:16-alpine AS frontend-build

WORKDIR /app

COPY frontend/package*.json ./
RUN npm ci

COPY frontend/ ./
RUN npm run build

FROM nginx:1.25-alpine

COPY --from=frontend-build /app/build /usr/share/nginx/html
COPY nginx/default.prod.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
