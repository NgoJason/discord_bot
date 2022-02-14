
const Discord = require('discord.js');
const client = new Discord.Client({intents: ["GUILDS", "GUILD_MESSAGES"]});
//require('dotenv').config();
const axios = require('axios');
// set url as constant
const show_URL = "https://imdb-api.com/en/API/MostPopularTVs/" + process.env.IMDB_TOKEN
const movies_URL = "https://imdb-api.com/en/API/MostPopularMovies/" + process.env.IMDB_TOKEN

client.on('ready', () => {
  console.log('Bot is ready');
});

//set a time to run every 10am Saturday and Wednesday

client.on('message', (msg) => {
  if (msg.content === '!shows')
    axios
      .get(show_URL)
      .then(response => {
        msg.reply("The top 5 shows are: " + response.data.items[0]['title'] + ",   "
        + response.data.items[1]['title'] + ",   "
        + response.data.items[2]['title'] + ",   "
        + response.data.items[3]['title'] + ",   "
        + response.data.items[4]['title']
        );
      })
      .catch(error => {
        console.log(error);
      });
    else if (msg.content === "!movies")
      axios
      .get(movies_URL)
      .then(response => {
        msg.reply("The top 5 movies are: " + response.data.items[0]['title'] + ",   "
        + response.data.items[1]['title'] + ",   "
        + response.data.items[2]['title'] + ",   "
        + response.data.items[3]['title'] + ",   "
        + response.data.items[4]['title'] 
        );
      })
      .catch(error => {
        console.log(error);
      });
});

client.login(process.env.DJS_TOKEN);