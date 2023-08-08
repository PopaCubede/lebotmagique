"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isBotTester = exports.addSuffix = void 0;
/**
 * Returns the appropriate suffix to a word that is either plural or singular. Only supports words which the plural ending is "s".
 * @param {number} number The string to convert.
 * @returns {"s"|""} The appropriate ending to the provided string.
 * @see {@link ./commands/admin/purge.ts purge.ts} for an example use case of this function. (See below `⬇` for a summary of the use case)
 * @example
 * // Displaying the correct suffix for the number of messages deleted.
 * // Used in the /purge command.
 * // ./src/commands/admin/purge.ts
 * import {addSuffix} from "../../utility.js";
 *
 * // ...
 *
 * return interaction.editReply(
 *  new SuccessMessage(
 *	  `Successfully deleted \`${messages.length}\` message${addSuffix(
 *	   messages.length,
 *	  )}!`,
 *	 ),
 * );
 *
 * //...
 */
const addSuffix = (number) => Math.abs(number) === 1 ? "" : "s";
exports.addSuffix = addSuffix;
const isBotTester = (userID) => (process.env.discordBotTesters ?? "")
    .replace(/\s+/g, "")
    .split(",")
    .includes(userID) || userID === process.env.discordBotOwnerID;
exports.isBotTester = isBotTester;
