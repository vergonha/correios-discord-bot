import { EmbedBuilder } from "@discordjs/builders";

export default function errorEmbed(message: string): EmbedBuilder{
    return new EmbedBuilder({
        "title": `🙅 Houve um problema na sua busca!`,
        "description": `**O que houve?**\nR: ${message}`,
        "color": 0xf57f7f,
        "image": {
          "url": `https://media.tenor.com/HseHXaJz2OAAAAAM/sad-cry.gif`,
          "height": 0,
          "width": 0
        }
      })
}