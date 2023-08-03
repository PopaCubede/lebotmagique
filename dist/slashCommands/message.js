"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.command = void 0;
const discord_js_1 = require("discord.js");
exports.command = {
    name: 'message',
    data: new discord_js_1.SlashCommandBuilder()
        .setName("message")
        .setDescription("Affiche un message")
        .addStringOption((option) => {
        return option
            .setName('message')
            .setDescription('Message à afficher')
            .setRequired(true);
    }),
    async execute(interaction) {
        const message = interaction.options.get('message', true)?.value?.toString();
        await interaction.reply(`Valeur du message : ${message}`);
    }
};
