import { SlashCommandBuilder, MessageFlags } from 'discord.js';
import { registerUser, getUserById, getUserbyDiscordId } from '../../../db/db.js';

export const data = new SlashCommandBuilder()
.setName('register')
.setDescription(`Register to receive a message whenever you're up next on a game!`)
.addStringOption(option =>
    option.setName('user_id')
    .setDescription('Your Yume card ID')
    .setRequired(true)
);

export const execute = async (interaction) => {
    try {
        let existingUser = await getUserbyDiscordId(interaction.user.id);
        if (existingUser) {
            await interaction.reply({
                content: `You're already registered for line alerts. If you've opted out and are trying to opt back in, type \`/opt-in\`.`,
                flags: MessageFlags.Ephemeral
            });
            return;
        }

        let user_id = await interaction.options.getString('user_id');
        user_id = user_id.replaceAll(':', '');
    
        if (user_id.length > 0) {
            existingUser = await getUserById(user_id);

            if (existingUser) {
                await interaction.reply({
                    content: `User already exists with card ID \`${user_id}\`. Please try a different card.`,
                    flags: MessageFlags.Ephemeral
                });
                return;
            }
            
            await registerUser(user_id, interaction.user.id); 
            await interaction.reply({ content: 'Successfully registered for line alerts!',  flags: MessageFlags.Ephemeral });
            const user = await interaction.user.createDM();
            await user.send(`You will now receive a message when you are up next on a game at Yume.\n\nIf you'd like to opt-out, type \`/opt-out\`.`)
            console.log(`Registered new user ${interaction.user.displayName} (${interaction.user.id}) with card ID ${user_id}`);
        } else {
            await interaction.reply({ content: 'Please enter your card ID.',  flags: MessageFlags.Ephemeral });
        }

    } catch (err) {
        console.error(err);
        await interaction.reply({ content: 'Error registering. Please try again.',  flags: MessageFlags.Ephemeral });
    }
};