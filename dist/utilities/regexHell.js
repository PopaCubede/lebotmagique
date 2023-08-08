"use strict";
// ! Regex Hell
Object.defineProperty(exports, "__esModule", { value: true });
exports.isImageLink = exports.isValidGuildInviteURL = exports.GuildInviteRegExp = exports.isValidURL = exports.URLRegExp = exports.objectMatch = exports.EmojiLookbehindRegExp = exports.AfterEmojiRegExp = exports.StartEmojiRegExp = exports.EmojiRegExp = exports.ParagraphSeparatorLookaheadRegExp = exports.ParagraphSeparatorRegExp = exports.LineSeparatorLookaheadRegExp = exports.LineSeparatorRegExp = exports.SentenceRegExp = exports.NotSentenceEndCharactersRegExp = exports.SentenceEndCharactersRegExp = exports.QuoteRegExp = exports.ClosingQuoteRegExp = exports.OpeningQuoteRegExp = exports.NameAbbreviationsRegExp = exports.NotLineBreakRegExp = exports.LineBreakRegExp = exports.CamelCaseSubStringSeparatorLookaheadRegExp = exports.CamelCaseSubStringSeparatorRegExp = exports.WordRegExp = exports.PunctuationLookaheadRegExp = exports.PunctuationRegExp = exports.RegExpCharactersRegExp = exports.ANSIControlCharactersRegExp = exports.ANSIControlCharactersRegExpString = void 0;
const types_1 = require("../../types");
/*

? Note

Try to omit capturing groups from all regular expressions (add `?:` to the beginning of the capturing group, right after the opening bracket).

In other words, make them "non-capturing-groups", as otherwise there may be some unintended behaviour, especially when using `String#split` with the regular expression.

Unless you actually *need* a capturing group, remove all capturing groups from regular expressions and use non-capturing groups instead. (add `?:` right after the opening bracket of the group)
If you actually need a capturing group, then you can use them freely, otherwise, if you simply need to group several expressions together, as is in most cases, use non-capturing groups.

This goes for all regular expressions in this project, not just those in this file or just those in this section.

Try to make a string representation of a regular expression first (don't export it), after that, make the regular expression with the string. (RegExp(StringRegExp))

This way you can document different parts of your regular expression.

You don't have to do this if your regular expression is very simple or if it won't cause any inconsistency.

Use camelCase for the regex string variables, and PascalCase for the regular expressions themselves.

*/
exports.ANSIControlCharactersRegExpString = "(?:\u001b|\x1B|\\x[01][0-9a-f]|\\u00[01][0-9a-f]|\\[\\d{1,2}m)";
/**
 * A regular expression to match `ANSI control characters`.
 *
 * This is useful for cleaning up strings that were changed in some way by the `chalk` module.
 *
 * Used in the {@link console.log} function refactor.
 * @example
 * // Removing control characters added by chalk.
 * import {ANSIControlCharactersRegExp} from "../../../utility.js";
 * import chalk from "chalk";
 *
 * const {redBright, bold} = chalk;
 *
 * const message = redBright(bold("Hello, world!"));
 *
 * console.log(JSON.stringify(message));
 * // => "\u001b[91m\u001b[1mHello, world!\u001b[22m\u001b[39m"
 *
 * const trimmedMessage = message.replace(ANSIControlCharactersRegExp, "");
 *
 * console.log(JSON.stringify(trimmedMessage), trimmedMessage);
 * // => "Hello, world!" Hello, world!
 * @example
 * // Used in the console.log function refactor.
 * // ./src/utility.ts.
 *
 * // ...
 *
 * // Clearing out any invisible control characters, and then checking if the string starts with a new line.
 * latestLog.replace(ANSIControlCharactersRegExp, "").startsWith("\n")
 *
 * // ...
 *
 */
