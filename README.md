<h1 align="center"><img src="./assets/discord.png" width="30px"> [Discord] Correios Bot <img src="./assets/discord.png" width="30px"></h1>

<p align="center">Rastreie e Receba Atualizações em Tempo Real de seus Pacotes! 📦</p>
<h1 align="center"><img src="./assets/correios.png" width="200px"></h1>
<p align="center">Projeto e Documentação ainda em construção. ⚠️</p>

## 👤 Sobre o Projeto

Esse é um Bot desenvolvido em Typescript feito para rastrear suas encomendas e te notificar quando elas atualizam. Utiliza a API do [Linke&Track](https://linketrack.com/api) para obter as informações do seu pacote.

Utiliza um banco de dados não relacional chamado [MongoDB](https://www.mongodb.com/) para armazenar e recuperar os dados referentes aos pacotes que você cadastra.

Conta com um eficiente sistema de log e tratamento de erros chamado [Winston](https://github.com/winstonjs/winston), modificado para também enviar notificações sobre sua aplicação para um [Webhook do Discord](https://discord.com/developers/docs/resources/webhook), configurado por você.

##  🛠️Requisitos
Antes de começar, certifique-se de ter as seguintes ferramentas instaladas:

- **Node.js** (versão 14 ou superior): https://nodejs.org 🌐
- **npm** (gerenciador de pacotes do Node.js): https://www.npmjs.com 📦
- **TypeScript**: Você pode instalar o TypeScript globalmente executando o comando `npm install -g typescript`. 📝
- **Docker** (Opcional): https://www.docker.com/ 🐋


## 🤔 Como rodar o projeto?

Clone o repositório utilizando o seguinte comando:

 ```bash
    $ git clone https://github.com/vergonha/correios-discord-bot
    $ cd correios-discord-bot
 ```

Veja o arquivo  `.env.example`, ele é muito importante para que a aplicação funcione corretamente porque ele é responsável por indicar as informações sensíveis da nossa aplicação.

Mude o nome dele para `.env`, removendo o ".example". Em seguida, preencha as informações que estão dentro do arquivo.

 ```
DISCORD_TOKEN= ...
DISCORD_LOG_WEBHOOK= ...
LINKETRACK_USER= ...
LINKETRACK_API_KEY= ...
MONGODB_CONNECTION_STRING= ...
UPDATES_CHANNEL= ...
 ```

Eles devem estar preenchidos corretamente para que a aplicação funcione da forma esperada.

- Discord Token: É o Token do Bot gerado na sua aplicação no [Painel de Desenvolvedor](https://discord.com/developers/applications) do Discord.
- Discord Log Webhook: É o [Webhook](https://discord.com/developers/docs/resources/webhook) que a aplicação vai chamar para enviar os logs do seu bot, caso ocorra algum erro durante a execução ou algo parecido, você vai ser alertado através desse webhook.
- LinkETrack User: Fornecido pela equipe do LinkETrack para ter acesso à API de rastreio.
- LinkETrack API Key: Fornecido pela equipe do LinkETrack para ter acesso à API de rastreio.
- MongoDB Connection String: É a String de conexão com seu banco de dados MongoDB para armazenar os códigos de rastreio e usuários do seu bot.
- Updates Channel: É o ID do Canal do seu servidor do Discord em que vai chegar a mensagem do Bot caso haja alguma atualização em um dos pacotes registrados.

Estando com essas informações preenchidas devidamente, digite em seu terminal:

**Primeira execução:**
```bash
    $ npm install
    $ npm run build
    $ npm run start
```

**Segunda execução em diante:**
```bash
    $ npm run start
```

## 🐋 Como criar uma Imagem Docker?

Se você quiser rodar seu bot em um servidor dedicado, talvez seja interessante utilizar uma imagem docker para facilitar o processo.

Você pode fazer isso com os seguintes comandos:

 ```bash
    $ docker build -t correios .
 ```

 e em seguida:

 ```bash
    $ docker run --env-file ./.env correios
 ```


![](https://purepng.com/public/uploads/large/to-be-continued-meme-un6.png)
