FROM node:22-bookworm-slim

WORKDIR /app

COPY package*.json ./

RUN npm install --omit=dev

COPY . .

RUN groupadd -r appgroup && useradd -r -s /bin/false -g appgroup appuser \
    && chown -R appuser:appgroup /app

USER appuser

EXPOSE 3001

CMD ["node", "server.js"]
