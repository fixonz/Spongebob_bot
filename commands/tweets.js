const Discord = require('discord.js');
var Twitter = require('twitter');
require("dotenv").config();

module.exports = {
    name: 'tweets',
    description: "Gets the latest tweets",
    async execute(msg, args){
        let player = msg.author.username;
        var client = new Twitter({
            consumer_key: process.env.TWIT_KEY,
            consumer_secret: process.env.TWIT_SECRET,
            access_token_key: process.env.ACESSS_TOKEN,
            access_token_secret: process.env.ACCESS_SECRET
          });
        //   let tweets = await client.tweets.usersIdTweets(
        //     17088779,
        //     function(error, tweets) {
        //       //Looks, tweets are in here!
        //       //this function is called a "callback"
        //       console.log(tweets);
        //     }
        //   );
        //   (async () => {
        //     try {
        //       const usersTweets = await client.tweets.usersIdTweets(
          
        //         //The ID of the User to list Tweets of
        //         17088779
        //       );
        //       console.dir(usersTweets, {
        //         depth: null,
        //       });
        //     } catch (error) {
        //       console.log(error);
        //     }
        //   })();
        const params = { screen_name: 'nodejs' };
        client.get('statuses/user_timeline', params, (err, tweets) => {
        if (err) throw err;
        console.log(tweets);
        });
    }
}