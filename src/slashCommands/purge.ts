import { SlashCommandBuilder } from '@discordjs/builders';
import { SlashCommand } from "../../types";
import { PermissionFlagsBits, TextChannel, Message, CommandInteraction, CacheType } from 'discord.js';
import { TextChannelTypes } from '../assets/arrays';
import { GuildInviteRegExp, RegExpCharactersRegExp, URLRegExp, objectMatch } from '../utilities/regexHell';
import { ErrorMessage, SuccessMessage } from '../classes/Messages';
import { addSuffix } from '../utilities/genericTools';

export const command: SlashCommand = {
    name: 'purge',
    data: new SlashCommandBuilder()
        .setName("purge")
        .setDescription("💬 Purge (mass delete) messages.")
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages)
        .addNumberOption((option) =>
            option
                .setName("count")
                .setDescription("💬 The number of messages to delete.")
                .setRequired(true)
                .setMaxValue(100),
        )
        .addChannelOption((option) =>
            option
                .setName("channel")
                .setDescription(
                    "📜 The channel to delete messages in. Don't specify a channel to use the current channel.",
                )
                .addChannelTypes(...TextChannelTypes),
        )
        .addUserOption((option) =>
            option
                .setName("user")
                .setDescription("👤 The user to purge messages from."),
        )
        .addStringOption((option) =>
            option
                .setName("match")
                .setDescription(
                    "📜 Delete messages that contain the specified input text.",
                ),
        )
        .addStringOption((option) =>
            option
                .setName("no-match")
                .setDescription(
                    "📜 Delete messages that do not contain the specified input text",
                ),
        )
        .addStringOption((option) =>
            option
                .setName("regex")
                .setDescription(
                    "💬 Only delete messages that match a certain regular expression pattern.",
                ),
        )
        .addBooleanOption((option) =>
            option
                .setName("contain-embeds")
                .setDescription(
                    "📝 Only delete messages that contain embeds. Specify false to not delete messages with embeds.",
                ),
        )
        .addStringOption((option) =>
            option
                .setName("starts-with")
                .setDescription("💬 Delete messages that begin with the input text."),
        )
        .addStringOption((option) =>
            option
                .setName("not-starts-with")
                .setDescription(
                    "💬 Only delete messages that do not begin with the input text.",
                ),
        )
        .addStringOption((option) =>
            option
                .setName("ends-with")
                .setDescription("💬 Delete message that end with the input text."),
        )
        .addStringOption((option) =>
            option
                .setName("not-ends-with")
                .setDescription(
                    "💬 Only delete messages that do not end with the input text.",
                ),
        )
        .addBooleanOption((option) =>
            option
                .setName("contain-file-attachments")
                .setDescription(
                    "🎨 Only delete messages that contain files. Specify false to not delete messages with files.",
                ),
        )
        .addBooleanOption((option) =>
            option
                .setName("bot")
                .setDescription(
                    "🤖 Only delete messages sent by bots. Specify false to not delete messages sent by bots.",
                ),
        )
        .addBooleanOption((option) =>
            option
                .setName("contain-guild-invites")
                .setDescription(
                    "🔗 Only delete messages containing invites. Specify false to not delete messages containing invites.",
                ),
        )
        .addBooleanOption((option) =>
            option
                .setName("contain-links")
                .setDescription(
                    "🔗 Only delete messages containing links. Specify false to not delete messages containing links",
                ),
        )
        .addBooleanOption((option) =>
            option
                .setName("contain-mention-pings")
                .setDescription(
                    "🔔 Only delete messages containing pings. Specify false to not delete messages containing pings.",
                ),
        )
        .addStringOption((option) =>
            option
                .setName("before-message")
                .setDescription(
                    "📄 Only delete messages sent before a specified message ID/link.",
                ),
        )
        .addStringOption((option) =>
            option
                .setName("before-date")
                .setDescription("📅 Only delete message sent after a specified date."),
        )
        .addStringOption((option) =>
            option
                .setName("after-message")
                .setDescription(
                    "📄 Only delete messages sent after a specified message ID/link.",
                ),
        )
        .addStringOption((option) =>
            option
                .setName("after-date")
                .setDescription("📅 Only delete messages sent after a specified date"),
        )
        .addBooleanOption((option) =>
            option
                .setName("inverse")
                .setDescription(
                    "🙃 Inverse the previous choices. ❗ Can lead to unexpected behaviour.",
                ),
        ),
    usage: ["messages:number of messages to delete"],
    examples: ["messages:50"],
    async execute(interaction: CommandInteraction<CacheType>) {
        await interaction.deferReply({ ephemeral: true });

        const { options } = interaction;
        const channel = options.get("channel") ?? interaction.channel;

        if (!(channel instanceof TextChannel)) {
            return interaction.editReply(
                new ErrorMessage("You can only use this command in a `Text Channel`!"),
            );
        }

        let regex: string | undefined | RegExp = options.get("regex")?.value?.toString();

        if (regex) {
            try {
                regex = RegExp(regex);
            } catch (error) {
                return interaction.editReply(
                    new ErrorMessage(`Invalid regular expression pattern:\n${error}`),
                );
            }
        }

        let beforeDate: string | undefined | number = options.get("before-date")?.value?.toString();

        if (beforeDate) {
            try {
                beforeDate = Date.parse(beforeDate);
            } catch (error) {
                return interaction.editReply(
                    new ErrorMessage(`Invalid \`before-date\` input:\n${error}`),
                );
            }
        }

        let afterDate: string | undefined | number = options.get("after-date")?.value?.toString();

        if (afterDate) {
            try {
                afterDate = Date.parse(afterDate);
            } catch (error) {
                return interaction.editReply(
                    new ErrorMessage(`Invalid \`after-date\` input:\n${error}`),
                );
            }
        }

        let beforeMessage: string | null | Message | undefined =
            options.get("before-message")?.value?.toString();

        if (beforeMessage) {
            const beforeMessageID = /\d+$/.exec(beforeMessage)?.[0];

            if (!beforeMessageID) {
                return interaction.editReply(
                    new ErrorMessage(
                        "Invalid message ID or link entered for `before-message`.",
                    ),
                );
            }

            beforeMessage = await channel.messages.fetch(beforeMessageID);

            if (!beforeMessage) {
                return interaction.editReply(
                    new ErrorMessage("`before-message` message not found."),
                );
            }
        }

        let afterMessage: string | null | Message | undefined =
            options.get("after-message")?.value?.toString();

        if (afterMessage) {
            const afterMessageID = /\d+$/.exec(afterMessage)?.[0];

            if (!afterMessageID) {
                return interaction.editReply(
                    new ErrorMessage(
                        `Invalid message ID or link entered for \`after-message\`.`,
                    ),
                );
            }

            afterMessage = await channel.messages.fetch(afterMessageID);

            if (!afterMessage) {
                return interaction.editReply(
                    new ErrorMessage(`\`after-message\` message not found.`),
                );
            }
        }

        const messageNumber = options.get("count", true)?.value as number;

        const user = options.getUser("user");
        const match = options.get("match")?.value?.toString();
        const noMatch = options.get("no-match")?.value?.toString();

        const containEmbeds = options.get("contain-embeds")?.value as boolean;

        const startsWith = options.get("starts-with")?.value?.toString();
        const notStartsWith = options.get("not-starts-with")?.value?.toString();

        const endsWith = options.get("ends-with")?.value?.toString();
        const notEndsWith = options.get("not-ends-with")?.value?.toString();

        const containFileAttachments = options.get(
            "contain-file-attachments",
        )?.value as boolean;

        const bot = options.get("bot")?.value as boolean;

        const containGuildInvites = options.get("contain-guild-invites")?.value as boolean;
        const containLinks = options.get("contain-links")?.value as boolean;
        const containMentionPings = options.get("contain-mention-pings")?.value as boolean;

        const inverse = options.get("inverse")?.value as boolean;

        const matchRegExp = match
            ? RegExp(match?.replace(RegExpCharactersRegExp, "\\$&"))
            : null;

        const noMatchRegExp = noMatch
            ? RegExp(noMatch?.replace(RegExpCharactersRegExp, "\\$&"))
            : null;

        let messages: Message[] = [];
        let earliestMessageID: string | undefined;

        let messagesRemaining = messageNumber;

        while (messages.length < messagesRemaining) {
            const fetchedMessages = [
                ...((
                    await channel.messages.fetch(
                        earliestMessageID
                            ? {
                                limit: 100,
                                before: earliestMessageID,
                            }
                            : {
                                limit: 100,
                            },
                    )
                )?.values() ?? []),
            ].filter((message) => {
                const { author, content, embeds, attachments, createdTimestamp } =
                    message;

                const meetsConditions =
                    (!user || user.id === author.id) &&
                    (!matchRegExp ||
                        objectMatch(
                            message as unknown as { [key: string | symbol]: unknown },
                            matchRegExp,
                        )) &&
                    (!noMatchRegExp ||
                        !objectMatch(
                            message as unknown as { [key: string | symbol]: unknown },
                            noMatchRegExp,
                        )) &&
                    (!regex ||
                        objectMatch(
                            message as unknown as { [key: string | symbol]: unknown },
                            regex,
                        )) &&
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
                            !GuildInviteRegExp.test(content)) ||
                        (containGuildInvites === true &&
                            GuildInviteRegExp.test(content))) &&
                    (containLinks === null ||
                        (!containLinks && !URLRegExp.test(content)) ||
                        (containLinks && URLRegExp.test(content))) &&
                    (containMentionPings === null ||
                        (!containMentionPings && !/<@&?\d{18,}>/.test(content)) ||
                        (containMentionPings && /<@&?\d{18,}>/.test(content))) &&
                    (!beforeDate || createdTimestamp < (beforeDate as number)) &&
                    (!afterDate || createdTimestamp > (afterDate as number)) &&
                    (!beforeMessage ||
                        createdTimestamp < (beforeMessage as Message).createdTimestamp) &&
                    (!afterMessage ||
                        createdTimestamp > (afterMessage as Message).createdTimestamp);

                return inverse ? !meetsConditions : meetsConditions;
            });

            messages.push(...fetchedMessages);

            if (fetchedMessages.length) {
                earliestMessageID = fetchedMessages[fetchedMessages.length - 1].id;
            }
        }

        messages = messages.slice(0, messageNumber);

        await channel.bulkDelete(messages);

        return interaction.editReply(
            messages.length
                ? new SuccessMessage(
                    `Successfully deleted \`${messages.length}\` message${addSuffix(
                        messages.length,
                    )}!`,
                )
                : new ErrorMessage(
                    `Couldn't find any messages that matched the specified requirements within a reasonable number of messages.`,
                ),
        );
    },
};
