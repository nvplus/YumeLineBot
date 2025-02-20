import sqlite3 from 'sqlite3';
import fs from 'fs';

fs.unlink('./database.db', (err) => {
    if (err) {
        if (err.code !== 'ENOENT') {
            console.error(`Error removing file: ${err}`);
        }
        return;
    }
});

const db = new sqlite3.Database('./database.db', sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
    if (err) {
        console.error('Error opening database:', err);
        return;
    }
});

// Read and execute the schema.sql file
fs.readFile('schema.sql', 'utf8', (err, data) => {
    // Execute the schema SQL to create the tables and triggers
    db.exec(data, (err) => {
        if (err) {
            console.error('Error executing schema:', err);
        } else {
            console.log('Successfully initialized a new database instance.');
        }

        // Close the database connection after the schema is applied
        db.close((err) => {
            if (err) {
                console.error('Error closing database:', err);
            }
        });
    });
});
