// ! Enums

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

export enum Colours {
    Query = 0x2b2d31,
    Loading = 0x2b2d31,
    Success = 0x2b2d31,
    Warning = 0x2b2d31,
    Error = 0x2b2d31,
    Default = 0x2b2d31,
    /**
     * A colour that exactly matches the colour of *embed backgrounds* using **dark theme**.
     */
    Transparent = 0x2b2d31,
    /**
     * A colour that matches the colour of *embed backgrounds* using **light theme**.
     *
     * Note: Not confirmed whether the colour actually matches the background of embeds in light mode, no way I'm going to enable Discord light theme to test.
     */
    TransparentBright = 0xf2f3f5,
    /**
     * The new `blurple` colour that Discord uses.
     *
     * Somewhere in between blue and purple.
     */
    Blurple = 0x5865f2,
    /**
     * A nice lime colour. Used for the levelling progress bar.
     *
     * @see {@link LevelLeaderboardMessage} for an example usage of this colour.
     * @see {@link ./src/commands/levelling/level.ts level.ts} for another example usage of this colour.
     */
    Lime = 0x10df50,
    /**
     * A deep ocean blue colour.
     */
    OceanBlue = 0x1055d8,
}

/**
 * An enum with hex strings representing colour values.
 *
 * The colours here are the same as in the {@link Colours the Colours enum}.
 * @see {@link Colours} for an enum with numbers representing colour values.
 */
export enum ColourHexStrings {
    Query = "#2b2d31",
    Loading = "#2b2d31",
    Success = "#2b2d31",
    Warning = "#2b2d31",
    Error = "#2b2d31",
    Default = "#2b2d31",
    Transparent = "#2b2d31",
    TransparentBright = "#f2f3f5",
    Blurple = "#5865f2",
    Lime = "#10df50",
    OceanBlue = "#1050df",
}

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

export enum Emojis {
    // https://upload.wikimedia.org/wikipedia/commons/0/09/YouTube_full-color_icon_%282017%29.svg
    YouTubeLogo = "<:_:1122177058974474300>",
    // Edited version of https://cdn-icons-png.flaticon.com/512/10313/10313032.png
    QuestionMark = "<:_:1122479667828502568>",
    // https://i.gifer.com/ZZ5H.gif
    Loading = "<a:_:1122539471024443522>",
    // Edited version of https://cdn-icons-png.flaticon.com/512/10337/10337354.png
    Success = "<:_:1122174591591260170>",
    // Edited version of https://www.flaticon.com/free-icon/exclamation_10308557
    Warning = "<:_:1122174876757803018>",
    // https://www.flaticon.com/free-icon/cross_10308387
    Error = "<:_:1122174658331021312>",
    // https://www.flaticon.com/free-icon/rewind_190518
    FirstPage = "<:_:1122174586914623610>",
    // https://www.flaticon.com/free-icon/previous_189260
    Back = "<:_:1122174617604337716>",
    // Edited version of https://www.flaticon.com/free-icon/ellipsis_8699925
    SelectPage = "<:_:1122174222903558165>",
    // https://www.flaticon.com/free-icon/previous_189259
    Forward = "<:_:1122174619563069583>",
    // https://www.flaticon.com/free-icon/fast-forward_190517
    LastPage = "<:_:1122174588294537367>",
    // https://static.wikia.nocookie.net/minecraft_gamepedia/images/d/dd/Slime_JE3_BE2.png/revision/latest?cb=20191230025505
    Slime = "<:_:1112438888359792640>",
    // https://cdn-icons-png.flaticon.com/512/1587/1587509.png
    Envelope = "<:_:1122178406512087071>",
    // https://pbs.twimg.com/media/EThkxLwWsAMGQgp?format=png&name=360x360
    Wumpus = "<:_:1112436655241035807>",
}

export enum EmojiIDs {
    YouTubeLogo = "1122177058974474300",
    QuestionMark = "1122479667828502568",
    Loading = "1122539471024443522",
    Success = "1122174591591260170",
    Warning = "1122174876757803018",
    Error = "1122174658331021312",
    FirstPage = "1122174586914623610",
    Back = "1122174617604337716",
    SelectPage = "1122174222903558165",
    Forward = "1122174619563069583",
    LastPage = "1122174588294537367",
    Slime = "1112438888359792640",
    Envelope = "1122178406512087071",
    Wumpus = "1112436655241035807",
}

export enum ImageURLs {
    YouTubeLogo = "https://upload.wikimedia.org/wikipedia/commons/0/09/YouTube_full-color_icon_%282017%29.svg",
    QuestionMark = "https://cdn-icons-png.flaticon.com/512/10313/10313032.png",
    Loading = "https://i.gifer.com/ZZ5H.gif",
    SuccessOriginal = "https://cdn-icons-png.flaticon.com/512/10337/10337354.png",
    WarningOriginal = "https://cdn-icons-png.flaticon.com/512/10308/10308557.png",
    Error = "https://cdn-icons-png.flaticon.com/512/10308/10308387.png",
    FirstPage = "https://cdn-icons-png.flaticon.com/512/190/190518.png",
    Back = "https://cdn-icons-png.flaticon.com/512/189/189260.png",
    SelectPageOriginal = "https://cdn-icons-png.flaticon.com/512/8699/8699925.png",
    Forward = "https://cdn-icons-png.flaticon.com/512/189/189259.png",
    LastPage = "https://cdn-icons-png.flaticon.com/512/190/190517.png",
    Slime = "https://static.wikia.nocookie.net/minecraft_gamepedia/images/d/dd/Slime_JE3_BE2.png/revision/latest?cb=20191230025505",
    Envelope = "https://cdn-icons-png.flaticon.com/512/1587/1587509.png",
    Wumpus = "https://pbs.twimg.com/media/EThkxLwWsAMGQgp?format=png&name=360x360",
}


export enum DefaultStatisticsChannelNames {
    totalDiscordMembers = "Members: 0",
    onlineDiscordMembers = "Online: 0",
    totalJoinedMinecraftPlayers = "Total Joined: 0",
    onlineMinecraftPlayers = "Players Online: 0",
    minecraftServerUptime = "🟢 Online: 0 min",
}
