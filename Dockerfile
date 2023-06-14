FROM node:18-slim as ts-compiler
WORKDIR /usr/app
COPY package*.json pnpm-lock.yaml ./
RUN npm install -g pnpm
RUN pnpm install --frozen-lockfile
COPY . .
RUN pnpm run build

FROM node:18-slim as ts-remover
WORKDIR /usr/app
COPY --from=ts-compiler /usr/app/pnpm-lock.yaml ./
COPY --from=ts-compiler /usr/app/package*.json ./
COPY --from=ts-compiler /usr/app/dist ./
ENV NODE_ENV=production
RUN npm install -g pnpm
RUN pnpm install --frozen-lockfile

FROM node:18-slim
WORKDIR /usr/app
COPY --from=ts-remover /usr/app ./
CMD node index.js
