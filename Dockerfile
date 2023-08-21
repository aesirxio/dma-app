
## Deps
FROM node:16-alpine AS deps
WORKDIR /app

COPY nx.json .
COPY package.json .
COPY yarn.lock .

COPY ./packages/aesirx-dma-app/package.json ./packages/aesirx-dma-app/package.json
COPY ./packages/aesirx-lib ./packages/aesirx-lib
COPY ./packages/aesirx-uikit ./packages/aesirx-uikit

RUN yarn install --frozen-lockfile --network-timeout 600000

## Builder
FROM node:16-alpine AS builder
WORKDIR /app

RUN apk add --no-cache git

# Cache and Install dependencies
COPY --from=deps ./app/node_modules ./node_modules
COPY --from=deps ./app/packages/aesirx-lib/dist ./packages/aesirx-lib/dist
COPY --from=deps ./app/packages/aesirx-uikit/dist ./packages/aesirx-uikit/dist

# Copy app files
COPY ./.git ./
COPY ./nx.json ./
COPY ./package.json ./

COPY ./packages/aesirx-lib/package.json ./packages/aesirx-lib/package.json
COPY ./packages/aesirx-uikit/package.json ./packages/aesirx-uikit/package.json

COPY ./packages/aesirx-dma-app/package.json ./packages/aesirx-dma-app/
COPY ./packages/aesirx-dma-app/craco.config.js ./packages/aesirx-dma-app/
COPY ./packages/aesirx-dma-app/jsconfig.json ./packages/aesirx-dma-app/
COPY ./packages/aesirx-dma-app/.eslintrc ./packages/aesirx-dma-app/
COPY ./packages/aesirx-dma-app/public ./packages/aesirx-dma-app/public
COPY ./packages/aesirx-dma-app/src ./packages/aesirx-dma-app/src

# Build the app
RUN yarn build

# Bundle static assets
FROM node:16-alpine AS production
WORKDIR /app

# Copy built assets from builder
COPY --from=builder ./app/packages/aesirx-dma-app/build ./build

RUN yarn add serve react-inject-env

# Expose port
EXPOSE 3000

ENTRYPOINT npx react-inject-env set && npx serve -s build

