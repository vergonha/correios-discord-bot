import { ApplicationCommandOptionType, CommandInteraction } from "discord.js";
import { Discord, Slash, SlashOption } from "discordx";
import CorreiosDB from "../database/operations.js";

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
            const userID = interaction.user.id
            const user = await CorreiosDB.search(userID)
            user
                ? await CorreiosDB.update(userID, nome, codigo)
                : await CorreiosDB.create(userID, nome, codigo)

            await interaction.reply("sucessp")
        } catch (error) {
            console.log(error)
        }
    }
}