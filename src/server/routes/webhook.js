import express from 'express';

const router = express.Router();

router.post('/', async (req, res) => {
    const client = req.client;

    if (!client || !client.readyAt) {
        return res.status(503).json({ error: 'Bot is not available.' });
    }

    console.log(`Webhook data received: ${JSON.stringify(req.body)}`);

    res.status(200).send('SUCCESS');
});

export default router;