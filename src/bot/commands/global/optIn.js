import { SlashCommandBuilder, MessageFlags } from 'discord.js';
import { optInUser } from '../../../db/db.js';

export const data = new SlashCommandBuilder()
.setName('opt-in')
.setDescription(`Opt into line alerts.`);

export const execute = async (interaction) => {
    try {
        await optInUser (interaction.user.id); 
        await interaction.reply({ content: 'You have opted in to line alerts. To opt out, type `/opt-out`',  flags: MessageFlags.Ephemeral });
    } catch (err) {
        console.log(`Error opting in user with Discord ID ${interaction.user.id}`, err);
        await interaction.reply({ content: 'Error opting in. Please try again.',  flags: MessageFlags.Ephemeral });
    }
};