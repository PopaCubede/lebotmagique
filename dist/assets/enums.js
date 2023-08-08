"use strict";
// ! Enums
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultStatisticsChannelNames = exports.ImageURLs = exports.EmojiIDs = exports.Emojis = exports.ColourHexStrings = exports.Colours = void 0;
/**
 * Some nice colours for embeds and what not.
 * @example
 * import {Colours} from "../../../utility.js";
 *
 * // Create an embed the colour (coloured side bar) of which exactly matches the colour of the embed itself, making it practically invisible.
 * // This results in a very clean and professional looking embed.
 * const embed = {
 * 	title: "Example Embed",
 * 	color: Colours.Transparent
 * };
 * @example
 * // Replying with a transparent coloured embed.
 * // ./src/commands/utility/ping.ts.
 * import {Colours} from "../../../utility.js";
 *
 * // ...
 *
 * await interaction.reply({
 * 	// ...
 * 	color: Colours.Transparent,
 * 	// ...
 * })
 *
 * // ...
 */
var Colours;
(function (Colours) {
    Colours[Colours["Query"] = 2829617] = "Query";
    Colours[Colours["Loading"] = 2829617] = "Loading";
    Colours[Colours["Success"] = 2829617] = "Success";
    Colours[Colours["Warning"] = 2829617] = "Warning";
    Colours[Colours["Error"] = 2829617] = "Error";
    Colours[Colours["Default"] = 2829617] = "Default";
    /**
     * A colour that exactly matches the colour of *embed backgrounds* using **dark theme**.
     */
    Colours[Colours["Transparent"] = 2829617] = "Transparent";
    /**
     * A colour that matches the colour of *embed backgrounds* using **light theme**.
     *
     * Note: Not confirmed whether the colour actually matches the background of embeds in light mode, no way I'm going to enable Discord light theme to test.
     */
    Colours[Colours["TransparentBright"] = 15922165] = "TransparentBright";
    /**
     * The new `blurple` colour that Discord uses.
     *
     * Somewhere in between blue and purple.
     */
    Colours[Colours["Blurple"] = 5793266] = "Blurple";
    /**
     * A nice lime colour. Used for the levelling progress bar.
     *
     * @see {@link LevelLeaderboardMessage} for an example usage of this colour.
     * @see {@link ./src/commands/levelling/level.ts level.ts} for another example usage of this colour.
     */
    Colours[Colours["Lime"] = 1105744] = "Lime";
    /**
     * A deep ocean blue colour.
     */
    Colours[Colours["OceanBlue"] = 1070552] = "OceanBlue";
})(Colours || (exports.Colours = Colours = {}));
/**
 * An enum with hex strings representing colour values.
 *
 * The colours here are the same as in the {@link Colours the Colours enum}.
 * @see {@link Colours} for an enum with numbers representing colour values.
 */
var ColourHexStrings;
(function (ColourHexStrings) {
    ColourHexStrings["Query"] = "#2b2d31";
    ColourHexStrings["Loading"] = "#2b2d31";
    ColourHexStrings["Success"] = "#2b2d31";
    ColourHexStrings["Warning"] = "#2b2d31";
    ColourHexStrings["Error"] = "#2b2d31";
    ColourHexStrings["Default"] = "#2b2d31";
    ColourHexStrings["Transparent"] = "#2b2d31";
    ColourHexStrings["TransparentBright"] = "#f2f3f5";
    ColourHexStrings["Blurple"] = "#5865f2";
    ColourHexStrings["Lime"] = "#10df50";
    ColourHexStrings["OceanBlue"] = "#1050df";
})(ColourHexStrings || (exports.ColourHexStrings = ColourHexStrings = {}));
/**
 * An enum of emoji IDs of emojis from `🌌 The Slimy Swamp 🌳` guild that the bot can use.
 * @example
 * // Using the YouTube logo emoji to create a nice message for the YouTube upload tracker.
 * // ./src/functions/tools/checkUploads.ts.
 * import {Emojis} from "../../../utility.js";
 *
 * // ...
 *
 * await discordChannel.send({
 *		// The emoji name does not need to be in between the two colons.
 *		// In fact, basically any string can go there.
 *		// To save space, just use underscores.
 *		content: `${Emojis.YouTubeLogo} ${pingRoleID ? `<@&${pingRoleID}> ` : ""}${title} has uploaded a new video!`,
 *		embeds: [
 *	// ...
 * ]
 * });
 *
 * // ...
 */
