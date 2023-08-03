"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const path_1 = require("path");
const discord_js_1 = require("discord.js");
module.exports = async (client) => {
    const slashCommandsDir = (0, path_1.join)(__dirname, "../slashCommands");
    const body = [];
    (0, fs_1.readdirSync)(slashCommandsDir).forEach(file => {
        if (!file.endsWith(".js"))
            return;
        const command = require(`${slashCommandsDir}/${file}`).command;
        client.slashCommands.set(command.name, command);
        body.push(command.data.toJSON());
    });
    const rest = new discord_js_1.REST({ version: '10' }).setToken(process.env.DISCORD_BOT_TOKEN);
    try {
        await rest.put(discord_js_1.Routes.applicationCommands(process.env.DISCORD_APPLICATION_ID), { body: body });
        console.log('Successfully reloaded application (/) commands.');
    }
    catch (error) {
        console.error(error);
    }
};
