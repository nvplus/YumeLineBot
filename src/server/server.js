import express from 'express';
import bodyParser from 'body-parser';
import config from '../../config.json' assert { type: 'json' };
import webhookRoutes from './routes/webhook.js';
import client from '../bot/bot.js';

/**
 * Webhook server to receieve line data information
 * @returns { express } An instance of the webhook server
 */
const WebhookServer = () => {
    if (!client) {
        console.error('Client must be running to start the server.');
        return;
    }

    const app = express();
    
    // Middleware
    app.use(bodyParser.json());
    app.use((req, res, next) => {
        req.client = client;
        next();
    });

    // Routes
    app.use('/webhook', webhookRoutes);

    return app;
}

export default WebhookServer;