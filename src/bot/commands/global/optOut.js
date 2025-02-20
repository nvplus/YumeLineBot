import { SlashCommandBuilder, MessageFlags } from 'discord.js';
import { optOutUser } from '../../../db/db.js';
import { log } from '../../../util.js';

export const data = new SlashCommandBuilder()
.setName('opt-out')
.setDescription(`Opt-out of line alerts.`);

export const execute = async (interaction) => {
    try {
        await optOutUser(interaction.user.id); 
        await interaction.reply({ content: 'You have opted out of line alerts. To opt back in, type `\/opt-in`',  flags: MessageFlags.Ephemeral });
    } catch (err) {
        log.error(`Error opting out user with Discord ID ${interaction.user.id}`, err);
        await interaction.reply({ content: 'Error opting out. Please try again.',  flags: MessageFlags.Ephemeral });
    }
};