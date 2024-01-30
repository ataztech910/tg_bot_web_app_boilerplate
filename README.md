# Telegram WebApp + TG Bot + NextJS + NextUI 

## Important information

1. NextJS works better with `yarn` in case of using cheap 1GB RAM VDS server for hosting. Please choose YARN over NPM if you planinig to host it in small VDS.
2. I use independent server runer in file `server.js`. This option required to run Telegram Bot with Telegram Web App from one instance
3. Do not trust any articles that shows how easy to host Telegram Bot in Vercel - its a lie. Vercel uses AWS Lambdas to provide server side possibility. That means that you will not have a polling that required to have for the chat bot. Webhooks will also not works as Lambda will go to sleep in any case.
4. In this boilerplate you will find all required tools to start creating your Telegram Application:
    - WebApp instance injected as a store
    - NextUI for the interfaces
    - Framer Motion for the animations
    - Color utils function to operate with theme colors (make it lighter or darker as we work with theme from TG)

### To start the project follow these steps
- `yarn install`
- `yarn dev`
- create .env file in your root with this variable `NEXT_PUBLIC_TG_BOT_API_KEY=<YOUR-BOT-API-KEY>`

### TODO:
- Create telegram icons component
- Add a docker container file (Nginx + ssl)
- Add a tunnel documentation to use Ngrok
- Add an Inline query web app generaation
- Cover server side with module
