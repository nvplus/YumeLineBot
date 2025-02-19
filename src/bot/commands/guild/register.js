import { SlashCommandBuilder, MessageFlags } from 'discord.js';

export const data = new SlashCommandBuilder()
.setName('register')
.setDescription(`Register to receive a message whenever you're up next on a game!`)
.addStringOption(option =>
    option.setName('username')
    .setDescription('Your Yume username')
    .setRequired(true)
);

export const execute = async (interaction) => {
    const user = await interaction.user.createDM();
    await user.send(`You will now receive a message when you are up next on a game at Yume.\n\nIf you'd like to opt-out, type \`/unregister\`.`)
    await interaction.reply({ content: 'Registered',  flags: MessageFlags.Ephemeral });
};