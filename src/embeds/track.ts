import { EmbedBuilder } from "@discordjs/builders";
import { iRastreio } from "../utils/interfaces";

export default function trackEmbed(rastreio: iRastreio): EmbedBuilder{

    const eventos = rastreio.eventos.slice(0, 2).map( evento => {

        const {
            data,
            hora,
            local,
            status,
            subStatus
        } = evento

        

        return {
            "name": `Evento:`,
            "value": `  **Data**: ${data}
                        **Horário**: ${hora}
                        **Local**: ${local}
                        **Status**: ${status}
                        **Origem**: ${subStatus[0] || "Não há."}
                        **Destino**: ${subStatus[1] || "Não há."}`
        }
    })

    return new EmbedBuilder({
        "title": `Resultado da Busca 🔎`,
        "description": `\n**Código**  🚚 : ${rastreio.codigo}\n`,
        "color": 0xff9100,
        "fields": eventos
      })
}