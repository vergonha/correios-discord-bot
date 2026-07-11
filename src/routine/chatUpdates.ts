import {
  ActionRowBuilder,
  Client,
  StringSelectMenuBuilder,
  TextChannel,
} from "discord.js";
import logger from "../logger.js";
import CorreiosDB from "../database/operations.js";
import trackEmbed from "../embeds/track/track.js";
import RastreioProvider from "../services/Provider.js";
import recordsEmbed from "../components/records.js";
import pushUpdates from "./pushUpdates.js";

export default async function chatUpdates(bot: Client, channel: TextChannel) {
  let users;
  try {
    users = await CorreiosDB.all();
    if (!users || users.length === 0) return;
  } catch (error) {
    logger.error("[DB ERROR] Falha ao buscar usuários:", error);
    return;
  }

  for (const user of users) {
    const { id, codigos } = user;
    const instance = new RastreioProvider();

    for (const product of codigos) {
      let request;
      try {
        request = await instance.track(product.codigo);
      } catch (error) {
        logger.error(`[API ERROR] Falha ao rastrear ${product.codigo}:`, error);
        continue;
      }

      const { data, hora } = request.eventos[0];
      const time = `${data} ${hora}`;

      if (time === product.ultimaAtualizacao) continue;

      try {
        const safeId = String(id).trim();
        const safeCode = String(product.codigo).trim();

        const [affectedRows] = await CorreiosDB.update(safeId, product.nome, safeCode, time);

        if (affectedRows === 0) {
          logger.error(`[DB WARNING] Update não encontrou: ID="${safeId}", Codigo="${safeCode}"`);
          continue;
        }
      } catch (error) {
        logger.error(`[DB ERROR] Falha ao atualizar ${product.codigo}:`, error);
        continue;
      }

      try {
        await channel.send({
          embeds: [trackEmbed(request, product.nome)],
          content: "Atualização no pacote!",
          components: [
            new ActionRowBuilder<StringSelectMenuBuilder>({
              components: [
                recordsEmbed(request, "Rastreio Anônimo").toJSON(),
              ],
            }),
          ],
        });
      } catch (error) {
        logger.error(`[DISCORD ERROR] Falha ao enviar mensagem para ${product.codigo}:`, error);
      }

      try {
        await pushUpdates(
          "Atualização no pacote!",
          "Um pacote teve uma nova atualização no rastreio.",
        );
      } catch (error) {
        logger.error(`[PUSH ERROR] Falha no pushUpdates para ${product.codigo}:`, error);
      }
    }
  }
}