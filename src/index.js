import config from '../config.json' assert { type: 'json' };
import { Client, Collection, Events, GatewayIntentBits } from 'discord.js';
import fs, { readdirSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { toFileURL } from './util.js';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const { token } = config;

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.commands = new Collection();

const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);

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

client.on(Events.InteractionCreate, async interaction => {
  if (!interaction.isChatInputCommand()) return;
	const command = interaction.client.commands.get(interaction.commandName);
  await command.execute(interaction);
});

client.once(Events.ClientReady, readyClient => {
	console.log(`Ready! Logged in as ${readyClient.user.tag}`);
});

client.login(token);