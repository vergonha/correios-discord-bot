import { EmbedBuilder } from "@discordjs/builders";
import { iRastreio } from "../../utils/interfaces";

export default function trackEmbed(rastreio: iRastreio, name: string): EmbedBuilder{

    const {
        data,
        hora,
        local,
        status,
        subStatus
    } = rastreio.eventos[0]



    const evento =  {
        "name": `Evento:`,
        "value": `**Data**: ${data}\n**Horário**: ${hora}\n**Local**: ${local}\n**Status**: ${status}\n**Origem**: ${subStatus[0] || "Não há."}\n**Destino**: ${subStatus[1] || "Não há."}`
    }

    return new EmbedBuilder({
        "title": `Resultado da Busca 🔎`,
        "description": `\n**Código**  🚚 : ${rastreio.codigo}\n**Nome** 🏷️ : ${name}`,
        "color": 0xff9100,
        "fields": [evento],
        "image": {
            "url": `https://mundoconectado.com.br/uploads/chamadas/correios_5.jpg`,
            "height": 640,
            "width": 252
          }
      })
}
