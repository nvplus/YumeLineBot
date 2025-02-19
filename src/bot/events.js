import { Events } from 'discord.js';

const events = {
    [Events.InteractionCreate]: async interaction => {
        if (!interaction.isChatInputCommand()) {
            return;
        }
        const command = interaction.client.commands.get(interaction.commandName);
        await command.execute(interaction);
    }
}

export default events;