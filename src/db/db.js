import sqlite3 from 'sqlite3';
import path from 'path';
import sql from './sql.js';

const dbPath = path.resolve('./db/database.db');
const db = new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
    if (err) {
        console.error('Error opening database:', err);
        return;
    }
});

export const getUserbyDiscordId = async (discordId) => {
    const rows = await sql.all(`SELECT user_id, discord_id, notifications_enabled FROM user WHERE discord_id = "${discordId}"`);
    if (rows.length > 0) {
        return rows[0];
    }
}

export const getUserById = async (userId) => { 
    const rows = await sql.all(`SELECT user_id, discord_id, notifications_enabled FROM user WHERE user_id = "${userId}"`);
    if (rows.length > 0) {
        return rows[0];
    }
}

export const registerUser = async (userId, discordId) => {
    const user = await getUserById(userId);
    if (!user) {
        await sql.run(`INSERT INTO user(user_id, discord_id, notifications_enabled) VALUES ("${userId}", "${discordId}", true);`);
    }
}

export const optOutUser = async (discordId) => {
    const user = await getUserbyDiscordId(discordId);
    if (user && user.notifications_enabled) {
        await sql.run(`UPDATE user SET notifications_enabled = false WHERE discord_id = "${discordId}"`);
    }
}

export const optInUser = async (discordId) => {
    const user = await getUserbyDiscordId(discordId);
    if (user && !user.notifications_enabled) {
        await sql.run(`UPDATE user SET notifications_enabled = true WHERE discord_id = "${discordId}"`);
    }
}

export const updateUserId = async (newUserId, discordId) => {
    const user = await getUserbyDiscordId(discordId);
    if (user) {
        await sql.run(`UPDATE user SET user_id = "${newUserId}" WHERE discord_id = "${discordId}";`);
    }
}

export default db;