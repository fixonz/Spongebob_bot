const Discord = require('discord.js');
const {EmbedBuilder} = require('discord.js')

module.exports ={
    name: "help",
    description: "Send the channel a list of the commands",
    execute(message,args){
        const Embed = new EmbedBuilder()
        .setColor("#ff808b")
        .setTitle("SpongeBob Commands")
        .setDescription('Use the prefix "-S" before each command (not case-sensitive)')
        .addFields(
            {name: 'General',value:"``-S poll {Question} + Option1 + Option2...`` - Creates a poll with options\n``-S hello`` - Spongebob says hello to you\n``-S coinflip`` - Heads or Tails\n``-S motivation`` - motivational words\n``-S jokes`` - hilarious and comical jokes\n``-S help`` - Displays all of SpongeBob's commands"},
            {name: 'Movie',value:"``-S add {movie}`` - Adds a movie to the unviewed list\n``-S delete {movie}`` - Deletes a movie from the unviewed list\n``-S unviewed`` - Displays the unviewed list\n``-S viewed`` - Displays the viewed list\n``-S watch {movie}`` - Moves the movie watched from the unviewed list to the viewed list\n``-S viewdelete {movie}`` - Deletes a movie from the viewed list"},
            {name: 'SpongeBob Exclusive',value:"``hey spongebob, say {conversion text}`` - SpongeBob says what you want him to say\n``-S list`` - Displays the main characters of SpongeBob\n``-S search {character}`` - Gives detailed information/resources about that character\n``-S birthday {name}`` - SpongeBob sings you happy birthday in VC\n``-S play {rock/paper/scissors}`` - play rock, paper, scissors :)\n``-S weather {location}`` - Shows the areas weather"},
        )
        .setFooter({text: "Version: Alpha 1.0"});

        message.channel.send({embeds:[Embed]});
    }
}