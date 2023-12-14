import { CacheType, CommandInteraction, StringSelectMenuInteraction } from "discord.js";
import errorEmbed from "../embeds/track/error";
import logger from "../logger";
import PacoteInvalidoException from "./PacoteInvalidoException";
import ServicoIndisponivelException from "./ServicoIndisponivelException";

async function handleExceptions(error: unknown, interaction: CommandInteraction<CacheType> | StringSelectMenuInteraction<CacheType>) {
    if (error instanceof PacoteInvalidoException || error instanceof ServicoIndisponivelException)
        return await interaction.followUp({ embeds: [errorEmbed(error.message)] })

    await interaction.followUp({ embeds: [errorEmbed("Ocorreu um erro inesperado.")] })
    logger.error(error)
}

export { handleExceptions };
