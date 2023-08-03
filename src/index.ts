import * as dotenv from 'dotenv';
import { Client, Collection, GatewayIntentBits } from 'discord.js';
import { join } from 'path';
import { readdirSync } from 'fs';
import { SlashCommand } from '../types';

dotenv.config();

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.DirectMessages
    ]
});

client.slashCommands = new Collection<string, SlashCommand>();

const handlersDir = join(__dirname, "./handlers");

readdirSync(handlersDir).forEach(handler => {
    require(`${handlersDir}/${handler}`)(client);
});

client.login(process.env.DISCORD_BOT_TOKEN);
