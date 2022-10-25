const Discord = require('discord.js');
const {EmbedBuilder} = require('discord.js');
const fs = require('fs');

module.exports = {
    name: 'search',
    description: 'Gets detailed info on the characters of Spongebob', 
    async execute(message, args){
        let character = args.slice(1).join(" ");
        let raw = fs.readFileSync('./characters.json');
        let student = JSON.parse(raw);
        let arr = student.name;
        let webs = student.website;
        let summary = student.summary;
        let index = -1;
        for(let i= 0; i<arr.length;i++){
            if(arr[i].toLowerCase().indexOf(character.toLowerCase())!=-1){
                index = i;
                break;
            }
        }

        if(index == -1){
            message.reply("-S list to see a list of my friends pal");
            return;
        }
        else{
            const Embed = new EmbedBuilder()
            .setTitle(arr[index])
            .setColor("#f7e948")
            .setImage(summary[index])
            .setURL(webs[index]);

            message.channel.send({embeds: [Embed]});
        }
    }
}