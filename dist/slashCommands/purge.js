"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.command = void 0;
const builders_1 = require("@discordjs/builders");
const discord_js_1 = require("discord.js");
const arrays_1 = require("../assets/arrays");
const regexHell_1 = require("../utilities/regexHell");
const Messages_1 = require("../classes/Messages");
const genericTools_1 = require("../utilities/genericTools");
exports.command = {
    name: 'purge',
    data: new builders_1.SlashCommandBuilder()
        .setName("purge")
        .setDescription("💬 Purge (mass delete) messages.")
        .setDefaultMemberPermissions(discord_js_1.PermissionFlagsBits.ManageMessages)
        .addNumberOption((option) => option
        .setName("count")
        .setDescription("💬 The number of messages to delete.")
        .setRequired(true)
        .setMaxValue(100))
        .addChannelOption((option) => option
        .setName("channel")
        .setDescription("📜 The channel to delete messages in. Don't specify a channel to use the current channel.")
        .addChannelTypes(...arrays_1.TextChannelTypes))
        .addUserOption((option) => option
        .setName("user")
        .setDescription("👤 The user to purge messages from."))
        .addStringOption((option) => option
        .setName("match")
        .setDescription("📜 Delete messages that contain the specified input text."))
        .addStringOption((option) => option
        .setName("no-match")
        .setDescription("📜 Delete messages that do not contain the specified input text"))
        .addStringOption((option) => option
        .setName("regex")
        .setDescription("💬 Only delete messages that match a certain regular expression pattern."))
        .addBooleanOption((option) => option
        .setName("contain-embeds")
        .setDescription("📝 Only delete messages that contain embeds. Specify false to not delete messages with embeds."))
        .addStringOption((option) => option
        .setName("starts-with")
        .setDescription("💬 Delete messages that begin with the input text."))
        .addStringOption((option) => option
        .setName("not-starts-with")
        .setDescription("💬 Only delete messages that do not begin with the input text."))
        .addStringOption((option) => option
        .setName("ends-with")
        .setDescription("💬 Delete message that end with the input text."))
        .addStringOption((option) => option
        .setName("not-ends-with")
        .setDescription("💬 Only delete messages that do not end with the input text."))
        .addBooleanOption((option) => option
        .setName("contain-file-attachments")
        .setDescription("🎨 Only delete messages that contain files. Specify false to not delete messages with files."))
        .addBooleanOption((option) => option
        .setName("bot")
        .setDescription("🤖 Only delete messages sent by bots. Specify false to not delete messages sent by bots."))
        .addBooleanOption((option) => option
        .setName("contain-guild-invites")
        .setDescription("🔗 Only delete messages containing invites. Specify false to not delete messages containing invites."))
        .addBooleanOption((option) => option
        .setName("contain-links")
        .setDescription("🔗 Only delete messages containing links. Specify false to not delete messages containing links"))
        .addBooleanOption((option) => option
        .setName("contain-mention-pings")
        .setDescription("🔔 Only delete messages containing pings. Specify false to not delete messages containing pings."))
        .addStringOption((option) => option
        .setName("before-message")
        .setDescription("📄 Only delete messages sent before a specified message ID/link."))
        .addStringOption((option) => option
        .setName("before-date")
        .setDescription("📅 Only delete message sent after a specified date."))
        .addStringOption((option) => option
        .setName("after-message")
        .setDescription("📄 Only delete messages sent after a specified message ID/link."))
        .addStringOption((option) => option
        .setName("after-date")
        .setDescription("📅 Only delete messages sent after a specified date"))
        .addBooleanOption((option) => option
        .setName("inverse")
        .setDescription("🙃 Inverse the previous choices. ❗ Can lead to unexpected behaviour.")),
    usage: ["messages:number of messages to delete"],
    examples: ["messages:50"],
    async execute(interaction) {
        await interaction.deferReply({ ephemeral: true });
        const { options } = interaction;
        const channel = options.get("channel") ?? interaction.channel;
        if (!(channel instanceof discord_js_1.TextChannel)) {
            return interaction.editReply(new Messages_1.ErrorMessage("You can only use this command in a `Text Channel`!"));
        }
        let regex = options.get("regex")?.value?.toString();
        if (regex) {
            try {
                regex = RegExp(regex);
            }
            catch (error) {
                return interaction.editReply(new Messages_1.ErrorMessage(`Invalid regular expression pattern:\n${error}`));
            }
        }
        let beforeDate = options.get("before-date")?.value?.toString();
        if (beforeDate) {
            try {
                beforeDate = Date.parse(beforeDate);
            }
            catch (error) {
                return interaction.editReply(new Messages_1.ErrorMessage(`Invalid \`before-date\` input:\n${error}`));
            }
        }
        let afterDate = options.get("after-date")?.value?.toString();
        if (afterDate) {
            try {
                afterDate = Date.parse(afterDate);
            }
            catch (error) {
                return interaction.editReply(new Messages_1.ErrorMessage(`Invalid \`after-date\` input:\n${error}`));
            }
        }
        let beforeMessage = options.get("before-message")?.value?.toString();
        if (beforeMessage) {
            const beforeMessageID = /\d+$/.exec(beforeMessage)?.[0];
            if (!beforeMessageID) {
                return interaction.editReply(new Messages_1.ErrorMessage("Invalid message ID or link entered for `before-message`."));
            }
            beforeMessage = await channel.messages.fetch(beforeMessageID);
            if (!beforeMessage) {
                return interaction.editReply(new Messages_1.ErrorMessage("`before-message` message not found."));
            }
        }
        let afterMessage = options.get("after-message")?.value?.toString();
        if (afterMessage) {
            const afterMessageID = /\d+$/.exec(afterMessage)?.[0];
            if (!afterMessageID) {
                return interaction.editReply(new Messages_1.ErrorMessage(`Invalid message ID or link entered for \`after-message\`.`));
            }
            afterMessage = await channel.messages.fetch(afterMessageID);
            if (!afterMessage) {
                return interaction.editReply(new Messages_1.ErrorMessage(`\`after-message\` message not found.`));
            }
        }
        const messageNumber = options.get("count", true)?.value;
        const user = options.getUser("user");
        const match = options.get("match")?.value?.toString();
        const noMatch = options.get("no-match")?.value?.toString();
        const containEmbeds = options.get("contain-embeds")?.value;
        const startsWith = options.get("starts-with")?.value?.toString();
        const notStartsWith = options.get("not-starts-with")?.value?.toString();
        const endsWith = options.get("ends-with")?.value?.toString();
        const notEndsWith = options.get("not-ends-with")?.value?.toString();
        const containFileAttachments = options.get("contain-file-attachments")?.value;
        const bot = options.get("bot")?.value;
        const containGuildInvites = options.get("contain-guild-invites")?.value;
        const containLinks = options.get("contain-links")?.value;
        const containMentionPings = options.get("contain-mention-pings")?.value;
        const inverse = options.get("inverse")?.value;
        const matchRegExp = match
            ? RegExp(match?.replace(regexHell_1.RegExpCharactersRegExp, "\\$&"))
            : null;
        const noMatchRegExp = noMatch
            ? RegExp(noMatch?.replace(regexHell_1.RegExpCharactersRegExp, "\\$&"))
            : null;
        let messages = [];
        let earliestMessageID;
        let messagesRemaining = messageNumber;
        while (messages.length < messagesRemaining) {
            const fetchedMessages = [
                ...((await channel.messages.fetch(earliestMessageID
                    ? {
                        limit: 100,
                        before: earliestMessageID,
                    }
                    : {
                        limit: 100,
                    }))?.values() ?? []),
            ].filter((message) => {
                const { author, content, embeds, attachments, createdTimestamp } = message;
                const meetsConditions = (!user || user.id === author.id) &&
                    (!matchRegExp ||
                        (0, regexHell_1.objectMatch)(message, matchRegExp)) &&
                    (!noMatchRegExp ||
                        !(0, regexHell_1.objectMatch)(message, noMatchRegExp)) &&
                    (!regex ||
                        (0, regexHell_1.objectMatch)(message, regex)) &&
                    (containEmbeds === null ||
                        (!containEmbeds && !embeds.length) ||
                        (containEmbeds && embeds.length)) &&
                    (!startsWith || content.startsWith(startsWith)) &&
                    (!endsWith || content.endsWith(endsWith)) &&
                    (!notStartsWith || !content.startsWith(notStartsWith)) &&
                    (!notEndsWith || !content.endsWith(notEndsWith)) &&
                    (containFileAttachments === null ||
                        (!containFileAttachments && !attachments.size) ||
                        (containFileAttachments && attachments.size)) &&
                    (bot === null ||
                        (bot === false && !author.bot) ||
                        (bot === true && author.bot)) &&
                    (containGuildInvites === null ||
                        (containGuildInvites === false &&
                            !regexHell_1.GuildInviteRegExp.test(content)) ||
                        (containGuildInvites === true &&
                            regexHell_1.GuildInviteRegExp.test(content))) &&
                    (containLinks === null ||
                        (!containLinks && !regexHell_1.URLRegExp.test(content)) ||
                        (containLinks && regexHell_1.URLRegExp.test(content))) &&
                    (containMentionPings === null ||
                        (!containMentionPings && !/<@&?\d{18,}>/.test(content)) ||
                        (containMentionPings && /<@&?\d{18,}>/.test(content))) &&
                    (!beforeDate || createdTimestamp < beforeDate) &&
                    (!afterDate || createdTimestamp > afterDate) &&
                    (!beforeMessage ||
                        createdTimestamp < beforeMessage.createdTimestamp) &&
                    (!afterMessage ||
                        createdTimestamp > afterMessage.createdTimestamp);
                return inverse ? !meetsConditions : meetsConditions;
            });
            messages.push(...fetchedMessages);
            if (fetchedMessages.length) {
                earliestMessageID = fetchedMessages[fetchedMessages.length - 1].id;
            }
        }
        messages = messages.slice(0, messageNumber);
        await channel.bulkDelete(messages);
        return interaction.editReply(messages.length
            ? new Messages_1.SuccessMessage(`Successfully deleted \`${messages.length}\` message${(0, genericTools_1.addSuffix)(messages.length)}!`)
            : new Messages_1.ErrorMessage(`Couldn't find any messages that matched the specified requirements within a reasonable number of messages.`));
    },
};
