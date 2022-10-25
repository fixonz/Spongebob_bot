const Discord = require('discord.js');
const fs = require('fs');
const {join} = require('path');
const  { joinVoiceChannel } = require('@discordjs/voice');
const { createAudioPlayer, NoSubscriberBehavior, createAudioResource, VoiceConnectionStatus, StreamType } = require('@discordjs/voice');
var Jimp = require('jimp');

module.exports = {
    name: 'birthday',
    description: "This command joins the voice chat and sings happybirthday",
    async execute(message, args){
        // let player = message.author.username;
        var VC = message.member.voice.channel;
        // console.log(VC);
        if(VC== null){
            return message.reply('Please join a voice chat pal');
        }

        // console.log("trying to connect");
        const connection = joinVoiceChannel({
            channelId: message.member.voice.channelId,
            guildId: message.guild.id, 
            adapterCreator: message.guild.voiceAdapterCreator
        });
        
        connection.on(VoiceConnectionStatus.Ready, () => {
            console.log('The connection has entered the Ready state - ready to play audio!');
        });
        
        const player = createAudioPlayer({
            behaviors: {
                //if there is no one to listen to the audio in the voice chat, then pause
                noSubscriber: NoSubscriberBehavior.Pause,
            },
        });
        // console.log("here");  
        // const resource = createAudioResource(fs.createReadStream(join(__dirname,'../birthdaysong.webm'),{
        //     inputType: StreamType.WebmOpus,
        //     inlineVolume: true,
        //     metadata: {
        //         title: 'Spongebob singing happy birthday',
        //     }
        // }));
        let resource = createAudioResource(join(__dirname, '../birthdaysong.mp3'));
        player.play(resource);

        player.on('error', error => {
            console.error(`Error: ${error.message} with resource`);
        });
        console.log('success');
        await connection.subscribe(player)
            console.log('bot has connected to vc');
            setTimeout(()=> 
            connection.destroy(), 26_000);  
        

        //birthday canvas
        //#ff808b patrick star pink
        let recipient = args[1];
        const image = await Jimp.read('./happybrithday.jpeg');
        const font = await Jimp.loadFont(Jimp.FONT_SANS_64_BLACK);
        image.print(font, 135,25, `Happy Birthday ${recipient}`);
        //processing image
        await image.writeAsync(`./happybirthday.png`);
        console.log('image processed');
        message.channel.send({files:[`./happybirthday.png`]});
    }
}