import { ChannelType, Client, TextChannel } from "discord.js";
import chatUpdates from "./chatUpdates.js";
import logger from "../logger.js";

export default async function updates(bot: Client) {

    const channelId = process.env.UPDATES_CHANNEL;

    if (!channelId) {
        logger.error(
            "O ID do canal para enviar atualizações do rastreio não foi encontrado."
        );
        return;
    }

    try {
        const fetchedChannel = await bot.channels.fetch(channelId);
        if (!fetchedChannel) {
            logger.error("Não consegui encontrar o canal informado.");
            return;
        }

        if (fetchedChannel.type !== ChannelType.GuildText) {
            logger.error(
                "O canal informado não é um canal de texto válido."
            );
            return;
        }

        const channel = fetchedChannel as TextChannel;

        await chatUpdates(bot, channel);

    } catch (e) {
        logger.error(
            "Houve um erro ao tentar encontrar as informações do canal de atualizações."
        );
        logger.error(e);
    }
}