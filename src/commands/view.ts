import { ActionRowBuilder, CommandInteraction, MessageActionRowComponentBuilder, StringSelectMenuBuilder, StringSelectMenuInteraction } from "discord.js";
import { Discord, SelectMenuComponent, Slash } from "discordx";
import CorreiosDB from "../database/operations.js";
import Magalu from "../utils/Magalu.js";
import trackEmbed from "../embeds/track/track.js";
import errorEmbed from "../embeds/track/error.js";
import getCodes from "../utils/getCodes.js";

@Discord()
export class View {

    @SelectMenuComponent({ id: "view-menu" })
    async handle(interaction: StringSelectMenuInteraction): Promise<unknown> {
        await interaction.deferReply({ ephemeral: true });

        const roleValue = interaction.values?.[0];

        if (!roleValue) {
            return interaction.followUp("Código inválido!");
        }

       
        const instance = new Magalu()
        const request = await instance.track(roleValue)
        
        if(typeof request == "string") {
            return await interaction.followUp({ embeds: [errorEmbed(request)] })
        }

        return await interaction.followUp({ embeds: [trackEmbed(request, "Rastreio Próprio")] })
    }

    @Slash({ description: "Rastreia um código já salvo no banco de dados.", name: "visualizar" })
    async myCodes(interaction: CommandInteraction): Promise<unknown> {
        await interaction.deferReply({ ephemeral: true });
        const roles = await getCodes(interaction.user.id)

        if (!roles) {
            return interaction.followUp("Você näo tem códigos registrados!")
        }

        const menu = new StringSelectMenuBuilder()
            .addOptions(roles)
            .setCustomId("view-menu");

        const buttonRow =
            new ActionRowBuilder<MessageActionRowComponentBuilder>().addComponents(
                menu
            );

        interaction.editReply({
            components: [buttonRow],
            content: "Selecione o pacote para rastrear!",
        });
        return;
    }
}
