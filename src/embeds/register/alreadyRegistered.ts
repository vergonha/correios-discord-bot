import { EmbedBuilder } from "@discordjs/builders";

export default function alreadyRegisteredEmbed(): EmbedBuilder{

    return new EmbedBuilder(
      {
        "title": `Pera aí... ₍ ᐢ.ˬ.ᐢ₎˚୨୧`,
        "description": `⭒❃.✮:▹ Você já tem esse código cadastrado no seu usuário. `,
        "color": 0xeb8a4d,
        "image": {
          "url": `https://thumbs.gfycat.com/ClearcutNastyAmazondolphin-max-1mb.gif`,
          "height": 0,
          "width": 0
        }
      }
    )
}
