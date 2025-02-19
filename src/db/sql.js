import db from './db.js';

const sql = {
    all: (query) => {
        return new Promise((resolve, reject) => {
            db.all(query, (err, rows) => {
                if (err) {
                    reject(err);
                }
                resolve(rows);
            })
        });
    }
}

export default sql;