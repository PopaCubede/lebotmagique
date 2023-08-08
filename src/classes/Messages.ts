import { APIEmbed } from "discord.js";
import { Colours, Emojis } from "../assets/enums";

export class ErrorMessage {
    embeds: [APIEmbed];
    ephemeral = false;
    simple = true;
    /**
     * @param {string} message The message to display in the embed.
     */
    constructor(message: string, ephemeral = false, simple = true) {
        this.embeds = [
            {
                title: simple ? "" : `${Emojis.Error} Error!`,
                description: `${simple ? `${Emojis.Error} ` : ""}${message}`,
                color: Colours.Error,
            },
        ];

        this.ephemeral = ephemeral;
    }
}


export class SuccessMessage {
    embeds: [APIEmbed];
    ephemeral = false;
    simple = true;
    /**
     * @param {string} message The message to display in the embed.
     */
    constructor(message: string, ephemeral = false, simple = true) {
        this.embeds = [
            {
                title: simple ? "" : `${Emojis.Success} Error!`,
                description: `${simple ? `${Emojis.Success} ` : ""}${message}`,
                color: Colours.Success,
            },
        ];

        this.ephemeral = ephemeral;
    }
}
