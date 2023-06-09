import { ApplicationCommandOptionType, CommandInteraction } from "discord.js";
import { Discord, Slash, SlashOption } from "discordx";
import CorreiosDB from "../database/operations.js";
import errorEmbed from "../embeds/track/error.js";
import LinkETrack from "../utils/LinkETrack.js";

@Discord()
export class Rastrear {
    @Slash({ name: "registrar", description: "Registra o seu código de rastreio no banco de dados!", guilds: ["1008476986320109711"] })
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
            await interaction.deferReply({ephemeral: true})

            const userID = interaction.user.id
            const user = await CorreiosDB.search(userID)

            const instance = new LinkETrack()
            const request = await instance.track(codigo)

            if(typeof request == "string") {
                return await interaction.followUp({ embeds: [errorEmbed(request)] })
            }

            const lastEvent = request.eventos[0]
            const time = `${lastEvent.data} ${lastEvent.hora}`


            user
                ? await CorreiosDB.update(userID, nome, codigo, time)
                : await CorreiosDB.create(userID, nome, codigo, time)

            return await interaction.followUp("vai da tdcerto")
        } catch (error) {
            console.log(error)
        }
    }
}