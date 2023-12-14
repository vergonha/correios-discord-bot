import { ApplicationCommandOptionType, CommandInteraction } from "discord.js";
import { Discord, Slash, SlashOption } from "discordx";
import { handleExceptions } from "../exceptions/handler.js";
import trackEmbed from "../embeds/track/track.js";
import errorEmbed from "../embeds/track/error.js";
import Magalu from "../utils/Magalu.js";
import PacoteInvalidoException from "../exceptions/PacoteInvalidoException.js";
import ServicoIndisponivelException from "../exceptions/ServicoIndisponivelException.js";
import logger from "../logger.js";

@Discord()
export class Rastrear {
    @Slash({ name: "rastrear", description: "Rastreia sua encomenda pelo código de rastreio!" })
    async rastrear(
        @SlashOption({
            description: "Código de rastreio da encomenda: ",
            name: "codigo",
            required: true,
            type: ApplicationCommandOptionType.String,
        })

        codigo: string,
        interaction: CommandInteraction
    ) {
        try {
            await interaction.deferReply({ ephemeral: true })

            const instance = new Magalu()
            const request = await instance.track(codigo)


            return await interaction.followUp({ embeds: [trackEmbed(request, "Rastreio Anônimo")] })
        } catch (error) {
            return handleExceptions(error, interaction)
        }
    }
}
