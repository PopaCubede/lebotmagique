"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SuccessMessage = exports.ErrorMessage = void 0;
const enums_1 = require("../assets/enums");
class ErrorMessage {
    embeds;
    ephemeral = false;
    simple = true;
    /**
     * @param {string} message The message to display in the embed.
     */
    constructor(message, ephemeral = false, simple = true) {
        this.embeds = [
            {
                title: simple ? "" : `${enums_1.Emojis.Error} Error!`,
                description: `${simple ? `${enums_1.Emojis.Error} ` : ""}${message}`,
                color: enums_1.Colours.Error,
            },
        ];
        this.ephemeral = ephemeral;
    }
}
exports.ErrorMessage = ErrorMessage;
class SuccessMessage {
    embeds;
    ephemeral = false;
    simple = true;
    /**
     * @param {string} message The message to display in the embed.
     */
    constructor(message, ephemeral = false, simple = true) {
        this.embeds = [
            {
                title: simple ? "" : `${enums_1.Emojis.Success} Error!`,
                description: `${simple ? `${enums_1.Emojis.Success} ` : ""}${message}`,
                color: enums_1.Colours.Success,
            },
        ];
        this.ephemeral = ephemeral;
    }
}
exports.SuccessMessage = SuccessMessage;
