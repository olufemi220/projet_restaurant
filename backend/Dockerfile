FROM node:18-slim

RUN apt-get update \
    && apt-get install -y --no-install-recommends bash netcat-openbsd python3 make g++ \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY package*.json ./
RUN npm ci --omit=dev

COPY . .

RUN chmod +x docker-entrypoint.sh

EXPOSE 5000

ENTRYPOINT ["./docker-entrypoint.sh"]
CMD ["npm", "start"]
