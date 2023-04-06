const Discord = require('discord.js')
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')
const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: "API KEY",
});
const openai = new OpenAIApi(configuration);

module.exports = {
    slash: true,                                
    cooldown: 10,                               

    data: new SlashCommandBuilder()            
    .setName('resim')
    .setDescription('OpenAI resim çizme')
    .setDMPermission(false)
    .addStringOption((option) =>
      option
        .setName("çizilecek-resim")
        .setDescription("Çizilecek resim")
        .setRequired(true)),
  
    async execute(client, interaction) {       
   
      const resim = interaction.options.getString("çizilecek-resim")
      
      await interaction.deferReply()
      
      const response = await openai.createImage({
        prompt: resim,
        n: 1,
        size: "1024x1024",
      });
      
      const imageUrl = response.data.data[0].url;
      
      const Resim = new EmbedBuilder()
        .setColor("Blurple")
        .setAuthor({name: `${resim} • Adlı resmin`})
        .setImage(imageUrl)
      
      await interaction.editReply({embeds: [Resim]})
 
 }
}
