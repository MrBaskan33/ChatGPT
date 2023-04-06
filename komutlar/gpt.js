const Discord = require('discord.js')
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')
const { ask } = require("../ai")

module.exports = {
    slash: true,                                
    cooldown: 10,                               

    data: new SlashCommandBuilder()            
    .setName('gpt')
    .setDescription('ChatGPT discord botu')
    .setDMPermission(false)
    .addStringOption((option) =>
      option
        .setName("yazı")
        .setDescription("Yazınız")
        .setRequired(true)),
  
    async execute(client, interaction) {       
       
      const yazı = interaction.options.getString("yazı")
    
      await interaction.deferReply()
      
      const cevap = await ask(`${yazı}`)
    
      const ChatGPT = new EmbedBuilder()
        .setColor("Blurple")
        .setAuthor({name: "Resmi bir ChatGPT botu değildir."})
        .setDescription(cevap)
      
      await interaction.editReply({embeds: [ChatGPT]})
        
 }
}