exports.ANSIControlCharactersRegExp = new RegExp(exports.ANSIControlCharactersRegExpString, "g");
// A capture group is necessary in this regular expression.
exports.RegExpCharactersRegExp = /([.*+?^${}()|[\]\\])/g;
const punctuationRegExpString = "[\u2000-\u206F\u2E00-\u2E7F'!\"#$%&()*+,\\-./:;<=>?@[\\]^_`{|}~«»《》〈〉]";
exports.PunctuationRegExp = RegExp(punctuationRegExpString, "g");
exports.PunctuationLookaheadRegExp = RegExp(`(?=${punctuationRegExpString})`, "g");
const wordRegExpString = `(?:[a-z][’']?(?:[-–—][a-z])?)+(?=(${punctuationRegExpString}|[\n ]|$))`;
exports.WordRegExp = RegExp(wordRegExpString, "gi");
const camelCaseSubStringSeparatorRegExpString = "[A-Z][a-rt-z]|A|(?<=[a-z])[B-Z]{2,}|(?<=[a-z])I";
exports.CamelCaseSubStringSeparatorRegExp = RegExp(camelCaseSubStringSeparatorRegExpString, "g");
exports.CamelCaseSubStringSeparatorLookaheadRegExp = RegExp(`(?=${camelCaseSubStringSeparatorRegExpString})`, "g");
const lineBreakRegExpString = "\r\n|\n\r|[\n\r\u000C\u0085\u2028\u2029\u001E]";
exports.LineBreakRegExp = RegExp(lineBreakRegExpString, "g");
const notLineBreakRegExpString = "[^\n\r\u000C\u0085\u2028\u2029\u001E]";
exports.NotLineBreakRegExp = RegExp(notLineBreakRegExpString, "g");
const nameAbbreviationsRegExpString = `(?:Dr|Esq|Hon|Jr|Mr|Mrs|Ms|Messrs|Mmes|Msgr|Prof|Rev|Rt\\. Hon|Sr|St)`;
exports.NameAbbreviationsRegExp = RegExp(nameAbbreviationsRegExpString, "g");
const openingQuoteRegExpString = `[「“‘"'«《〈]`;
exports.OpeningQuoteRegExp = RegExp(openingQuoteRegExpString, "g");
const closingQuoteRegExpString = `[」”’"'»》〉]`;
exports.ClosingQuoteRegExp = RegExp(closingQuoteRegExpString, "g");
const quoteRegExpString = `[「」“”‘’"'«»《》〈〉]`;
exports.QuoteRegExp = RegExp(quoteRegExpString, "g");
const sentenceEndCharactersRegExpString = "[.…?!]";
exports.SentenceEndCharactersRegExp = RegExp(sentenceEndCharactersRegExpString, "g");
const notSentenceEndCharactersRegExpString = `[^\\d${sentenceEndCharactersRegExpString.slice(1, sentenceEndCharactersRegExpString.length - 1)}${notLineBreakRegExpString.slice(2, notLineBreakRegExpString.length - 1)}]`;
exports.NotSentenceEndCharactersRegExp = RegExp(notSentenceEndCharactersRegExpString, "g");
const sentenceCharacterRegExpString = `(?:` + // Opening outermost non-capturing group bracket.
    `(?:…|\\.{3,})+(?=\\s(?:[^A-Z]|I(?=\\s)))` + // Matches ellipses (...) with a whitespace character after them and no capital letter (or the word "I", as it is always capital). Note: it isn't needed to match ellipses without a whitespace character after them, as that is matched anyway in the next expression below:
    `|\\d(?!\\.)` +
    `|(?<!^|${lineBreakRegExpString})\\d` +
    `|\\s+${nameAbbreviationsRegExpString}\\.` + // Matches name abbreviations, E.g., `Mr. ${name}` isn't a full sentence, even though the period follows the general pattern of a sentence-ending character. Name abbreviations have to have a whitespace character or a newline before them. Note: it isn't needed to check for line breaks specifically, as the whitespace RegExp character covers them.
    `|${sentenceEndCharactersRegExpString}\\s*(?:${closingQuoteRegExpString}|\\))` + // Matches sentence-ending characters inside quotes.
    `(?<=\\s+)${exports.SentenceEndCharactersRegExp}` + // Matches sentence-ending characters with a whitespace in front of them.
    `|(?:${sentenceEndCharactersRegExpString}(?=\\S))` + // Matches sentence-ending characters without a whitespace character after them. Note: it isn't needed to check for decimal point usage as well as recurring decimal notation (0.999...) as the decimal would be matched anyway by this expression and the ellipsis would be matched either by the sentence-ending character part of the SentenceRegExp or by the previous expression.
    `|${notSentenceEndCharactersRegExpString}` + // Matches all non-sentence-ending characters.
    `)`; // Closing outermost non-capturing group bracket.
