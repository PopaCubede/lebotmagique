"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleError = exports.logObject = void 0;
const discord_js_1 = require("discord.js");
const Messages_1 = require("../classes/Messages");
const genericTools_1 = require("../utilities/genericTools");
const regexHell_1 = require("../utilities/regexHell");
const chalk_1 = __importDefault(require("chalk"));
const { whiteBright, bold } = chalk_1.default;
/**
 * A function to log objects nicely to the console. Supports nested objects & indents accordingly.
 *
 * Logs the object keys as bold and white, and the object properties as white.
 * @see {@link invertObject} for a utility function that inverts object properties and values.
 * @param {{[key: string]: string}} object The object to log to the console.
 * @param {number} indent The level of indentation to start with. (Used for recursion)
 * @returns {void}
 * @example
 * // Logging a user object to the console.
 * import {logObject} from "../../../utility.js";
 *
 * const userData = {
 *		name: "rolyPolyVole",
 *		firstName: "roly",
 *		secondName: "Poly",
 *		thirdName: "Vole",
 *		stats: {
 *			coding: 10,
 *			troll: 42,
 *			intelligence: "99.999...",
 *			school: 10,
 *			discord: -50,
 *			opinion: -1000,
 *		}
 * };
 *
 * logObject(userData);
 *
 * // Object logged nicely using chalk.
 * // Object keys are bold and white.
 * // Object values are white.
 * // =>
 * // name: rolyPolyVole
 * // firstName: roly
 * // secondName: Poly
 * // thirdName: Vole
 * // stats
 * //  coding: 10
 * //  troll: 42
 * //  intelligence: 99.999...
 * //  school: 10
 * //  discord: -50
 * //  opinion: -1000
 * @see {@link handleError} for an example use case of this function. (See below `⬇` for a summary of the use case)
 * @example
 * // Used in handleError.
 * // ./src/utility.ts.
 *
 * // ...
 *
 * // Logs interaction details object to the console.
 * logObject({
 * 	// Interaction details object to log.
 * })
 *
 * // ...
 */
const logObject = (object, indent = 0) => {
    for (const key in object) {
        if (typeof object[key] === "object") {
            // Log the key with a space times the current indent.
            console.log(`${" ".repeat(indent)}${bold(key)}`);
            // Use recursion with an increased indent level to log the object that the key is associated with.
            (0, exports.logObject)(object[key], indent + 1);
        }
        else if (object[key]) {
            // Log the key: value pair normally.
            console.log(`${" ".repeat(indent)}${bold(key)}:`, whiteBright(`${object[key]}`));
        }
    }
    // When the function has finished logging everything, a gap is created between the interaction information message and the next message.
    if (!indent)
        console.log();
};
exports.logObject = logObject;
/**
 * A function to attempt to handle errors as best as possible.
 *
 * *If the user is just a normal user, the function will reply with a simple error prompting the user to report the error.*
 *
 * *If the user ID is one of the IDs included in* `process.env.discordBotTesters` *or if the user ID is the same as the one specified in* `process.env.discordBotOwnerID`*,* *then a more detailed error message is sent with interaction details to try and help with debugging the error.*
 *
 * Sends an embed with some of the error details and a prompt for the user to report the error. Used in `interactionCreate.ts`.
 * @param {Interaction} interaction The interaction that caused the error.
 * @param {BotClient} client The bot client.
 * @param {unknown} error The error that occurred.
 * @returns {Promise<void>} Replies to the interaction with an error message. (A simple message, if the user is an average user, a more detailed one if the user is included in `process.env.discordBotTesters` or if the user ID is the same as the one specified in `process.env.discordBotOwnerID`).
 * @see {@link ./events/client/bot/interactionCreate.ts interactionCreate.ts} for an example use case of this function. (See below `⬇` for a summary of the use case)
 * @example
 * // Handing errors in interactionCreate.
 * import {Command} from "types";
 * import {handleError} from "../../../utility.js";
 *
 * // ...
 *
 * try {
 *	 await (command as Command).execute(interaction, client);
 * } catch (error) {
 *	 handleError(interaction, client, error);
 * }
 *
 * // ...
 */
