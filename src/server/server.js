import express from 'express';
import bodyParser from 'body-parser';
import config from '../../config.json' assert { type: 'json' };
import webhookRoutes from './routes/webhook.js';

/**
 * Webhook server to receieve line data information
 * @param { client } client An running instance of YumeLineBot
 * @returns { express } An instance of the webhook server
 */
const WebhookServer = (client) => {
    if (!client) {
        console.error('You must pass an instance of the Yume line bot to start the server.')
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