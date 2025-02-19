import { SlashCommandBuilder, MessageFlags } from 'discord.js';
import { updateUserId } from '../../../db/db.js';

export const data = new SlashCommandBuilder()
.setName('update_id')
.setDescription(`Change your card ID`)
.addStringOption(option =>
    option.setName('user_id')
    .setDescription('Your Yume card ID')
    .setRequired(true)
);

export const execute = async (interaction) => {
    const user = await interaction.user.createDM();
    const userId = await interaction.options.getString('user_id');
    
    try {
        await updateUserId(userId, interaction.user.id); 
        await user.send(`You have updated your card ID to \`${userId}\``);
    }
    catch (err) {
        console.log(`Error updating the ID of user with Discord ID ${interaction.user.id}`, err);
        await interaction.reply({ content: 'Error updating ID. Please try again.',  flags: MessageFlags.Ephemeral });
    }
};