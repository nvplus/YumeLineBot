import sqlite3 from 'sqlite3';
import path from 'path';
import sql from './sql.js';
import { log } from '../util.js';

const dbPath = path.resolve('./db/database.db');
const db = new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
    if (err) {
        log.error('Error opening database:', err);
        return;
    }
});

export const getCardsByDiscordId = (discordId) => {
    return sql.all(`
        SELECT card.* FROM card
        LEFT JOIN user ON user.id = card.user_id
        WHERE card.discord_id = ?
    `, [discordId]);
}

export const getCard = (cardId) => {
    return sql.get(`SELECT * FROM card WHERE id = ?`, [cardId])[0];
}

export const getUserCardById = async (cardId) => {
    const card = await getCard(cardId);
    if (card) {
        return sql.all(`
            SELECT user.* FROM user
            INNER JOIN card ON user.id = card.user_id
            WHERE card.card_id = ?
        `, [cardId]);
    }
}

export const getUsersByCardId = (cardIds) => {
    if (cardIds.length > 0) {
        return sql.all(`
            SELECT user.* FROM user
            INNER JOIN card ON card.user_id = user.id
            WHERE card_id in (?)
        `, [cardIds.join(',')]);
    }
}

export const getUserbyDiscordId = (discordId) => {
    return sql.get(`SELECT id, discord_id, notifications_enabled FROM user WHERE discord_id = ?`, [discordId]);
}

export const registerUser = async (cardId, discordId) => {
    const user = await getUserbyDiscordId(discordId);
    const card = await getCard(cardId);
    if (!user && !card) {
        await sql.run(`INSERT INTO user(discord_id, notifications_enabled) VALUES (?, ?)`, [discordId, true]);
        const newUser = await getUserbyDiscordId(discordId);
        await sql.run(`INSERT INTO card (user_id, card_id) VALUES (?, ?)`, [newUser.id, cardId]);
    }
}

export const optOutUser = async (discordId) => {
    const user = await getUserbyDiscordId(discordId);
    if (user && user.notifications_enabled) {
        await sql.run(`UPDATE user SET notifications_enabled = false WHERE discord_id = ?`, [discordId]);
    }
}

export const optInUser = async (discordId) => {
    const user = await getUserbyDiscordId(discordId);
    if (user && !user.notifications_enabled) {
        await sql.run(`UPDATE user SET notifications_enabled = true WHERE discord_id = ?`, [discordId]);
    }
}

export default db;