"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const chalk_1 = __importDefault(require("chalk"));
const enums_1 = require("../assets/enums");
const genericTools_1 = require("../utilities/genericTools");
const errorHandler_1 = require("../handlers/errorHandler");
const { yellow, bold } = chalk_1.default;
const event = {
    name: discord_js_1.Events.InteractionCreate,
    once: false,
    async execute(client, interaction) {
        if (process.env.debug) {
            console.log(yellow(`${bold("[Debug]")} Received interaction type ${bold(discord_js_1.InteractionType[interaction.type])} ${bold(`(${
            // This is needed or else TypeScript will complain.
            interaction.type === 2 || interaction.isAutocomplete()
                ? interaction.commandName
                : interaction.customId})`)} in guild ${bold(interaction.guild?.name)} from user ${bold(interaction.user.username)} (ID: ${interaction.user.id}) ()`));
        }
        if (!process.env.maintenance ||
            // interaction.user.id === process.env.discordBotOwnerID ||
            (0, genericTools_1.isBotTester)(interaction.user.id)) {
            if (interaction.isChatInputCommand()) {
                const { commands } = client;
                const command = commands.get(interaction.commandName);
                if (!command) {
                    return interaction.reply("❌ Command not found.");
                }
                try {
                    await command.execute(interaction, client);
                }
                catch (error) {
                    return (0, errorHandler_1.handleError)(interaction, client, error);
                }
            }
            else if (interaction.isButton()) {
                const { buttons } = client;
                const button = buttons.get(interaction.customId);
                if (!button) {
                    return interaction.reply("❌ Button not found.");
                }
                try {
                    await button.execute(interaction, client);
                }
                catch (error) {
                    return (0, errorHandler_1.handleError)(interaction, client, error);
                }
            }
            else if (interaction.isStringSelectMenu()) {
                const { selectMenus } = client;
                const selectMenu = selectMenus.get(interaction.customId);
                if (!selectMenu) {
                    return interaction.reply("❌ Select menu not found.");
                }
                try {
                    await selectMenu.execute(interaction, client);
                }
                catch (error) {
                    return (0, errorHandler_1.handleError)(interaction, client, error);
                }
            }
            else if (interaction.type === discord_js_1.InteractionType.ModalSubmit) {
                const { modals } = client;
                const modal = modals.get(interaction.customId);
                if (!modal) {
                    return interaction.reply("❌ Modal not found.");
                }
                try {
                    await modal.execute(interaction, client);
                }
                catch (error) {
                    return (0, errorHandler_1.handleError)(interaction, client, error);
                }
            }
            else if (interaction.isContextMenuCommand()) {
                const { commands } = client;
                const command = commands.get(interaction.commandName);
                if (!command) {
                    return console.error(`❌ Command not found: ${interaction.commandName}`);
                }
                try {
                    await command.execute(interaction, client);
                }
                catch (error) {
                    return (0, errorHandler_1.handleError)(interaction, client, error);
                }
            }
            else if (interaction.type === discord_js_1.InteractionType.ApplicationCommandAutocomplete) {
                const { commands } = client;
                const command = commands.get(interaction.commandName);
                if (!command) {
                    return console.error(`❌ Command not found: ${interaction.commandName}`);
                }
                try {
                    await command.autocomplete(interaction, client);
                }
                catch (error) {
                    return (0, errorHandler_1.handleError)(interaction, client, error);
                }
            }
        }
        else {
            const maintenanceReply = {
                embeds: [
                    {
                        title: `${enums_1.Emojis.Error} Maintenance Mode!`,
                        description: `Sorry, <@${client.user.id}> is currently in maintenance mode!\n\n<@${client.user.id}> has been in maintenance since <t:${Math.round(client.onlineTimestamp / 1000)}:R>.`,
                        color: 0xff0000,
                    },
                ],
            };
            if (!(interaction instanceof discord_js_1.AutocompleteInteraction)) {
                try {
                    await interaction.reply(maintenanceReply);
                }
                catch (_error) {
                    await interaction.editReply(maintenanceReply).catch(console.error);
                }
            }
        }
        const timeTaken = (Date.now() - interaction.createdTimestamp) / 10;
        if (process.env.debug) {
            console.log(yellow(`${bold("[Debug]")} Took ${bold(`${timeTaken} milliseconds (${new Intl.NumberFormat().format(timeTaken / 1000)} seconds)`)} to execute interaction ${bold(
            // This is needed or else TypeScript will complain.
            interaction.type === 2 || interaction.isAutocomplete()
                ? interaction.commandName
                : interaction.customId)}.\n`));
        }
    }
};
exports.default = event;
