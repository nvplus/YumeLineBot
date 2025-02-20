import express from 'express';
import bodyParser from 'body-parser';
import config from '../../config.json' assert { type: 'json' };
import webhookRoutes from './routes/webhook.js';
import client from '../bot/bot.js';
import { log } from '../util.js';

const { apiKeys } = config;

/**
 * Webhook server to receieve line data information
 * @returns { express } An instance of the webhook server
 */
const WebhookServer = () => {
    if (!client) {
        log.error('Client must be running to start the server.');
        return;
    }

    const app = express();
    
    app.use(bodyParser.json());

    // Pass Discord client instance to API
    app.use((req, res, next) => {
        req.client = client;
        next();
    });

    // Authentication middleware
    app.use((req, res, next) => {
        let apiKey;
        if (req.headers.authorization) {
            apiKey = req.headers.authorization.replace('Bearer ', '');
        }
        if (!apiKey || !apiKeys.includes(apiKey)) {
            res.status(401).json({error: 'Nice try Diddy'});
            log.warn('There was an unsuccessful connection request due invalid credentials')
            return;
        }
        next();
    }); 

    // Routes
    app.use('/webhook', webhookRoutes);

    return app;
}

export default WebhookServer;