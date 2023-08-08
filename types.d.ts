import { Collection, CommandInteraction, Message, PermissionResolvable, SlashCommandBuilder, SlashCommandSubcommandBuilder } from "discord.js"

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            DISCORD_APPLICATION_ID: string
            DISCORD_BOT_TOKEN: string
        }
    }
}

declare module "discord.js" {
    export interface Client {
        slashCommands: Collection<string, SlashCommand>
    }
}

// ! TYPES !-------------------------------------------------------------------

export type BotEvent = {
    name: string;
    once?: boolean | false;
    async execute: (...args?) => Promise<unknown>;
}

export type SlashCommand = {
    name: string;
    data:
    | SlashCommandBuilder
    | SlashCommandSubcommandsOnlyBuilder
    | Omit<SlashCommandBuilder, "addSubcommand" | "addSubcommandGroup">;
    description?: string;
    usage?: string[];
    examples?: string[];
    async execute(
        interaction: ChatInputCommandInteraction,
        client: BotClient,
    ): Promise<unknown>;
}

export type Button = {
    execute(interaction: ButtonInteraction, client: BotClient): Promise<unknown>;
};

export type Modal = {
    execute(
        interaction: ModalSubmitInteraction,
        client: BotClient,
    ): Promise<unknown>;
};

export type SelectMenu = {
    execute(
        interaction: StringSelectMenuInteraction,
        client: BotClient,
    ): Promise<unknown>;
};

/**
 * A type for the bot client. Extends the default `discord.js` `client` type with the methods and properties used in this code.
 */
export type BotClient = Client & {
    /*
     * The client user, this variable is equal to `undefined` if the client hasn't logged in yet.
     */
    user: ClientUser;
    commands: Collection<string, AnyCommand>;
    commandArray: (
        | SlashCommandBuilder
        | ContextMenuCommandBuilder
        | SlashCommandSubcommandsOnlyBuilder
        | Omit<SlashCommandBuilder, "addSubcommand" | "addSubcommandGroup">
    )[];
    buttons: Collection<string, Button>;
    selectMenus: Collection<string, SelectMenu>;
    modals: Collection<string, Modal>;
    handleEvents(): Promise<void>;
    handleCommands(): Promise<void>;
    handleComponents(): Promise<void>;
    handleFonts(): Promise<void>;
    checkTemporaryData(): Promise<void>;
    checkUploads(): Promise<void>;
    updateStatisticsChannels(): Promise<void>;
    onlineTimestamp: number;
};

/**
 * Type for autocomplete commands. This basically extends base command type & adds an autocompletion function.
 */
export type AutoCompleteCommand = {
    data:
    | SlashCommandBuilder
    | SlashCommandSubcommandsOnlyBuilder
    | Omit<SlashCommandBuilder, "addSubcommand" | "addSubcommandGroup">;
    description?: string;
    usage?: string[];
    examples?: string[];
    autocomplete(
        interaction: AutocompleteInteraction,
        client: BotClient,
    ): Promise<unknown>;
    execute(
        interaction: ChatInputCommandInteraction,
        client: BotClient,
    ): Promise<unknown>;
};

export type MessageContextMenuCommand = {
    data: ContextMenuCommandBuilder;
    description: string;
    usage?: string[];
    execute(
        interaction: MessageContextMenuCommandInteraction,
        client: BotClient,
    ): Promise<unknown>;
};

export type UserContextMenuCommand = {
    data: ContextMenuCommandBuilder;
    description: string;
    usage?: string[];
    execute(
        interaction: UserContextMenuCommandInteraction,
        client: BotClient,
    ): Promise<unknown>;
};

/**
 * This type has to be declared fully or else TypeScript will complain.
 */
export type AnyContextMenuCommand = {
    data: ContextMenuCommandBuilder;
    description: string;
    usage?: string[];
    execute(
        interaction:
            | MessageContextMenuCommandInteraction
            | UserContextMenuCommandInteraction,
        client: BotClient,
    ): Promise<unknown>;
};

export type AnyCommand = Command | AutoCompleteCommand | AnyContextMenuCommand;

// ! CONSTANTS !-----------------------------------------------------------------

declare const ALLOWED_EXTENSIONS: readonly ["webp", "png", "jpg", "jpeg", "gif"];
