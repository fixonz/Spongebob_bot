const Discord = require('discord.js');
const { poll } = require('discord.js-poll');

module.exports = {
    name: 'poll',
    description: "Creates a poll",
    execute(msg, args){
        poll(msg, args.slice(1), '+', '#ADD8E6');
    }
}