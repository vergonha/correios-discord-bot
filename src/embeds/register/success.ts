import { EmbedBuilder } from "@discordjs/builders";

export default function successEmbed(): EmbedBuilder{

    const updateChannel = process.env.UPDATES_CHANNEL ?  `<#${process.env.UPDATES_CHANNEL}>` : "Você näo configurou"
    return new EmbedBuilder(
      {
        "title": `Código registrado! 💎`,
        "description": `˚ ༘♡ ⋆｡˚ Registramos seu código de rastreio! \n︵‿︵‿︵‿︵︵‿︵‿︵‿︵︵‿︵‿︵‿︵\n\n˚₊· ͟͟͞͞➳❥ Se configurado, você irá receber atualizações dele no canal de atualizações (${updateChannel}). Você pode remover um código registrado com o comando **/excluir**. `,
        "color": 0x96e1e1,
        "image": {
          "url": `https://media.tenor.com/GwTRUJal39sAAAAd/cat-happy-cat.gif`,
          "height": 0,
          "width": 0
        }
      }
    )
}
