import config from '../config.json' assert { type: 'json' };
import client from './bot/bot.js';
import db from './db/db.js';
import WebhookServer from './server/server.js';

const { token, apiPort } = config;
const PORT = apiPort || 3000;

const app = WebhookServer();

app.listen(PORT, () => console.log(`Webhook server running on port ${PORT}`));

client.login(token);

process.on('SIGINT', async () => {
  console.log('Shutting down...');
  try {
      await db.close((err) => {
        if (err) {
            reject('Error closing database: ' + err);
        } else {
            resolve('Database connection closed.');
        }
      });
      process.exit(0);
  } catch (err) {
      console.error('Error closing database:', err);
      process.exit(1);
  }
});