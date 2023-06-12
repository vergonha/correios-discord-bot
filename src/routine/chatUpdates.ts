import { Client, TextChannel } from "discord.js";
import LinkETrack from "../utils/LinkETrack.js";
import CorreiosDB from "../database/operations.js";


// Essa função mapeia todos os usuários registrados na database e rastreia os códigos registrados.
export default async function chatUpdates(bot: Client, channel: TextChannel) {
    const users = await CorreiosDB.all()
    users.map(async user => {
        const instance = new LinkETrack()
        // Pega o ID e o objeto de Códigos para cada usuário
        const { id, codigos } = user
        // Para cada código registrado, realiza a busca:
        codigos.map( async product => {
            const request = await instance.track(product.codigo)

            if(typeof request == "string") {
                return console.log("Houve um erro ao rastrear o código " + product.codigo)
            }

            const { data, hora } = request.eventos[0]
            const time = `${data} ${hora}`

            // Leia: se o horário na API for diferente do horário da database, então há atualização
            if (time != product.ultimaAtualizacao) {
                // Atualiza na database para o horário novo
                await CorreiosDB.update(id, product.nome, product.codigo, time)

                try {
                    await channel.send("Houve atualização no pacote " + product.codigo)
                } catch (error) {
                    console.log(error)
                }

            }
        })

    })

}
