import { ApplicationCommandOptionType, CommandInteraction } from "discord.js";
import { Discord, Slash, SlashOption } from "discordx";
import trackEmbed from "../embeds/track/track.js";
import errorEmbed from "../embeds/track/error.js";
import Magalu from "../utils/Magalu.js";

@Discord()
export class Rastrear {
    @Slash({ name: "rastrear", description: "Rastreia sua encomenda pelo código de rastreio!"})
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
        await interaction.deferReply({ ephemeral: true })

        const instance = new Magalu()
        const request = await instance.track(codigo)

        if(typeof request == "string") {
            return await interaction.followUp({ embeds: [errorEmbed(request)] })
        }

        return await interaction.followUp({ embeds: [trackEmbed(request, "Rastreio Anônimo")] })
    }
}
