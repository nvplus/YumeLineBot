CREATE TABLE IF NOT EXISTS user (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id TEXT NOT NULL,
    discord_id TEXT NOT NULL,
    notifications_enabled BOOLEAN DEFAULT false,
    created DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated DATETIME DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, discord_id)
);

CREATE TRIGGER IF NOT EXISTS update_user_timestamp
AFTER UPDATE ON user
FOR EACH ROW
WHEN OLD.updated != NEW.updated
BEGIN
    UPDATE user
    SET updated = CURRENT_TIMESTAMP
    WHERE id = OLD.id;
END;
