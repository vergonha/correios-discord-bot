import { Client, TextChannel } from "discord.js";
import LinkETrack from "../utils/LinkETrack.js";
import CorreiosDB from "../database/operations.js";
import connection from "../database/connection.js";


export default async function trackCodes(bot: Client, channel: TextChannel) {
    const users = await CorreiosDB.all()
    users.map(async user => {
        const instance = new LinkETrack()
        const { id, codigos } = user
        codigos.map( async product => {
            const request = await instance.track(product.codigo)

            if(typeof request == "string") {
                return console.log("Houve um erro ao rastrear o código " + product.codigo)
            }

            const { data, hora } = request.eventos[0]
            const time = `${data} ${hora}`

            if (time != product.ultimaAtualizacao) {
                await CorreiosDB.update(id, product.nome, product.codigo, time)
                console.log("Houve mudança no pacote " + product.codigo)
                try {
                    await channel.send("teve chimia na equação " + product.codigo)
                } catch (error) {
                    console.log(error)
                }
            }
        })

    })

}
