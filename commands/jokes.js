
const Discord = require('discord.js');
const { EmbedBuilder } = require('discord.js');
var oneLinerJoke = require('one-liner-joke');

module.exports = {
    name: 'jokes',
    description: "Spongebob tells a funny joke BAHAHAHAHAHAHAH",
    execute(msg, args){
        var joke = oneLinerJoke.getRandomJoke().body;
        const Embed = new EmbedBuilder()
        .setDescription(joke)
        .setImage('https://media.tenor.com/bsamKwUp9t0AAAAd/spongebob-happy.gif');
        
        msg.channel.send({embeds: [Embed]});
        // https://media.tenor.com/bsamKwUp9t0AAAAd/spongebob-happy.gif

    }
}