import { EmbedBuilder } from "@discordjs/builders";
import { iRastreio } from "../../utils/interfaces";

export default function trackEmbed(rastreio: iRastreio, name: string): EmbedBuilder {


    const {
        data,
        hora,
        local,
        status,
        subStatus
    } = rastreio.eventos[0]

    const fields = [
        {
            "name": "Status ⋆｡ﾟ",
            "value": `\`${status}\``,
            "inline": false
        },

    ]

    const complemento = subStatus ? fields.push({
        "name": "Origem ᯓᡣ𐭩",
        "value": `\`${subStatus[0]}\``,
        "inline": true
    },
        {
            "name": "✧˖ ° Destino ",
            "value": `\`${subStatus[1]}\``,
            "inline": true
        }) : undefined

    const localidade = local ? fields.push({
        "name": "Local ✮⋆˙",
        "value": `\`${local}\``,
        "inline": false
    }) : undefined


    return new EmbedBuilder({
        "fields": fields,
        "image": {
            "url": "https://i.pinimg.com/originals/8d/79/b0/8d79b04aa91c187f1ca6743fb0935b3c.gif"
        },
        "author": {
            "name": "⋆.˚ ᡣ𐭩 .𖥔˚ Atualização no Pacote! 🔎"
        },
        "title": `🎁:  ${name} 🏷️: ||${rastreio.codigo}||`,
        "footer": {
            "text": `Atualização • ${data} ${hora}`
        },
        "color": 14925180
    })
}