var Emojis;
(function (Emojis) {
    // https://upload.wikimedia.org/wikipedia/commons/0/09/YouTube_full-color_icon_%282017%29.svg
    Emojis["YouTubeLogo"] = "<:_:1122177058974474300>";
    // Edited version of https://cdn-icons-png.flaticon.com/512/10313/10313032.png
    Emojis["QuestionMark"] = "<:_:1122479667828502568>";
    // https://i.gifer.com/ZZ5H.gif
    Emojis["Loading"] = "<a:_:1122539471024443522>";
    // Edited version of https://cdn-icons-png.flaticon.com/512/10337/10337354.png
    Emojis["Success"] = "<:_:1122174591591260170>";
    // Edited version of https://www.flaticon.com/free-icon/exclamation_10308557
    Emojis["Warning"] = "<:_:1122174876757803018>";
    // https://www.flaticon.com/free-icon/cross_10308387
    Emojis["Error"] = "<:_:1122174658331021312>";
    // https://www.flaticon.com/free-icon/rewind_190518
    Emojis["FirstPage"] = "<:_:1122174586914623610>";
    // https://www.flaticon.com/free-icon/previous_189260
    Emojis["Back"] = "<:_:1122174617604337716>";
    // Edited version of https://www.flaticon.com/free-icon/ellipsis_8699925
    Emojis["SelectPage"] = "<:_:1122174222903558165>";
    // https://www.flaticon.com/free-icon/previous_189259
    Emojis["Forward"] = "<:_:1122174619563069583>";
    // https://www.flaticon.com/free-icon/fast-forward_190517
    Emojis["LastPage"] = "<:_:1122174588294537367>";
    // https://static.wikia.nocookie.net/minecraft_gamepedia/images/d/dd/Slime_JE3_BE2.png/revision/latest?cb=20191230025505
    Emojis["Slime"] = "<:_:1112438888359792640>";
    // https://cdn-icons-png.flaticon.com/512/1587/1587509.png
    Emojis["Envelope"] = "<:_:1122178406512087071>";
    // https://pbs.twimg.com/media/EThkxLwWsAMGQgp?format=png&name=360x360
    Emojis["Wumpus"] = "<:_:1112436655241035807>";
})(Emojis || (exports.Emojis = Emojis = {}));
var EmojiIDs;
(function (EmojiIDs) {
    EmojiIDs["YouTubeLogo"] = "1122177058974474300";
    EmojiIDs["QuestionMark"] = "1122479667828502568";
    EmojiIDs["Loading"] = "1122539471024443522";
    EmojiIDs["Success"] = "1122174591591260170";
    EmojiIDs["Warning"] = "1122174876757803018";
    EmojiIDs["Error"] = "1122174658331021312";
    EmojiIDs["FirstPage"] = "1122174586914623610";
    EmojiIDs["Back"] = "1122174617604337716";
    EmojiIDs["SelectPage"] = "1122174222903558165";
    EmojiIDs["Forward"] = "1122174619563069583";
    EmojiIDs["LastPage"] = "1122174588294537367";
    EmojiIDs["Slime"] = "1112438888359792640";
    EmojiIDs["Envelope"] = "1122178406512087071";
    EmojiIDs["Wumpus"] = "1112436655241035807";
})(EmojiIDs || (exports.EmojiIDs = EmojiIDs = {}));
var ImageURLs;
(function (ImageURLs) {
    ImageURLs["YouTubeLogo"] = "https://upload.wikimedia.org/wikipedia/commons/0/09/YouTube_full-color_icon_%282017%29.svg";
    ImageURLs["QuestionMark"] = "https://cdn-icons-png.flaticon.com/512/10313/10313032.png";
    ImageURLs["Loading"] = "https://i.gifer.com/ZZ5H.gif";
    ImageURLs["SuccessOriginal"] = "https://cdn-icons-png.flaticon.com/512/10337/10337354.png";
    ImageURLs["WarningOriginal"] = "https://cdn-icons-png.flaticon.com/512/10308/10308557.png";
    ImageURLs["Error"] = "https://cdn-icons-png.flaticon.com/512/10308/10308387.png";
    ImageURLs["FirstPage"] = "https://cdn-icons-png.flaticon.com/512/190/190518.png";
    ImageURLs["Back"] = "https://cdn-icons-png.flaticon.com/512/189/189260.png";
    ImageURLs["SelectPageOriginal"] = "https://cdn-icons-png.flaticon.com/512/8699/8699925.png";
    ImageURLs["Forward"] = "https://cdn-icons-png.flaticon.com/512/189/189259.png";
    ImageURLs["LastPage"] = "https://cdn-icons-png.flaticon.com/512/190/190517.png";
    ImageURLs["Slime"] = "https://static.wikia.nocookie.net/minecraft_gamepedia/images/d/dd/Slime_JE3_BE2.png/revision/latest?cb=20191230025505";
    ImageURLs["Envelope"] = "https://cdn-icons-png.flaticon.com/512/1587/1587509.png";
    ImageURLs["Wumpus"] = "https://pbs.twimg.com/media/EThkxLwWsAMGQgp?format=png&name=360x360";
})(ImageURLs || (exports.ImageURLs = ImageURLs = {}));
var DefaultStatisticsChannelNames;
(function (DefaultStatisticsChannelNames) {
    DefaultStatisticsChannelNames["totalDiscordMembers"] = "Members: 0";
    DefaultStatisticsChannelNames["onlineDiscordMembers"] = "Online: 0";
    DefaultStatisticsChannelNames["totalJoinedMinecraftPlayers"] = "Total Joined: 0";
    DefaultStatisticsChannelNames["onlineMinecraftPlayers"] = "Players Online: 0";
    DefaultStatisticsChannelNames["minecraftServerUptime"] = "\uD83D\uDFE2 Online: 0 min";
})(DefaultStatisticsChannelNames || (exports.DefaultStatisticsChannelNames = DefaultStatisticsChannelNames = {}));
