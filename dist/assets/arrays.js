"use strict";
// ! Arrays
Object.defineProperty(exports, "__esModule", { value: true });
exports.TextChannelTypes = exports.rainbowColourArray = exports.emojiArray = void 0;
const discord_js_1 = require("discord.js");
/**
 * An array of number emoji characters in ascending order (`1️⃣`, `2️⃣`, `3️⃣` ...) `10` elements long. Used in {@link PollMessage.create}.
 * @see {@link rainbowColourArray} for a related array of rainbow colours in order. This is another array used in the {@link PollMessage.create} class method.
 * @see {@link PollMessage.create} for an example use case of this array.
 * @see `⬇` below for a snippet of the use case.
 * // Using the array to push emojis.
 * // PollMessage.create in ./src/utility.ts.
 * this.emojis.push(
 *				option
 *					? optionEmojisOption && !this.emojis.includes(optionEmojisOption)
 *						? optionEmojisOption
 *						: emojiArray[i - 1]
 *					: null,
 *			);
 */
exports.emojiArray = [
    "1️⃣",
    "2️⃣",
    "3️⃣",
    "4️⃣",
    "5️⃣",
    "6️⃣",
    "7️⃣",
    "8️⃣",
    "9️⃣",
    "🔟",
];
/**
 * Array of rainbow colours, 10 elements in size. Used in {@link PollMessage.create}.
 * @see {@link emojiArray} for a related array of number emoji characters in ascending order (`1️⃣`, `2️⃣`, `3️⃣`...), this is another array used in the {@link PollMessage.create} class method.
 * @see {@link PollMessage.create} for an example use case of this array.
 * @see below `⬇` for a snippet of this use case.
 * @example
 * // Using the array to generate a colourful pie chart for the poll message using the canvas module.
 * // PollMessage.create in ./src/utility.ts.
 * // ...
 *
 * for (let i = 0; i < 10; i++) {
 *
 * // ...
 *
 * 	context.fillStyle = rainbowColourArray[i];
 *
 * // Fills the circle with a rainbow colour from the rainbowColourArray.
 * // This creates the current sector of the pie chart with the correct colour of the rainbow.
 * context.fill();
 *
 * // ...
 *
 * };
 *
 * // ...
 */
exports.rainbowColourArray = [
    "#ff0033",
    "#ff6633",
    "#ffcc33",
    "#ffff66",
    "#ccff00",
    "#66ff66",
    "#aaf0d1",
    "#33ccff",
    "#0066ff",
    "#a950b0",
];
exports.TextChannelTypes = [
    discord_js_1.ChannelType.GuildText,
    discord_js_1.ChannelType.GuildAnnouncement,
    discord_js_1.ChannelType.AnnouncementThread,
    discord_js_1.ChannelType.PublicThread,
    discord_js_1.ChannelType.PrivateThread,
];
