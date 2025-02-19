import config from '../config.json' assert { type: 'json' };
import YumeLineBot from './bot/bot.js';
import WebhookServer from './server/server.js';
const { token, apiPort } = config;
const PORT = apiPort || 3000;

const client = YumeLineBot();
const app = WebhookServer(client);
app.listen(PORT, () => console.log(`Webhook server running on port ${PORT}`));
client.login(token);