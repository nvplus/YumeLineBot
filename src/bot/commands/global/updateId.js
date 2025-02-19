import { SlashCommandBuilder, MessageFlags } from 'discord.js';
import { updateUserId, getUserById } from '../../../db/db.js';

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
    let user_id = await interaction.options.getString('user_id');
    user_id = user_id.replaceAll(':', '');
    try {
        if (user_id.length > 0) {
            const existing_user = await getUserById(user_id);

            if (existing_user) {
                await interaction.reply({
                    content: `User already exists with card ID \`${user_id}\`. Please try a different card.`, 
                    flags: MessageFlags.Ephemeral
                });
                return;
            }
            await updateUserId(user_id, interaction.user.id); 
            await user.send(`You have updated your card ID to \`${user_id}\``);
        }
    }
    catch (err) {
        console.error(`Error updating the ID of user with Discord ID ${interaction.user.id}`, err);
        await interaction.reply({ content: 'Error updating ID. Please try again.',  flags: MessageFlags.Ephemeral });
    }
};