# AesirX DMA

## About

AesirX DMA is our enterprise-level Digital Marketing Automation platform As a Service (DMAaaS). It fully connects and integrates the marketing department to web, e-commerce, mail, social media, and any other channel, delivering max results.

Find out more in [https://dma.aesirx.io/](https://dma.aesirx.io)

## Setup

### Configure

1. Get your `REACT_APP_CLIENT_SECRET` key from https://dma.aesirx.io by creating an account.
2. Rename the `.env.dist` file to `.env`.
3. Replace license keys in the .env file with the one provided in your profile account.
    `REACT_APP_CLIENT_SECRET` replace this with the provided `REACT_APP_CLIENT_SECRET` from https://dma.aesirx.io
    `REACT_APP_LICENSE` replace this with the provided `REACT_APP_LICENSE` from https://dma.aesirx.io
    `REACT_APP_SSO_CLIENT_ID` replace this with the provided `REACT_APP_SSO_CLIENT_ID` from https://dma.aesirx.io
    `REACT_APP_SSO_CLIENT_SECRET` replace this with the provided `REACT_APP_SSO_CLIENT_SECRET` from https://dma.aesirx.io
    `REACT_APP_DAM_LICENSE` replace this with the provided `REACT_APP_DAM_LICENSE` from https://dam.aesirx.io/
4. Update Domain & Test domain for licenses. See the install guide for more information https://dma.aesirx.io/install-guide

### `yarn dev`

Run the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `yarn build`

Get a full build and install it in your favorite web server.

## Dockerize

### Production
`docker compose -f "docker-compose.yml" up -d --build`
