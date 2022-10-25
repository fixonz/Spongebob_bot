const Discord = require('discord.js');
const {Client, GatewayIntentBits, messageLink} = require('discord.js');
//acess secrets in dotenv file
require("dotenv").config();

const uberduck = require("./uberduck.js");

const client = new Client({
    intents:[
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildVoiceStates,
    ]
});

client.login(process.env.BOT_TOKEN);

//initialize firebase firestore
var admin = require("firebase-admin");

var serviceAccount = require("./spongebob-bot-be48e-firebase-adminsdk-21cz5-143cfd352f.json");
const { FieldValue } = require('@google-cloud/firestore');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

const fs = require('fs');
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
//loop through all of the command files and puts them into the collection
for(const file of commandFiles){
  //imports the files to access the execute command
  const command = require(`./commands/${file}`);

  //initializes the name and the file, and takes in the require module or the file 
  client.commands.set(command.name, command);
}
//someone joins server
client.on('guildMemberAdd', member => {
    let channel = member.guild.channels.cache.find(channel => channel.name === "welcome");
    if(!channel) {channel = member.guild.channels.cache.find(channel =>  channel.name === "general");}
    if(!channel) return;
  
    channel.send(`Welcome to the ${member.guild.name}, ${member}`);
  
  });

client.on("ready", () => {
    console.log("Naptime's over");
});

//someone leaves server 
client.on('guildMemberRemove', member => {
    const channel = member.guild.channels.cache.find(channel => channel.name === "general");
    if(!channel) return;
  
    channel.send(`Goodbye ${member}`)
  });


const PREFIX = "-S"
client.on("messageCreate", (msg) => {
    //checks if the user messages in the dms
    if(msg.guild== null && msg.author.id!='1033852189782851614'){
        msg.channel.send("What did you say?");
        return;
    }
    //doesn't read its own messages
    if(msg.guild == null && msg.author.id=='1033852189782851614'){
        return;
    }
    //text to speech commmand
    if(msg.content.startsWith("hey spongebob, say")){
        let start = 19;
        let end = msg.content.length ;
        let reply = msg.content.substring(start, end);
        // console.log(reply);

        uberduck.get_path_vt("spongebob", reply).then((path) =>{
            msg.channel.send({
                files:[path],
            })
        });
    }
    //create array of what the user is commanding
    let args = msg.content.substring(PREFIX.length+1).split(" ");
     //this ignores a message that is not a calling the bot and messages from other bots
    if( (!msg.content.startsWith(PREFIX) && !msg.content.startsWith(PREFIX.toLowerCase())) || msg.author.bot) return;
    switch(args[0].toLowerCase()){
        case 'hello':
            client.commands.get('hello').execute(msg,args);
            break;
        case 'motivation':
            client.commands.get('motivation').execute(msg,args);
            break;
        case 'add':
            client.commands.get('add').execute(msg,args);
            break;
        case 'delete':
            client.commands.get('delete').execute(msg,args);
            break;
        case 'viewed':
            client.commands.get('viewed').execute(msg,args);
            break;
        case 'unviewed':
            client.commands.get('unviewed').execute(msg,args);
            break;
        case 'watch':
            client.commands.get('watch').execute(msg,args);
            break;
        case 'viewdelete':
            client.commands.get('viewdelete').execute(msg, args);
            break;
        case 'jokes':
            client.commands.get('jokes').execute(msg, args);
            break;
        case 'poll':
            client.commands.get('poll').execute(msg,args);
            break;
        case 'coinflip':
            client.commands.get('coinflip').execute(msg, args);
            break;
        case 'birthday':
            client.commands.get('birthday').execute(msg, args);
            break;
        case 'play':
            client.commands.get('play').execute(msg,args);
            break;
        case 'search':
            client.commands.get('search').execute(msg, args);
            break;
        case 'list':
            client.commands.get('list').execute(msg, args);
            break;
        case 'help':
            client.commands.get('help').execute(msg, args);
            break;
        default:
            msg.channel.send({
                files:['./confused.png']
            })
            msg.channel.send("Ummm... sorry friend, I'm not sure. Type -S help for help!")
        break;
    }
});

