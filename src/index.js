import config from '../config.json' assert { type: 'json' };
import YumeLineBot from './bot/bot.js';
const { token } = config;

const client = YumeLineBot();
client.login(token);