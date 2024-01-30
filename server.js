// TODO use typescript and build stage for this file
const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');
const TelegramBot = require('node-telegram-bot-api');

const dev = process.env.NODE_ENV !== 'production'
const hostname = 'localhost';
const port = 8080;
// when using middleware `hostname` and `port` must be provided below
const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();
const token = process.env.NEXT_PUBLIC_TG_BOT_API_KEY;

// Create a new Telegram bot instance
const bot = new TelegramBot(token, { polling: true });

// Listen for incoming messages
bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    const message = msg.text;

    bot.sendMessage(chatId, 'Got it ! ' + message);
    console.log(msg);
});

app.prepare().then(() => {
  createServer(async (req, res) => {
    try {
      // Be sure to pass `true` as the second argument to `url.parse`.
      // This tells it to parse the query portion of the URL.
      const parsedUrl = parse(req.url, true);
      const { pathname, query } = parsedUrl;
 
      if (pathname === '/sendToUserFromWebApp') {
          //TODO move this part to class 
          const article = {
            type: 'article',
            id: query.query_id,
            title: 'Message from the mini app',
            input_message_content: {
                message_text: `MiniApp: Hello from Mini App`
            }
        }
        await bot.answerWebAppQuery(query.query_id, article);
        res.statusCode = 200;
        res.end('Message sent');
      } else if (pathname === '/b') {
        await app.render(req, res, '/b', query);
      } else {
        await handle(req, res, parsedUrl);
      }
    } catch (err) {
      console.error('Error occurred handling', req.url, err);
      res.statusCode = 500;
      res.end('internal server error');
    }
  })
    .once('error', (err) => {
      console.error(err);
      process.exit(1);
    })
    .listen(port, () => {
      console.log(`> Ready on http://${hostname}:${port}`);
    })
});