exports.SentenceRegExp = RegExp(`(?<=^|\\s)` + // Checks for the necessary whitespace character or start of the string before a sentence. Note: it isn't needed to check for line breaks specifically, as the whitespace RegExp character covers them.
    `${sentenceCharacterRegExpString}+` + // Matches as many valid sentence characters as possible.
    `(?:${sentenceEndCharactersRegExpString}+|$)` + // Matches the sentence end character(s).
    `(?:(?:(?:\\s*\\(\\s*${sentenceCharacterRegExpString}+)?\\s*\\))` + // Matches a possible further string of words inside parentheses, after the main sentence.
    `|${closingQuoteRegExpString}*(?=\\s|$))`, // Matches the necessary space or line break after the sentence end character. Note: it isn't needed to check for line breaks specifically, as the whitespace RegExp character covers them.
"g");
const lineSeparatorRegExpString = `(?:\\s*(?:${lineBreakRegExpString})\\s*)+`;
exports.LineSeparatorRegExp = RegExp(lineSeparatorRegExpString, "g");
exports.LineSeparatorLookaheadRegExp = RegExp(`(?=${lineSeparatorRegExpString})+`, "g");
const paragraphSeparatorRegExpString = `(?:\\s*(?:${lineBreakRegExpString})\\s*){2,}`;
exports.ParagraphSeparatorRegExp = RegExp(paragraphSeparatorRegExpString, "g");
exports.ParagraphSeparatorLookaheadRegExp = RegExp(`(?=${paragraphSeparatorRegExpString})`, "g");
const emojiRegExpString = "(?:\u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff]|1️⃣|2️⃣|3️⃣|4️⃣|5️⃣|6️⃣|7️⃣|8️⃣|9️⃣|🔟)";
exports.EmojiRegExp = new RegExp(emojiRegExpString);
const startEmojiRegExpString = `^${emojiRegExpString}`;
exports.StartEmojiRegExp = new RegExp(startEmojiRegExpString);
const afterEmojiRegExpString = `${emojiRegExpString}.+`;
exports.AfterEmojiRegExp = new RegExp(afterEmojiRegExpString, "gm");
const emojiLookbehindRegExpString = `(?<=${startEmojiRegExpString}).+`;
exports.EmojiLookbehindRegExp = new RegExp(emojiLookbehindRegExpString);
const objectMatch = (object, match) => {
    for (const key in object) {
        if (typeof object[key] === "object") {
            const matchString = (0, exports.objectMatch)(object[key], match);
            if (matchString)
                return true;
        }
        else if (typeof object[key] === "string" &&
            RegExp(match).exec(object[key])) {
            return true;
        }
    }
    return false;
};
exports.objectMatch = objectMatch;
const urlRegExpString = `(https?:\\/\\/)` + // Validate protocol.
    `((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|` + // Validate domain name.
    `((\\d{1,3}\\.){3}\\d{1,3}))` + // Validate OR IP (v4) address.
    `(:\\d+)?(\\/[-a-z\\d%_.~+]*)*` + // Validate port and path.
    `(\\?[;&a-z\\d%_.~+=-]*)?` + // Match a possible query string.
    `(#[-a-z\\d_]*)?`; // Match a possible fragment locator.
/**
 * A regular expression that matches all `URL`s in a string. (global `g` and ignore case `i` flags as `URL`s are *case insensitive*)
 * @see {@link isValidURL} for a function to test whether a string is *exactly* a valid `URL`.
 * @see {@link isImageLink} for a function to test whether a `URL` leads to an image.
 * @example
 * // Matching all URLs in a string.
 * import {URLRegExp} from "../../../utility.js";
 *
 * const string = "http://foo.co.uk/ Some example text in between https://marketplace.visualstudio.com/items?itemName=chrmarti.regex Some more random text - https://github.com/chrmarti/vscode-regex";
 *
 * const urls = string.match(URLRegExp);
 * console.log(urls);
 * // => ["http://foo.co.uk/", "https://marketplace.visualstudio.com/items?itemName=chrmarti.regex", "https://github.com/chrmarti/vscode-regex"].
 * @see {@link ./events/client/message/messageReactionAdd.ts messageReactionAdd.ts} for a use case of this regular expression. (See below `⬇` for a summary of the use case)
 * @example
 * // Matching all URLs in a string.
 * // ./src/events/client/message/messageReactionAdd.ts.
 * import {URLRegExp, isImageLink} from "../../../utility.js";
 *
 * // ...
 *
 * const {author, content, url, createdTimestamp, attachments, embeds} = message;
 *
 * // ...
 *
 * // isImageLink is shorthand syntax for (link) => isImageLink(link).
 * const messageImageURLs = (content?.match(URLRegExp) ?? []).filter(isImageLink);
 *
 * // ...
 */
