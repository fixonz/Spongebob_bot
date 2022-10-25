const Discord = require('discord.js');
const {EmbedBuilder} = require('discord.js');
const fs = require('fs');

module.exports = {
    name: 'list',
    description: 'Displays the list of the main characters in the show', 
    async execute(message, args){
        let character = args.slice(1).join(" ");
        let raw = fs.readFileSync('./characters.json');
        let student = JSON.parse(raw);
        let arr = student.name;
        let list = "";
        for(let i= 0; i<arr.length;i++){
            let emoji = ""
            if(i==9){
                emoji = await message.client.emojis.cache.find(emoji => emoji.name ===`${i+1}`);
            }
            else{
                emoji = await message.client.emojis.cache.find(emoji => emoji.name ===`${i+1}_`);
            }
            list+=`${emoji} ${arr[i]}   \n`
        }

        const exampleEmbed = new EmbedBuilder()
            .setTitle("Main Characters")
            .setURL('https://spongebob.fandom.com/wiki/List_of_characters/Main')
            .setColor(`#2B65EC`)
            .setThumbnail('https://static.wikia.nocookie.net/spongebob/images/8/80/SpongeBob_SquarePants_-_2018_logo_%28English%29.png/revision/latest?cb=20210207112755')
            .setDescription(list)
            .setFooter({text:`Since May 1, 1999`});

        message.channel.send({embeds: [exampleEmbed]});
    }
}