const handleError = async (interaction, client, error) => {
    // Create a gap between the last message and the error message.
    console.log();
    console.error(error);
    const { discordBotOwnerID, discordGuildID, discordSupportChannelID } = process.env;
    const discordBotOwner = discordBotOwnerID
        ? await client.users.fetch(discordBotOwnerID)
        : null;
    const discordGuild = discordGuildID
        ? await client.guilds.fetch(discordGuildID)
        : null;
    // Get the optimal guild invite.
    const discordGuildInvite = discordGuildID
        ? [...((await discordGuild?.invites?.fetch())?.values() ?? [])].sort((a, b) => !a.temporary
            ? 1
            : a.maxAge > b.maxAge
                ? 1
                : a.maxAge === b.maxAge
                    ? (a.maxUses ?? Infinity) - (b.maxUses ?? Infinity)
                    : 0)[0].code
        : null;
    const { user, channel, guild, channelId, guildId } = interaction;
    // Sends a message depending on whether the user is a bot tester and whether they are in the support server.
    const errorReply = new Messages_1.ErrorMessage(`\`${client.user.username}\` has encountered an error while executing the interaction${(0, genericTools_1.isBotTester)(user.id)
        ? `:\n\n\`\`\`css\n${error}\`\`\`\n> Interaction Custom ID / Name: \`${
        // This is needed or else TypeScript will complain.
        interaction.type === 2 || interaction.isAutocomplete()
            ? interaction.commandName
            : interaction.customId}\``
        : "."}\n\n${discordGuildID && discordBotOwnerID && user.id !== discordBotOwnerID
        ? `Please report this error to ${guildId === discordGuildID
            ? `<@${discordBotOwnerID}>`
            : `\`@${discordBotOwner.tag}\``}${guildId === discordGuildID
            ? `${discordSupportChannelID
                ? ` in <#${discordSupportChannelID}>`
                : ""}`
            : ` on [the support server](https://www.discord.gg/${discordGuildInvite})`}!`
        : ""}`, false, false);
    if (process.env.debug) {
        // Create a gap between the error message and the interaction information message.
        console.log();
        (0, exports.logObject)({
            "📜 Interaction Information": {
                "⏰ Time": {
                    Date: new Date(interaction.createdTimestamp).toISOString(),
                    TimeStamp: interaction.createdTimestamp,
                },
                "🏠 Guild": { Name: guild?.name, ID: guildId },
                "📄 Channel": {
                    Name: channel instanceof discord_js_1.TextChannel ? channel.name : null,
                    ID: channelId,
                },
                "👤 User": { Tag: user.tag, ID: user.id },
                "💬 Message": interaction.type === discord_js_1.InteractionType.ApplicationCommand ||
                    interaction.type === discord_js_1.InteractionType.ApplicationCommandAutocomplete
                    ? null
                    : {
                        "ID": interaction.message?.id,
                        "Content": interaction.message?.content,
                        "Embed Title": interaction.message?.embeds?.[0]?.data?.title,
                        "Date": new Date(interaction?.message?.createdTimestamp ?? 0).toISOString(),
                        "Timestamp": interaction?.message?.createdTimestamp,
                    },
            },
        });
    }
    if (!(interaction instanceof discord_js_1.AutocompleteInteraction)) {
        try {
            await interaction.reply(errorReply).catch(console.error);
        }
        catch (_error) {
            try {
                await interaction.followUp(errorReply).catch(console.error);
            }
            catch (_error) {
                try {
                    await interaction.editReply(errorReply).catch(console.error);
                }
                catch (_error) {
                    await interaction.user.send(errorReply).catch(console.error);
                }
            }
        }
    }
    else if (channel) {
        await channel.send(errorReply);
    }
    else {
        await interaction.user.send(errorReply).catch(console.error);
    }
};
exports.handleError = handleError;
/**
 * The standard, untouched console log function. Used in the refactored {@link console.log} function.
 * @see {@link console.log the refactored console.log function} for an example use case of this function. (See below `⬇` for a summary of the use case)
 *
 * Prints to `stdout` with newline. Multiple arguments can be passed, with the
 * first used as the primary message and all additional used as substitution
 * values similar to [`printf(3)`](http://man7.org/linux/man-pages/man3/printf.3.html) (the arguments are all passed to `util.format()`).
 *
 * ```js
 * const count = 5;
 * console.log('count: %d', count);
 * // Prints: count: 5, to stdout
 * console.log('count:', count);
 * // Prints: count: 5, to stdout
 * ```
 *
 * See `util.format()` for more information.
 * @since v0.1.100
 * @example
 * // Used in the refactored console.log function.
 * // ./src/utility.ts.
 *
 * // ...
 *
 * standardLog(...data);
 *
 * // ...
 */
const standardLog = console.log.bind(console);
/**
 * List of all logged messages on the console. Used in {@link console.log the refactored console.log function} function.
 * @see {@link console.log the refactored console.log function} for an example use case of this array. (See below `⬇` for a summary of the use case)
 * @example
 * // Used in the refactored console.log function.
 * // ./src/utility.ts.
 *
 * // ...
 *
 * const previousLogs = consoleLogs[consoleLogs.length - 1];
 * const previousLog = previousLogs?.[previousLogs.length - 1];
 *
 * // ...
 */
const consoleLogs = [];
/**
 * Refactored version of {@link console.log} that ensures that there are never more than two new lines between logged strings.
 * *(in reality, the function reduces the number of new lines between two logged strings by 1 (if needed), which, in most cases, results in two new lines remaining, which is the intended behavior)*
 * This creates a *very clean* and *professional* looking console with *consistent newlines*.
 * *Otherwise, there would be inconsistent new lines.*
 * E.g.,
 *
 * [Database Status] Connecting...
 *
 * [Debug] [WS => Shard 0] Shard received all its guilds. Marking as fully ready.
 *
 * [Client] Ready! Online and logged in as 🌳 Slime Bot [/].
 *
 *
 * [Database Status] Connected.
 *
 * Between the client and database status messages, there are **3** new lines, which is *inconsistent* with the overall console style.
 * This refactoring of the function fixes that issue:
 *
 * [Database Status] Connecting...
 *
 * [Debug] [WS => Shard 0] Shard received all its guilds. Marking as fully ready.
 *
 * [Client] Ready! Online and logged in as 🌳 Slime Bot [/].
 *
 * [Database Status] Connected.
 *
 * @see {@link standardLog} for the standard {@link console.log} function.
 * @see {@link consoleLogs} for an array of all logged messages.
 */
console.log = (...data) => {
    const previousLogs = consoleLogs[consoleLogs.length - 1];
    const previousLog = previousLogs?.[previousLogs.length - 1];
    const latestLog = data[data.length - 1];
    if (typeof latestLog === "string" &&
        typeof previousLog === "string" &&
        // Remove possible control characters added by chalk.
        latestLog.replace(regexHell_1.ANSIControlCharactersRegExp, "").startsWith("\n") &&
        previousLog.replace(regexHell_1.ANSIControlCharactersRegExp, "").endsWith("\n")) {
        data[data.length - 1] = latestLog.replace(/\n/, "");
    }
    data = data.map((value) => {
        if (typeof value !== "string")
            return value;
        const ansiControlCharactersOrWhitespaceMatch = new RegExp(`^(${regexHell_1.ANSIControlCharactersRegExpString}|\\s|$1)+`).exec(value)?.[0];
        const date = new Date(Date.now());
        return `${value.slice(0, ansiControlCharactersOrWhitespaceMatch?.length ?? 0)}${`[${date.getHours().toString().padStart(2, "0")}:${date
            .getMinutes()
            .toString()
            .padStart(2, "0")}:${date
            .getSeconds()
            .toString()
            .padStart(2, "0")}]`} ${value.slice(ansiControlCharactersOrWhitespaceMatch?.length ?? 0)}`;
    });
    standardLog(...data);
    consoleLogs.push(data);
};
