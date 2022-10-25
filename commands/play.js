const Discord = require('discord.js');
const {EmbedBuilder, AttachmentBuilder} = require('discord.js');

module.exports = {
    name: 'play',
    description: 'Plays rock, paper, scissors with SpongeBob', 
    execute(message, args){
        let thing = args[1].toLowerCase();
        if(thing == 'rock'){
            const file = new AttachmentBuilder('./rock.webp');
        const Embed = new EmbedBuilder()
        .setTitle('Darn, its a tie...')
        .setImage('attachment://rock.webp');
        message.channel.send({embeds: [Embed], files: [file]});
        }
        else if(thing == 'paper'){
            const file = new AttachmentBuilder('./paper.webp');
        const Embed = new EmbedBuilder()
        .setTitle('Darn, its a tie...')
        .setImage('attachment://paper.webp');
        message.channel.send({embeds: [Embed], files: [file]});
        }
        else{
            const file = new AttachmentBuilder('./scissors.jpeg');
            const Embed = new EmbedBuilder()
        .setTitle('Darn, its a tie...')
        .setImage('attachment://scissors.jpeg');
        message.channel.send({embeds: [Embed], files: [file]});
        }
    }
}