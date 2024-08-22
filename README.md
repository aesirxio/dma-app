# AesirX Marketing Automation Platform

## About

AesirX Marketing Automation Platform is our enterprise-level Digital Marketing Automation platform As a Service (DMAaaS). It fully connects and integrates the marketing department to web, e-commerce, mail, social media, and any other channel, delivering max results.

Find out more in [https://dma.aesirx.io/](https://dma.aesirx.io)

## Development

1. This project is using Monorepos with git submodule. You need to run `git submodule update --init --recursive` after cloned the project.
2. Run `yarn install` to install the dependencies.
3. Run `yarn prepare` to build the dependencies.
2. Rename the `.env.dist` file to `.env`.
3. Replace license keys in the `.env` file with the one provided in your profile account.
   1. `REACT_APP_SSO_CLIENT_ID` replace this with the provided `SSO CLIENT ID` from https://dapp.shield.aesirx.io/licenses
   2. `REACT_APP_SSO_CLIENT_SECRET` replace this with the provided `SSO CLIENT SECRET` from https://dapp.shield.aesirx.io/licenses
   3. `PORT` change the port. Default is 3000

5. Run  `yarn dev`
6. Open [http://localhost:3000](http://localhost:3000) - 3000 is `PORT` to view it in the browser.

## Production
Run on a webserver:
1. Run `yarn build` after changed `.env` file.
2. Upload `packages/aesirx-dma-app/build` folder to webserver.

### Dockerize
1. Run `docker compose -f "docker-compose.yml" up -d --build` after changed `.env` file.
