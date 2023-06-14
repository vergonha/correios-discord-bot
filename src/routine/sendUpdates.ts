import { ChannelType, Client } from "discord.js";
import chatUpdates from "./chatUpdates.js";
import logger from "../logger.js";

export default async function updates(bot: Client) {
    const guilds = await bot.guilds.fetch();
    guilds.map(async guild => {
        const id = guild.id
        // Target == Complete guild object
        const target = await bot.guilds.fetch(id)

        if(!process.env.UPDATES_CHANNEL){
            logger.error("O ID do canal para enviar atualizações do rastreio não foi encontrado. A função será desabilitada.")
            return
        }

        try {
            const channel = await target.channels.fetch(process.env.UPDATES_CHANNEL)
            if ( channel && channel.type == ChannelType.GuildText ) {
                // Routine main function in here
                await chatUpdates(bot, channel)
            } else {
                logger.error("Não consegui encontrar o canal com o ID informado. A função de atualização automática será desabilitada.")
                logger.error("Certifique-se de que o grupo está devidamente cacheado.")
                return
            }
        } catch (e) {

            if((e as Error).name == 'Error [GuildChannelUnowned]') {
                return
            }

            logger.error("Houve um erro ao tentar encontrar as informações do canal de atualizações.")
            logger.error(e)
            return
        }



    })

}
