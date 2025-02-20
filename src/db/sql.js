import db from './db.js';
import config from '../../config.json' assert { type: 'json' };
import { log } from '../util.js';
const { enableDbLogging } = config;

const logQuery = (query, params = []) => {
    if (!enableDbLogging) {
        return;
    }
    log.debug(`Executed query [ ${query} ] (${params.join(',')})`);
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
    all: (query, params) => {
        logQuery(query, params);
        return new Promise((resolve, reject) => {
            db.all(query, params, (err, rows) => {
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