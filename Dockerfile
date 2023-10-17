
## builder
FROM node:16-alpine AS builder
WORKDIR /app

COPY .git .
COPY nx.json .
COPY package.json .
COPY yarn.lock .

COPY packages packages

RUN apk add --update --no-cache \
    make \
    g++ \
    jpeg-dev \
    cairo-dev \
    giflib-dev \
    pango-dev \
    libtool \
    autoconf \
    automake \
    git

RUN yarn install --frozen-lockfile --network-timeout 600000

# Build the app
RUN yarn build

# Bundle static assets
FROM node:16-alpine AS production
WORKDIR /app

# Copy built assets from builder
COPY --from=builder app/packages/aesirx-dma-app/build build

RUN yarn add serve react-inject-env

# Expose port
EXPOSE 3000

ENTRYPOINT npx react-inject-env set && npx serve -s build

