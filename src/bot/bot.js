import { Client, Collection, Events, GatewayIntentBits } from 'discord.js';
import { fileURLToPath } from 'url';
import fs, { readdirSync } from 'node:fs';
import path from 'node:path';
import { dirname } from 'path';
import { toFileURL} from './util.js';
import events from './events.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * A bot that notifies customers of their position in line via Discord.
 * @returns An instance of YumeLineBot
 */
const YumeLineBot = () => {
    const client = new Client({ intents: [GatewayIntentBits.Guilds] });
    const foldersPath = path.join(__dirname, 'commands');
    const commandFolders = fs.readdirSync(foldersPath);

    client.commands = new Collection();

    // Register commands
    for (const folder of commandFolders) {
        const commandsPath = path.join(foldersPath, folder);
        const commandFiles = readdirSync(commandsPath).filter(file => file.endsWith('.js'));
        
        for (const file of commandFiles) {
            const filePath = path.join(commandsPath, file);
            const fileURL = toFileURL(filePath);
        
            import(fileURL).then(command => {
            client.commands.set(command.data.name, command);;
            });
        }
    }

    for (const [event, callback] of Object.entries(events)) {
        client.on(event, callback);
    }

    client.once(Events.ClientReady, readyClient => {
        console.log(`Ready! Logged in as ${readyClient.user.tag}`);
    });
    
    return client;
}

export default YumeLineBot;