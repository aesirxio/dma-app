
## Deps
FROM node:16-alpine AS deps
WORKDIR /app

COPY package.json .
COPY yarn.lock .

RUN yarn install --frozen-lockfile --network-timeout 600000

## Builder
FROM node:16-alpine AS builder
WORKDIR /app

# Cache and Install dependencies
COPY --from=deps ./app/node_modules ./node_modules

# Copy app files
COPY ./package.json ./
COPY ./jsconfig.json ./
COPY ./.eslintrc ./
COPY ./public ./public/
COPY ./src ./src/

# Build the app
RUN npx react-scripts build

# Bundle static assets
FROM node:16-alpine AS production
WORKDIR /app

# Copy built assets from builder
COPY --from=builder ./app/build ./build

RUN yarn add serve react-inject-env

# Expose port
EXPOSE 3000

ENTRYPOINT npx react-inject-env set && npx serve -s build

