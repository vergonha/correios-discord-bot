import { ApplicationCommandOptionType, CommandInteraction } from "discord.js";
import { Discord, Slash, SlashOption } from "discordx";
import trackEmbed from "../embeds/track.js";
import LinkETrack from "../utils/LinkETrack.js";

@Discord()
export class Rastrear {
  @Slash({ name: "rastrear", description: "Rastreia sua encomenda pelo código de rastreio!", guilds: ["1008476986320109711"] })
  async rastrear(
    @SlashOption({
        description: "Código de rastreio da encomenda: ",
        name: "codigo",
        required: true,
        type: ApplicationCommandOptionType.String,
    })
    codigo: string,
    interaction: CommandInteraction
  ){
    const instance = new LinkETrack()
    const request = await instance.track(codigo)
    await interaction.reply({embeds: [trackEmbed(request)]})
  }
}
