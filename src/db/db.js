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


export const registerUser = async (userId, discordId) => {
    return db.run(`INSERT INTO user(user_id, discord_id, notifications_enabled) VALUES ("${userId}", "${discordId}", true);`);
}

export const getUserById = async (userId) => { 
    const rows = await sql.all(`SELECT user_id, discord_id, notifications_enabled FROM user WHERE user_id = "${userId}"`);
    if (rows.length > 0) {
        return rows[0];
    }
}

export default db;