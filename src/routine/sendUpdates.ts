import { ChannelType, Client } from "discord.js";
import trackCodes from "./trackCodes.js";


export default async function updates(bot: Client) {
    console.log("+1")
    const guilds = await bot.guilds.fetch();
    guilds.map(async guild => {
        const id = guild.id
        // Target == Complete guild object
        const target = await bot.guilds.fetch(id)

        if(!process.env.UPDATES_CHANNEL){
            console.log("O ID do canal para enviar atualizações do rastreio não foi encontrado. A função será desabilitada.")
            return
        }

        try {
            const channel = await target.channels.fetch(process.env.UPDATES_CHANNEL)
            if ( channel && channel.type == ChannelType.GuildText ) {
                // Routine main function in here
                return await trackCodes(bot, channel)
            } else {
                console.log("Não consegui encontrar o canal com o ID informado. A função de atualização automática será desabilitada.")
                console.log("Certifique-se de que o grupo está devidamente cacheado.")
                return
            }
        } catch (e) {

            if((e as Error).name == 'Error [GuildChannelUnowned]') {
                return
            }

            console.log("Houve um erro ao tentar encontrar as informações do canal de atualizações.")
            console.log(e)
            return
        }
        

        
    })

}