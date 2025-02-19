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
`POST /webhook`

Sends a message to a list of users for a specific game. Messages will only be sent if they are opted into line alerts.
```json
{
    "game_name": "maimai DX", // Name of the game
    "user_ids": ["011X99X1X1XX110X"] // Array of Yume card numbers
}
```
## Commands
`/register <user_id>` - Registers the user for line alerts. Opts in users to line alerts by default.
`/update_id` - Allows the user to update their card ID, in the event of them losing it or typing it incorrectly
`/opt-out` - Opts the user out of line alerts. This will set `notifications_enabled` to `false`.
`/opt-in` - Opts the user back into line alerts. This will set `notifications_enabled` to `true`.

## FAQ
### How to retrieve card ID?
- Users can retrieve their card ID by using NFC Tools. The card ID will be the serial number displayed in the app after reading their card.
- Download: [iOS](https://apps.apple.com/us/app/nfc-tools/id1252962749) | [Android](https://play.google.com/store/apps/details?id=com.wakdev.wdnfc)