import { dirname, importx } from "@discordx/importer";
import { ChannelType, GuildChannel, Interaction, Message } from "discord.js";
import { IntentsBitField } from "discord.js";
import { Client, Guild } from "discordx";
import logger from "./logger.js";
import connection from "./database/connection.js";
import dotenv from 'dotenv'
import updates from "./routine/sendUpdates.js";

dotenv.config()

export const bot = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
    ],
    silent: true,

    simpleCommand: {
        prefix: "!",
    },
});


bot.once("ready", async () => {


    // Make sure all guilds are cached
    // await bot.guilds.fetch();

    // Synchronize applications commands with Discord
    await bot.initApplicationCommands();

    connection()
    logger.info("everyday i imagine a future where i can be with you 🌸");

    // Function to send package updates every 5 minutes.
    setInterval(async () => {updates(bot)}, 2 * 60 * 1000 /* 5 x 60 seconds x 1000 ms == 5 minutes */ )
});

bot.on("interactionCreate", (interaction: Interaction) => {
    bot.executeInteraction(interaction);
});

bot.on("messageCreate", (message: Message) => {
    bot.executeCommand(message);
});

async function run() {
    await importx(`${dirname(import.meta.url)}/{events,commands}/**/*.{ts,js}`);
    
    if(!process.env.DISCORD_TOKEN) {
        logger.error("Token do Discord Bot não encontrado.")
        throw Error("Não foi possível encontrar o Token do Discord Bot no seu arquivo .env.");
    }

    await bot.login(process.env.DISCORD_TOKEN);
}

run();