exports.URLRegExp = RegExp(urlRegExpString, "gi");
/**
 * A function to check if a string is *exactly* a valid `URL` or not.
 * @see {@link URLRegExp} for a regular expression to match *all* `URL`s in a string.
 * @see {@link isImageLink} for a function to test whether a `URL` leads to an image.
 * @param {string} urlString The string to check whether it is a valid URL or not.
 * @returns {boolean} Whether the string is a valid `URL`.
 * @example
 * // Checking whether strings are valid URLs.
 * isValidURL("styles.css");
 * // => false.
 *
 * isValidURL("https://www.youtube.com");
 * // => true.
 * @see {@link PollMessage} (right at the end of the {@link PollMessage.create create} method, where `this.files` is populated with attachment `URL`s, if they have been specified when running the `/poll` command or if they exist on the poll message) for a use case of this function. (See below `⬇` for a summary of the use case)
 * @example
 * // Filtering attachment data by valid URLs.
 * // Used in the PollMessage class.
 *
 * // ...
 *
 *	this.files =
 *		data instanceof ChatInputCommandInteraction
 *			? (data.options.getString("attachments") ?? "")
 *					.split(",")
 *					// "isValidURL" is short for (url) => isValidURL(url).
 *					.filter(isValidURL)
 *			: [...data.message.attachments.values()].map(
 *					(attachmentData) => attachmentData.url,
 *			  );
 *
 * // ...
 */
const isValidURL = (urlString) => RegExp(`^(?:${urlRegExpString})$`, "i").test(urlString);
exports.isValidURL = isValidURL;
const GuildInviteRegExpString = `(?:https?:\\/\\/)?` + // Validate protocol.
    `(?:www\\.)?(?:(?:dis(?:(?:cord(?:(?:\\.(?:(?:(?:(?:media|com|gg)\\/invite)|gg)\\/[a-z]{7,}` + // Match all invites on the official Discord website (support for all of Discord's domains).
    `|(?:(?:io|li|me)\\/(?!servers)([a-z\\d-+=_/[\\]{}\\\\|:"<>?!@#$%^&*()~\`]{3,}))))` + // Match server links on `discord.io` (same as `discord.li`) and `discord.me`. Both are websites for advertising Discord servers.
    `|app\\.(?:com|net)\\/invite\\/[a-z]{7,}))` + // Match invites on `discordapp.com`.
    `|board\\.org\\/server\\/[-a-z\\d%_.~+/]{2,}))` + // Match server links from `disboard.org`. (Another server advertisement website)
    `|top\\.gg\\/servers\\/(?:[-a-z\\d%_.~+]{2,}))` + // Match server links from `top.gg`. (A bot and server website)
    `\\/?` + // Match a possible slash at the end of the URL which makes no difference, (but is still part of the URL).
    `(?:\\?[;&a-z\\d%_.~+=-]*)?` + // Validate a possible query string.
    `(?:#[-a-z\\d_]*)?`; // Validate a possible fragment locator.
exports.GuildInviteRegExp = RegExp(GuildInviteRegExpString, "gi");
const isValidGuildInviteURL = (urlString) => RegExp(`^(?:${GuildInviteRegExpString})$`, "i").test(urlString);
exports.isValidGuildInviteURL = isValidGuildInviteURL;
/**
 * A function to check whether a link leads to an image file based off of its *file extension*.
 * @see {@link URLRegExp} for a regular expression to match all valid `URL`s in a string.
 * @see {@link isValidURL} for a function to check whether a string is a valid `URL` or not.
 * @param {string} urlString The link to check whether it is an image or not.
 * @returns {boolean} Whether the link stores an image file or not.
 * @example
 * // Checking whether URLs lead to an image file:
 * import {isImageLink} from "../../../utility.js";
 *
 * isImageLink("https://www.youtube.com");
 * // => false.
 *
 * isImageLink("https://static.wikia.nocookie.net/minecraft_gamepedia/images/d/dd/Slime_JE3_BE2.png/revision/latest?cb=20191230025505");
 * // => true.
 * @see {@link ./events/client/message/messageReactionAdd.ts messageReactionAdd.ts} for an example use case of this function. (See below `⬇` for a summary of the use case)
 * @example
 * // Filtering out non-image links.
 * // ./src/events/client/message/messageReactionAdd.ts.
 * import {isImageLink} from "../../../utility.js";
 *
 * // ...
 *
 * const {author, content, url, createdTimestamp, attachments, embeds} = message;
 *
 * // ...
 *
 * // Shorthand syntax for:
 * // const messageImageURLs = (content?.match(URLRegExp) ?? []).filter((link) => isImageLink(link))
 * const messageImageURLs = (content?.match(URLRegExp) ?? []).filter(isImageLink);
 *
 * // ...
 */
const isImageLink = (urlString) => types_1.ALLOWED_EXTENSIONS.some((extension) => RegExp(`\\.${extension}(?:$|\\/+)`, "i").test(urlString));
exports.isImageLink = isImageLink;
