# AesirX DMA

## About

AesirX DMA is our enterprise-level Digital Marketing Automation platform As a Service (DMAaaS). It fully connects and integrates the marketing department to web, e-commerce, mail, social media, and any other channel, delivering max results.

Find out more in [https://dma.aesirx.io/](https://dma.aesirx.io)

## Setup

### Configure

1. Rename the `.env.dist` file to `.env`.
2. Replace license keys in the .env file with the one provided in your profile account.
    `REACT_APP_SSO_CLIENT_ID` replace this with the provided `REACT_APP_SSO_CLIENT_ID` from https://dma.aesirx.io
    `REACT_APP_SSO_CLIENT_SECRET` replace this with the provided `REACT_APP_SSO_CLIENT_SECRET` from https://dma.aesirx.io
3. Update Domain & Test domain for licenses. See the install guide for more information https://dma.aesirx.io/install-guide

### `yarn dev`

Run the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `yarn build`

Get a full build and install it in your favorite web server.

## Dockerize

### Production
`docker compose -f "docker-compose.yml" up -d --build`
