"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.command = void 0;
const discord_js_1 = require("discord.js");
exports.command = {
    name: 'ping',
    data: new discord_js_1.SlashCommandBuilder()
        .setName("ping")
        .setDescription("Affiche le ping du bot"),
    execute: async (interaction) => {
        await interaction.reply({
            embeds: [
                new discord_js_1.EmbedBuilder()
                    .setAuthor({ name: "PopaCubede" })
                    .setDescription(`🏓 Pong! \n 📡 Ping: ${interaction.client.ws.ping}`)
                    .setColor('#ff8e4d')
            ]
        });
    }
};
