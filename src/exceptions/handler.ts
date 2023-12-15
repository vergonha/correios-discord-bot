import { CacheType, CommandInteraction, StringSelectMenuInteraction } from "discord.js";
import errorEmbed from "../embeds/track/error.js";
import logger from "../logger.js";
import PacoteInvalidoException from "./PacoteInvalidoException.js";
import ServicoIndisponivelException from "./ServicoIndisponivelException.js";

async function handleExceptions(error: unknown, interaction: CommandInteraction<CacheType> | StringSelectMenuInteraction<CacheType>) {
    if (error instanceof PacoteInvalidoException || error instanceof ServicoIndisponivelException)
        return await interaction.followUp({ embeds: [errorEmbed(error.message)] })

    await interaction.followUp({ embeds: [errorEmbed("Ocorreu um erro inesperado.")] })
    logger.error(error)
}

export { handleExceptions };
