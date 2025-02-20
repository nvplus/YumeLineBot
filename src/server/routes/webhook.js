import express from 'express';
import { getUsersByCardId } from '../../db/db.js';
import config from '../../../config.json' assert { type: 'json' };
import { log } from '../../util.js';

const { apiKeys } = config;

const router = express.Router();

router.post('/', async (req, res) => {
    let apiKey;

    if (req.headers.authorization) {
        apiKey = req.headers.authorization.replace('Bearer ', '');
    }
    
    if (!apiKey || !apiKeys.includes(apiKey)) {
        return res.status(401).json({error: 'Nice try Diddy'});
    }

    const client = req.client;
    const { game_name, card_ids } = req.body;
    let count = 0;

    if (!client || !client.readyAt) {
        return res.status(503).json({ error: 'Bot is not ready.' });
    }

    if (!game_name || !card_ids) {
        return res.status(400).json({ error: 'Please double check game name or card ids array.'})
    }

    try {
        const users = await getUsersByCardId(card_ids);
        for (const user of users) {
            if (user && user.notifications_enabled) {
                client.users.send(user.discord_id, `You're up next for ${game_name}! Please head over to the machine and prepare for your turn.`);
                count += 1;
            }
        }
        res.status(200).send(`Successfully sent ${count} notifications`);
    }
    catch (err) {
        log.error(err);
        res.status(500).send(`Error sending messages`);
    }
});

export default router;