import { SlashCommandBuilder } from '@discordjs/builders';
import { SlashCommand } from "../../types";

export const command: SlashCommand = {
    name: 'purge',
    data: new SlashCommandBuilder()
        .setName('purge')
        .setDescription('Purge a specified number of messages from a channel.')
        .addIntegerOption(option =>
            option.setName('amount')
                .setDescription('The number of messages to delete')
                .setRequired(true)
        )
        .addChannelOption(option =>
            option.setName('channel')
                .setDescription('The channel to purge messages from')
                .setRequired(true)
        ),
    async execute(interaction) {
        const amount = interaction.options.getInteger('amount');
        const channel = interaction.options.getChannel('channel');

        if (channel.isText()) {
            const messages = await channel.messages.fetch({ limit: amount });
            await channel.bulkDelete(messages);
            await interaction.reply(`Deleted ${amount} messages.`);
        } else {
            await interaction.reply('I cannot delete messages from this channel.');
        }
    },
};
