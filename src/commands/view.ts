import { ActionRowBuilder, CommandInteraction, MessageActionRowComponentBuilder, StringSelectMenuBuilder, StringSelectMenuInteraction } from "discord.js";
import { Discord, SelectMenuComponent, Slash } from "discordx";
import { handleExceptions } from "../exceptions/handler.js";
import { injectable } from "tsyringe"
import trackEmbed from "../embeds/track/track.js";
import getCodes from "../utils/getCodes.js";
import RastreioProvider from "../services/Provider.js";

@Discord()
@injectable()
export class View {

    private readonly _service: RastreioProvider
    
    constructor(service: RastreioProvider) {
        this._service = service
    }

    @SelectMenuComponent({ id: "view-menu" })
    async handle(interaction: StringSelectMenuInteraction): Promise<unknown> {
        await interaction.deferReply({ ephemeral: true });

        const roleValue = interaction.values?.[0];

        if (!roleValue) {
            return interaction.followUp("Código inválido!");
        }


        try {
            const request = await this._service.track(roleValue)
            return await interaction.followUp({ embeds: [trackEmbed(request, "Rastreio Próprio")] })
        } catch (error) {
            return handleExceptions(error, interaction)
        }
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
