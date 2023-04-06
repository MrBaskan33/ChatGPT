const Discord = require('discord.js')
const icooldown = new Discord.Collection()
const { ownerid } = require("../ayarlar.json")

module.exports = {
    name: 'interactionCreate',
    execute(interaction, client) {

        const command = client.slashcommands.get(interaction.commandName)
        if (!command) return

        if (interaction.user.id !== ownerid) {
            if (!icooldown.has(interaction.commandName)) {
                icooldown.set(interaction.commandName, new Discord.Collection())
            }

            const now = Date.now()
            const timestampt = icooldown.get(interaction.commandName)
            const cooldownAmount = (command.cooldown) * 1000

            if (timestampt.has(interaction.user.id)) {
                const expiration = timestampt.get(interaction.user.id) + cooldownAmount

                if (now < expiration) {
                    const timeleft = Math.round((expiration - now) / 1000)

                    const embeduyarı = new Discord.EmbedBuilder()
                      .setDescription(`❌ Bu komutu tekrar kullanabilmek için **${timeleft} saniye** beklemelisin.`)
                      .setColor('Red')
                      .setTitle("Yavaşla dostum")
                    interaction.reply({ embeds: [embeduyarı] })
                    setTimeout(() => { interaction.deleteReply() }, expiration - now)

                    return
                }

            } else {

                timestampt.set(interaction.user.id, now)
                setTimeout(() => timestampt.delete(interaction.user.id), cooldownAmount)
            }
        }

        if (command.yetki) {

            var yetki = command.yetki.replace("ManageEmojis", 'Emojileri Yönet').replace("KickMembers", 'Kullanıcıyı Uzaklaştır').replace("BanMembers", 'Kullanıcıyı Yasakla').replace('Administrator', 'Yönetici').replace("ManageChannels", 'Kanalları Yönet').replace("ManageMessages", 'Mesajları Yönet').replace("ManageRoles", 'Rolleri Yönet')

            var yetkiyok = new Discord.EmbedBuilder()
              .setDescription(`❌ Bu komutu kullanabilmek için **${yetki}** yetkisine sahip olmalısın.`)
              .setColor('Red')
              .setTitle("Olamaz yetkin yok")
            if (!interaction.member.permissions.has(`${command.yetki}`)) return interaction.reply({ embeds: [yetkiyok] })
        }

        if (command.botyetki) {

            var botyetki = command.botyetki.replace("ManageEmojis", 'Emojileri Yönet').replace("KickMembers", 'Kullanıcıyı Uzaklaştır').replace("BanMembers", 'Kullanıcıyı Yasakla').replace('Administrator', 'Yönetici').replace("ManageChannels", 'Kanalları Yönet').replace("ManageMessages", 'Mesajları Yönet').replace("ManageRoles", 'Rolleri Yönet')

            var botyetkiyok = new Discord.EmbedBuilder()
              .setDescription(`❌ Bu komutu kullanabilmek için **${botyetki}** yetkisine sahip olmalıyım.`)
              .setColor('Red')
              .setTitle("Olamaz yetkim yok")
            if (!interaction.guild.members.me.permissions.has(`${command.botyetki}`)) return interaction.reply({ embeds: [botyetkiyok] })
        }

        try {
            command.execute(client, interaction)
        } catch (error) {
            console.error(error)
        }
    }
}
