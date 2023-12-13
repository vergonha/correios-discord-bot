import { Client, TextChannel } from "discord.js";
import Magalu from "../utils/Magalu.js";
import CorreiosDB from "../database/operations.js";
import trackEmbed from "../embeds/track/track.js";
import logger from "../logger.js";

// This function maps all users registered in the database and tracks the registered codes.
export default async function chatUpdates(bot: Client, channel: TextChannel) {
    const users = await CorreiosDB.all()
    users.map(async user => {
        const instance = new Magalu()
        // Get the ID and the object of Codes for each user
        const { id, codigos } = user
        codigos.map( async product => {
            const request = await instance.track(product.codigo)

            if(typeof request == "string") {

                // While the API is unstable, this line will be commented.
                // logger.error("Houve um erro ao rastrear o código " + product.codigo)
                return
            }

            const { data, hora } = request.eventos[0]
            const time = `${data} ${hora}`

            // If the API has a different time from the database, then there is an update
            if (time != product.ultimaAtualizacao) {
                // Updates the database with the new time
                await CorreiosDB.update(id, product.nome, product.codigo, time)

                try {
                    await channel.send({embeds: [trackEmbed(request, product.nome)], content: "Atualização no pacote!"})
                } catch (error) {
                    logger.error(error)
                }

            }
        })

    })

}
