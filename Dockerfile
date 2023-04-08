FROM node:18-slim as ts-compiler
WORKDIR /usr/app
COPY yarn.lock ./
COPY package*.json ./
COPY tsconfig*.json ./
RUN yarn install --frozen-lockfile
COPY . ./
RUN yarn run build

FROM node:18-slim as ts-remover
WORKDIR /usr/app
COPY --from=ts-compiler /usr/app/yarn.lock ./
COPY --from=ts-compiler /usr/app/package*.json ./
COPY --from=ts-compiler /usr/app/dist ./
ENV NODE_ENV=production
RUN yarn install --frozen-lockfile

FROM node:18-slim
WORKDIR /usr/app
COPY --from=ts-remover /usr/app ./
CMD node index.js