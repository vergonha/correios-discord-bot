<h1 align="center"><img src="./assets/discord.png" width="30px"> [Discord] Correios Bot <img src="./assets/discord.png" width="30px"></h1>
<h1 align="center"><img src="./assets/correios.png" width="200px"></h1>

<p align="center">Rastreie e Receba Atualizações em Tempo Real de seus Pacotes! 📦</p>

<h1 align="center"><img src="https://i.imgur.com/L3ntrmM.png"></h1>


<p align="center">Projeto e Documentação ainda em construção. ⚠️</p>

## 👤 Sobre o Projeto

Esse é um Bot desenvolvido em Typescript feito para rastrear suas encomendas e te notificar quando elas atualizam. Utiliza a API da Magalu para obter as informações do seu pacote.

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
UPDATES_CHANNEL= ...
 ```

Eles devem estar preenchidos corretamente para que a aplicação funcione da forma esperada.

- Discord Token: É o Token do Bot gerado na sua aplicação no [Painel de Desenvolvedor](https://discord.com/developers/applications) do Discord.
- Discord Log Webhook: É o [Webhook](https://discord.com/developers/docs/resources/webhook) que a aplicação vai chamar para enviar os logs do seu bot, caso ocorra algum erro durante a execução ou algo parecido, você vai ser alertado através desse webhook.
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

## 🛒 [NOVIDADE] Shopee! 

Agora você pode rastrear suas encomendas da Shopee, independentemente de qual transportadora o vendedor escolher utilizar!

**Como faço?**

É fácil! Certifique-se de ter a versão mais atualizada do bot rodando no seu servidor e siga os passos:

### 🚨 Atualize seu arquivo `.env`! 

```
DISCORD_TOKEN=...
DISCORD_LOG_WEBHOOK=...
UPDATES_CHANNEL=...
👇👇👇👇 
SHOPEE_COOKIE=
☝️☝️☝️☝️
```

Caso queira utilizar o rastreio de encomendas Shopee, vai precisar inserir seu Cookie de sessão dentro do seu arquivo de variáveis de ambiente.

**🍪 Como encontrar o Cookie**

1. Acesse o site `https://shopee.com.br`
2. Faça o seguinte caminho: **Clique direito do mouse** > **Inspecionar** > **Navegue até a aba superior chamada "Aplicação"** > **Encontre o dropdown chamado "Cookie"**
3. Copie o valor do Cookie `SPC_EC` e coloque no seguinte formato dentro do arquivo de configuração:

`SHOPEE_COOKIE="SPC_EC=RHFZUz05..."` ( Não esqueça das aspas! )

### 🚨 ATENÇÃO! Você NÃO deve colocar o código de rastreio ao rastrear a encomenda! Você deve colocar o order_id/id do pedido no lugar do código!

Assim, podemos encontrar as encomendas de qualquer rastreadora desde que o vendedor tenha postado pela Shopee!

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