# AesirX DMA

## About

AesirX DMA is our enterprise-level Digital Marketing Automation platform As a Service (DMAaaS). It fully connects and integrates the marketing department to web, e-commerce, mail, social media, and any other channel, delivering max results.

Find out more in [https://dma.aesirx.io/](https://dma.aesirx.io)

## Setup

### Configure

1. Get your `REACT_APP_CLIENT_SECRET` key from https://dma.aesirx.io by creating an account.
1. Rename the `.env.dist` file to `.env`.
1. Replace the `REACT_APP_CLIENT_SECRET` in the `.env` file with the one provided in your profile account.
1. Run `yarn install`

### `yarn dev`

Run the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `yarn build`

Get a full build and install it in your favorite web server.

## Dockerize
### Development
`docker compose -f "docker-compose.dev.yml" up -d --build`

### Production
`docker compose -f "docker-compose.pro.yml" up -d --build`
