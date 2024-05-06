import { ActionRow, ActionRowBuilder, ApplicationCommandOptionType, BaseSelectMenuBuilder, CommandInteraction, StringSelectMenuBuilder } from "discord.js";
import { Discord, Slash, SlashOption } from "discordx";
import { handleExceptions } from "../exceptions/handler.js";
import { injectable } from "tsyringe";
import trackEmbed from "../embeds/track/track.js";
import RastreioProvider from "../services/Provider.js";
import recordsEmbed from "../components/records.js";

@Discord()
@injectable()
export class Rastrear {

    private readonly _service: RastreioProvider
    
    constructor(service: RastreioProvider) {
        this._service = service
    }


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
            const request = await this._service.track(codigo)


            return await interaction.followUp({ embeds: [trackEmbed(request, "Rastreio Anônimo")], components: [new ActionRowBuilder<StringSelectMenuBuilder>({
                components: [recordsEmbed(request, "Rastreio Anônimo").toJSON()]
            })] })
        } catch (error) {
            return handleExceptions(error, interaction)
        }
    }
}
