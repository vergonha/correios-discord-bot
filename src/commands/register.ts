import { ApplicationCommandOptionType, CommandInteraction } from "discord.js";
import { Discord, Slash, SlashOption } from "discordx";
import CorreiosDB from "../database/operations.js";
import { handleExceptions } from "../exceptions/handler.js";
import { injectable } from "tsyringe";
import successEmbed from "../embeds/register/success.js";
import alreadyRegisteredEmbed from "../embeds/register/alreadyRegistered.js";
import RastreioProvider from "../services/Provider.js";


@Discord()
@injectable()
export class Rastrear {
    private readonly _service: RastreioProvider
    
    constructor(service: RastreioProvider) {
        this._service = service
    }

    @Slash({ name: "registrar", description: "Registra o seu código de rastreio no banco de dados!" })
    async rastrear(
        @SlashOption({
            description: "Código de rastreio da encomenda: ",
            name: "codigo",
            required: true,
            type: ApplicationCommandOptionType.String,
        }) @SlashOption({
            description: "Nome do produto: ",
            name: "nome",
            required: true,
            type: ApplicationCommandOptionType.String,
        })

        codigo: string,
        nome: string,
        interaction: CommandInteraction
    ) {
        try {
            await interaction.deferReply({ ephemeral: true })

            const userID = interaction.user.id
            const user = await CorreiosDB.search(userID)

            // Checks if track code has already been registered
            const duplicate = user?.codigos.some(_ => _.codigo === codigo)
            if (duplicate == true) { return await interaction.followUp({ embeds: [alreadyRegisteredEmbed()] }) }


            const request = await this._service.track(codigo)

            const lastEvent = request.eventos[0]
            const time = `${lastEvent.data} ${lastEvent.hora}`


            user
                ? await CorreiosDB.append(userID, nome, codigo, time)
                : await CorreiosDB.create(userID, nome, codigo, time)

            return await interaction.followUp({ embeds: [successEmbed()] })
        } catch (error) {
            return handleExceptions(error, interaction)
        }
    }
}
