import sqlite3 from 'sqlite3';
import fs from 'fs';

const db = new sqlite3.Database('./database.db', sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
    if (err) {
        console.error('Error opening database:', err);
        return;
    }
    console.log('Database connected.');
});

// Read and execute the schema.sql file
fs.readFile('schema.sql', 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading schema file:', err);
        return;
    }

    // Execute the schema SQL to create the tables and triggers
    db.exec(data, (err) => {
        if (err) {
            console.error('Error executing schema:', err);
        } else {
            console.log('Schema initialized successfully');
        }

        // Close the database connection after the schema is applied
        db.close((err) => {
            if (err) {
                console.error('Error closing database:', err);
            } else {
                console.log('Database connection closed.');
            }
        });
    });
});
