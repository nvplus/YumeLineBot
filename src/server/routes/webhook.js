import express from 'express';
import { getUserCardById } from '../../db/db.js';
import config from '../../../config.json' assert { type: 'json' };
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
    const { game_name, user_ids } = req.body;
    let count = 0;

    if (!client || !client.readyAt) {
        return res.status(503).json({ error: 'Bot is not ready.' });
    }

    if (!game_name || !user_ids) {
        return res.status(400).json({ error: 'Please double check game name or user ids array.'})
    }
    /*
    for (const user_id of user_ids) {
        try {
            const user = await getUserById(user_id);
            if (user && user.notifications_enabled) {
                client.users.send(user.discord_id, `You're up next for ${game_name}! Please head over to the machine and prepare for your turn.`);
                count += 1;
            }
        } catch (err) {
            console.error(`Error trying to send message to user ${user_id}`);
        }
    }*/

    res.status(200).send(`Successfully sent ${count} notifications (${count}/${user_ids.length})`);
});

export default router;