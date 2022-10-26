const Discord = require('discord.js');
const weather = require('weather-js');
const {EmbedBuilder, AttachmentBuilder} = require('discord.js')

module.exports = {
    name: 'weather',
    description: 'This command displays the weather condition of a given place',
    execute(message,args){
        weather.find({search: args.slice(1).join(" "), degreeType: 'F'}, function(err, result){
            if(err) message.channel.send(err);
    
            if (result === undefined || result.length === 0){
              message.channel.send("**I don't know where that is 😔**")
              return;
            }
    
            //sends the rough version of the current weather
            //message.channel.send(JSON.stringify(result[0].current, null, 2));
    
            //variables 
            var current = result[0].current;
            var location = result[0].location;
            let stringer = 'http://blob.weather.microsoft.com/static/weather4/en-us/law/';
            let imager = '';
            for(let i = 0; i <48;i++){
                let news = stringer + i + '.gif';
                if(current.imageUrl==news){
                    if((i>0 && i <=4) || (i >16 && i <=22) || (i==35)){
                        imager = './weathers/stormy.webp';
                    }
                    else if((i>4 && i<=12) || i==40){
                        imager = './weathers/rainy.webp';
                    }
                    else if(i > 12 && i <=16){
                        imager = './weathers/winter.webp';
                    }
                    else if(i>22 && i<=25){
                        imager ='./weathers/windy.jpeg';
                    }
                    //26 -34
                    else if(i>25 && i <= 34){
                        if(i%2==0){
                            imager='./weathers/sunny.png';
                        }
                        else{
                            imager='./weathers/night.jpeg';
                        }
                    }
                    else if(i>=36 && i<=39){
                        imager='./weathers/sunny.png';
                    }
                    else if(i==41){
                        imager='./weathers/sunny.png';
                    }
                    else{
                        imager='./weathers/night.jpeg';
                    }

                    if(imager!=''){
                        break;
                    }


                }
            }
            const file = new AttachmentBuilder(imager);
            //Embed
            const Embed = new EmbedBuilder()
            .setDescription(`**${current.skytext}**`)
            .setTitle(`Weather for ${current.observationpoint}`)
            .setColor('#E5FF61')
            .addFields({name:'Timezone',value:`UTC${location.timezone}`,inline:true},
            {name:'Winds', value: current.winddisplay,inline:true},
            {name:'Humidity', value:`${current.humidity}%`,inline:true},
            {name:'Temperature',value: `${current.temperature} Degrees F`,inline: true},
            {name: 'Feels Like',value:`${current.feelslike} Degrees F`, inline: true})
            .setImage(`attachment://${imager.substring(11)}`)
            .setFooter({text:`I observed this on ${current.day}, ${current.observationtime}`})
            .setTimestamp()
            // .setImage('attachment://night.jpeg');
            console.log(`attachment://${imager.substring(11)}`)
            message.channel.send({embeds:[Embed],files:[file]});
          });
    }
}