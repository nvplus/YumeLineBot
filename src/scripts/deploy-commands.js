import config from '../../config.json' assert { type: 'json' };
import { REST, Routes } from 'discord.js';
import fs, { readdirSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { toFileURL, log } from '../util.js';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const { token, clientId, guildId } = config;
const rest = new REST().setToken(token);
const commands = [];

let count = 0;
const commandsFolder = path.join(__dirname, '../bot/commands');
const commandFolders = readdirSync(commandsFolder);

(async () => {
	for (const folderName of commandFolders) {
		const currFolderPath = path.join(commandsFolder, folderName);
		const commandFiles = readdirSync(currFolderPath).filter(file => file.endsWith('.js'));
		commands[folderName] = [];
		for (const file of commandFiles) {
			const filePath = path.join(currFolderPath, file);
			const fileURL = toFileURL(filePath);
			const command = await import(fileURL)
			commands[folderName].push(command.data.toJSON());
			count += 1;
		}
	}      
	try {
		log.debug(`Started refreshing ${count} application commands.`);
		let data_guild = [];
		if (guildId !== undefined) {
			data_guild = await rest.put(
				Routes.applicationGuildCommands(clientId, guildId),
				{ body: commands['guild'] },
			);
		}
		const data_global = await rest.put(
			Routes.applicationCommands(clientId),
			{ body: commands['global'] },
		);
		log.debug(`Successfully reloaded ${count} application commands. (Global: ${data_global.length} guild: ${data_guild.length})`);

	} catch (error) {
		// And of course, make sure you catch and log any errors!
		log.error(error);
	}
})();
