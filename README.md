# Yume Line Bot

## Setup
1. Copy `config-sample.json` and rename it to `config.json`
2. Populate configuration values
3. `npm run deploy-commands` To deploy the slash commands
4. `npm run build-db` To build the database schema
5. `npm start` To start the webhook server and Discord bot instance

## User flow
1. User registers their Yume card ID using `/register <user_id>` command
2. Bot sends them a message confirming they are registered
3. When they're up next on a game, they receive a DM from the bot notifying them that they're up
4. Users can opt-out of the feature using `/opt-out` in the DM channel with the bot

## API Documentation
### Example
`POST http://xxx.xxx.xx.xxx:3000/webhook`
Payload:
```json
{
    "game_name": "maimai DX", // Name of the game
    "user_ids": ["011X99X1X1XX110X"] // Array of Yume card numbers
}
```