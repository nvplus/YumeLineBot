import { SlashCommandBuilder, MessageFlags } from 'discord.js';
import { optOutUser } from '../../../db/db.js';

export const data = new SlashCommandBuilder()
.setName('opt-out')
.setDescription(`Opt-out of line alerts.`);

export const execute = async (interaction) => {
    try {
        await optOutUser(interaction.user.id); 
        await interaction.reply({ content: 'You have opted out of line alerts. To opt back in, type `\/opt-in`',  flags: MessageFlags.Ephemeral });
    } catch (err) {
        console.log(`Error opting out user with Discord ID ${interaction.user.id}`, err);
        await interaction.reply({ content: 'Error opting out. Please try again.',  flags: MessageFlags.Ephemeral });
    }
};