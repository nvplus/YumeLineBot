import { SlashCommandBuilder, MessageFlags } from 'discord.js';
import { registerUser, getUserbyDiscordId } from '../../../db/db.js';

export const data = new SlashCommandBuilder()
.setName('register')
.setDescription(`Register to receive a message whenever you're up next on a game!`)
.addStringOption(option =>
    option.setName('user_id')
    .setDescription('Your Yume card ID')
    .setRequired(true)
);

export const execute = async (interaction) => {
    const existing_user = await getUserbyDiscordId(interaction.user.id);
    if (existing_user) {
        await interaction.reply({ content: `You're already registered for line alerts.`,  flags: MessageFlags.Ephemeral });
        return;
    }
    try {
        const user_id = await interaction.options.getString('user_id');
        await registerUser(user_id, interaction.user.id); 
        const user = await interaction.user.createDM();
        await user.send(`You will now receive a message when you are up next on a game at Yume.\n\nIf you'd like to opt-out, type \`/opt-out\`.`)
        await interaction.reply({ content: 'Successfully registered for line alerts!',  flags: MessageFlags.Ephemeral });
    } catch (err) {
        console.log(err);
        await interaction.reply({ content: 'Error registering. Please try again.',  flags: MessageFlags.Ephemeral });
    }
};