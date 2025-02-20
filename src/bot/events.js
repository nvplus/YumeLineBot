import { Events } from 'discord.js';
import { log } from '../util.js';

const events = {
    [Events.InteractionCreate]: async interaction => {
        if (!interaction.isChatInputCommand()) {
            return;
        }
        const command = interaction.client.commands.get(interaction.commandName);
        try {
            await command.execute(interaction);
        }
        catch (err) {
            log.error(err);
        }
        
    }
}

export default events;