import { Events } from 'discord.js';

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
            console.log(err);
        }
        
    }
}

export default events;