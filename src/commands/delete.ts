import { ActionRowBuilder, CommandInteraction, MessageActionRowComponentBuilder, StringSelectMenuBuilder, StringSelectMenuInteraction } from "discord.js";
import { Discord, SelectMenuComponent, Slash } from "discordx";
import getCodes from "../utils/getCodes.js";
import CorreiosDB from "../database/operations.js";

@Discord()
export class Delete {
    @SelectMenuComponent({ id: "delete-menu" })
    async handle(interaction: StringSelectMenuInteraction): Promise < unknown > {
        await interaction.deferReply({ ephemeral: true });

        const roleValue = interaction.values?.[0];

        if(!roleValue) {
            return interaction.followUp("Código inválido!");
        }

        await CorreiosDB.delete(interaction.user.id, roleValue)
        return await interaction.followUp("Código deletado com sucesso!")
    }

    @Slash({ description: "Deleta um código do banco de dados", name:"excluir" })
    async myCodes(interaction: CommandInteraction): Promise < unknown > {
        await interaction.deferReply({ ephemeral: true });
        const roles = await getCodes(interaction.user.id)

        if(!roles) {
            return interaction.followUp("Você näo tem códigos registrados!")
        }

        const menu = new StringSelectMenuBuilder()
            .addOptions(roles)
            .setCustomId("delete-menu");

        const buttonRow =
            new ActionRowBuilder < MessageActionRowComponentBuilder > ().addComponents(
                menu
            );

        interaction.editReply({
            components: [buttonRow],
            content: "Selecione o pacote para deletar!",
        });
        return;
    }
}
