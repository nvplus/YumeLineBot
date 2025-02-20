import { SlashCommandBuilder, MessageFlags } from 'discord.js';
import { getCardsByDiscordId } from '../../../db/db.js';
import { log } from '../../../util.js';

export const data = new SlashCommandBuilder()
.setName('list-cards')
.setDescription(`List all cards connected to your account`)

export const execute = async (interaction) => {
    const discordId = interaction.user.id;

    try {
        const cards = await getCardsByDiscordId(discordId)
        if (cards.length > 0) {
            let cardsString = '```';
            cards.forEach((card, index) => {
                cardsString = cardsString.concat(`\n- ${index+1}${card.card_id} (Added ${new Date(card.created).toDateString()})`);
            })
            const replyString = `The following cards are currently connected to your Discord account:\n`.concat(cardsString).concat('```')
            interaction.reply({ content: replyString,  flags: MessageFlags.Ephemeral });
        }

    } catch (err) {
        log.error(err);
        await interaction.reply({ content: 'There was a problem retrieving your cards. Please try again.',  flags: MessageFlags.Ephemeral });
    }
};