const Discord = require('discord.js');
const {EmbedBuilder} = require('discord.js');

module.exports = {
    name: 'coinflip',
    description: 'Heads or Tails', 
    execute(message, args){
        let random_num = Math.floor(Math.random() * 2);
        if(random_num==0){
        const Embed = new EmbedBuilder()
        .setTitle('Heads')
        .setImage('https://cdn.discordapp.com/attachments/1033852964298821706/1033983935480332298/Heads.png');
        message.channel.send({embeds: [Embed]});
        }
        else{
        const Embed = new EmbedBuilder()
        .setTitle('Tails')
        .setImage('https://cdn.discordapp.com/attachments/1033852964298821706/1033984148823617596/Tails.png');
        message.channel.send({embeds: [Embed]});
        }
    }
}