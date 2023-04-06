const Discord = require('discord.js')
const { Client, Partials } = require('discord.js')
const client = new Client({ intents: 131071, partials: Object.values(Partials).filter(x => typeof x === "string"), shards: 'auto' })
const { botid, token } = require("./ayarlar.json")
require("./slash")(client)

client.on('messageCreate', async message => {

    const embedetiket = new Discord.EmbedBuilder()
      .setColor('Blurple')
      .setAuthor({name: "OpenAI'yı nasıl kullanabilirim."})
      .setDescription(`</gpt:0> veya </resim:0> yazarak beni kullanabilirsin.`)
    if (message.content === `<@${botid}>`) {
      message.channel.send({ embeds: [embedetiket] })
    }

})

client.login(token)