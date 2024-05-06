import { SelectMenuOptionBuilder } from "@discordjs/builders";
import { iRastreio } from "../utils/interfaces";
import { StringSelectMenuBuilder } from "discord.js";

export default function recordsEmbed(rastreio: iRastreio, name: string): StringSelectMenuBuilder {
    const labels = rastreio.eventos.map((evento, index) => {
        return {
            "label": `${evento.status}`,
            "value": index.toString(),
            "description": `${evento.data} ${evento.hora}`
        }
    })

    const select = new StringSelectMenuBuilder().setPlaceholder("˚˖𓍢ִ໋ Histórico do Pedido ").addOptions(labels).setCustomId(".")
    return select
}