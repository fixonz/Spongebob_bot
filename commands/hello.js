const Discord = require('discord.js');
const uberduck = require("../uberduck.js");

module.exports = {
    name: 'hello',
    description: "This is a hello world command!",
    execute(msg, args){
        let player = msg.author.username;
        msg.channel.send(`hello ${player}`);
        let reply = `hello ${player}`;
        uberduck.get_path_vt("spongebob", reply).then((path) =>{
            msg.channel.send({
                files:[path],
            })
        });
    }
}