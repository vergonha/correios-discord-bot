import { ApplicationCommandOptionType, CommandInteraction } from "discord.js";
import { Discord, Slash, SlashOption } from "discordx";
import CorreiosDB from "../database/operations.js";
import errorEmbed from "../embeds/track/error.js";
import LinkETrack from "../utils/LinkETrack.js";
import logger from "../logger.js";
import successEmbed from "../embeds/register/success.js";
import alreadyRegisteredEmbed from "../embeds/register/alreadyRegistered.js";

@Discord()
export class Rastrear {
    @Slash({ name: "registrar", description: "Registra o seu código de rastreio no banco de dados!"})
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

            // Checks if track code has already been registered
            const duplicate = user?.codigos.some( _ => _.codigo === codigo)
            if(duplicate == true) { return await interaction.followUp({embeds: [alreadyRegisteredEmbed()]}) }


            const instance = new LinkETrack()
            const request = await instance.track(codigo)

            if(typeof request == "string") {
                return await interaction.followUp({ embeds: [errorEmbed(request)] })
            }

            const lastEvent = request.eventos[0]
            const time = `${lastEvent.data} ${lastEvent.hora}`


            user
                ? await CorreiosDB.append(userID, nome, codigo, time)
                : await CorreiosDB.create(userID, nome, codigo, time)

            return await interaction.followUp({embeds: [successEmbed()]})
        } catch (error) {
            logger.error(error)
        }
    }
}
