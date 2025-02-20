import db from './db.js';
import config from '../../config.json' assert { type: 'json' };
const { enableDbLogging } = config;

const logQuery = (query, params = []) => {
    if (!enableDbLogging) {
        return;
    }
    const dt = new Date();
    console.log(`[${dt.toISOString()}] Executed query:`, query, params);
}

const sql = {
    get: (query, params = []) => {
        logQuery(query, params);
        return new Promise((resolve, reject) => {
            db.get(query, params, (err, row) => {
                if (err) {
                    reject(err);
                }
                resolve(row);
            });
        });
    },
    all: (query) => {
        logQuery(query);
        return new Promise((resolve, reject) => {
            db.all(query, (err, rows) => {
                if (err) {
                    reject(err);
                }
                resolve(rows);
            })
        });
    },
    run: (query, params = []) => {
        logQuery(query, params);
        return new Promise((resolve, reject) => {
            db.run(query, params, (err) => {
                if (err) {
                    reject(err);
                }
                resolve();
            })
        });
    },
}

export default sql;