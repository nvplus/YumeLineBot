import config from './config.json' assert { type: 'json' };
import { REST, Routes } from 'discord.js';
import fs, { readdirSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { toFileURL } from './src/util.js';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const { token, clientId, guildId } = config;
const rest = new REST().setToken(token);
const commands = [];

const foldersPath = path.join(__dirname, 'src/commands');
const commandFolders = fs.readdirSync(foldersPath);

(async () => {
    for (const folder of commandFolders) {
        const commandsPath = path.join(foldersPath, folder);
        const commandFiles = readdirSync(commandsPath).filter(file => file.endsWith('.js'));
      
        for (const file of commandFiles) {
          const filePath = path.join(commandsPath, file);
          const fileURL = toFileURL(filePath);
          const command = await import(fileURL)
          commands.push(command.data.toJSON());
        }
      }
      
	try {
		console.log(`Started refreshing ${commands.length} application (/) commands.`);

		// The put method is used to fully refresh all commands in the guild with the current set
		const data = await rest.put(
			Routes.applicationGuildCommands(clientId, guildId),
			{ body: commands },
		);

		console.log(`Successfully reloaded ${data.length} application (/) commands.`);
	} catch (error) {
		// And of course, make sure you catch and log any errors!
		console.error(error);
	}
})();
