import "reflect-metadata"

import { Events, IntentsBitField } from "discord.js";
import { Client, DIService, tsyringeDependencyRegistryEngine } from "discordx";
import connection from "./database/connection";
import logger from "./logger";
import updates from "./routine/sendUpdates";
import { importx } from "@discordx/importer";
import { dirname } from "path";
import { container } from "tsyringe";
import { fileURLToPath } from "url";

DIService.engine = tsyringeDependencyRegistryEngine.setInjector(container);

export class Main {
    private static client: Client;

    static async start(): Promise<void> {
        Main.client = new Client({
            intents: [
                IntentsBitField.Flags.Guilds,
                IntentsBitField.Flags.GuildMembers,
                IntentsBitField.Flags.GuildMessages,
            ],
            silent: !!process.env.DISCORDX_SILENT
        })

        Main.client.once(Events.ClientReady, () => {

            if (!!process.env.DISCORDX_CLEAR) {
                logger.info("limpando application commands... 🌸");
                Main.client.clearApplicationCommands(
                    ...Main.client.guilds.cache.map((guild) => guild.id)
                );
            }

            void Main.client.initApplicationCommands();

            connection();
            logger.info("everyday i imagine a future where i can be with you 🌸");

            // Function to send package updates every 5 minutes.
            setInterval(
                async () => {
                    updates(Main.client);
                },
                2 * 60 * 1000 /* 5 x 60 seconds x 1000 ms == 5 minutes */,
            );
        })

        Main.client.on(Events.InteractionCreate, (interaction) => {
            Main.client.executeInteraction(interaction);
        })

        const __dirname = dirname(fileURLToPath(import.meta.url));
        await importx(`${__dirname}/commands/**/*.{js,ts}`);

        if (!process.env.DISCORD_TOKEN) {
            logger.error("Token do Discord Bot não encontrado.");
            throw Error(
                "Não foi possível encontrar o Token do Discord Bot no seu arquivo .env.",
            );
        }

        if (!process.env.SHOPEE_COOKIE) {
            logger.error(
                "Cookie da Shopee não encontrado, encomendas desse tipo não serão rastreadas.",
            );
        }

        if (!process.env.NTFY_SLUG) {
            logger.info(
                "📱Endereço do Ntfy não encontrado no .env. Notificações push não serão habilitadas.",
            );
        }

        await Main.client.login(process.env.DISCORD_TOKEN);
    }
}

void Main.start()