import express from 'express';
import { getUserById } from '../../db/db.js';

const router = express.Router();

router.post('/', async (req, res) => {
    const client = req.client;
    const { game_name, user_ids } = req.body;

    if (!client || !client.readyAt) {
        return res.status(503).json({ error: 'Bot is not asable.' });
    }

    for (const user_id of user_ids) {
        const user = await getUserById(user_id);
        if (user && user.notifications_enabled) {
            client.users.send(user.discord_id, `You're up next for ${game_name}! Please head over to the machine and prepare for your turn.`);
        }
    }

    res.status(200).send('SUCCESS');
});

export default router;