const Discord =require('discord.js')
const {EmbedBuilder} = require('discord.js')
const quotes = require("success-motivational-quotes");
module.exports = {
    name: 'motivation', 
    description: 'displays random motivational words',
    execute(message, args){
        const randomColor = Math.floor(Math.random()*16777215).toString(16);
        const exampleEmbed = new EmbedBuilder()
	.setColor(`#${randomColor}`)
    .setDescription(quotes.getTodaysQuote().body)
	.setFooter({text: quotes.getTodaysQuote().by});
    message.channel.send({embeds: [exampleEmbed]});
    }
}