import { SlashCommandBuilder, MessageFlags } from 'discord.js';

export const data = new SlashCommandBuilder()
.setName('unregister')
.setDescription(`Stop receiving a ping for when you're up next for a game.`);

export const execute = async (interaction) => {
    const user = await interaction.user.createDM();
    await user.send('Unregistered from line alerts.')
    await interaction.reply({ content: 'Unregistered',  flags: MessageFlags.Ephemeral });
};