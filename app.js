
const Discord = require('discord.js');
const { MessageEmbed } = require('discord.js');
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
        const showEmbed = new MessageEmbed()
        .setColor('#0099ff')
        .setTitle('Top 5 shows')
        .addFields(
          { name: "1. " + response.data.items[0]['fullTitle'], value: 'IMDB Rating: ' + response.data.items[0]['imDbRating'] },
          { name: "2. " +response.data.items[1]['fullTitle'], value: 'IMDB Rating: ' + response.data.items[1]['imDbRating'] },
          { name: "3. " +response.data.items[2]['fullTitle'], value: 'IMDB Rating: ' + response.data.items[2]['imDbRating'] },
          { name: "4. " +response.data.items[3]['fullTitle'], value: 'IMDB Rating: ' + response.data.items[3]['imDbRating'] },
          { name: "5. " +response.data.items[4]['fullTitle'], value: 'IMDB Rating: ' + response.data.items[4]['imDbRating'] },
        )
        .setTimestamp()
        msg.reply({ embeds: [showEmbed] });
      })
      .catch(error => {
        console.log(error);
      });
    else if (msg.content === "!movies")
      axios
      .get(movies_URL)
      .then(response => {
        const movieEmbed = new MessageEmbed()
        .setColor('#0099ff')
        .setTitle('Top 5 shows')
        .addFields(
          { name: "1. " + response.data.items[0]['fullTitle'], value: 'IMDB Rating: ' + response.data.items[0]['imDbRating'] },
          { name: "2. " +response.data.items[1]['fullTitle'], value: 'IMDB Rating: ' + response.data.items[1]['imDbRating'] },
          { name: "3. " +response.data.items[2]['fullTitle'], value: 'IMDB Rating: ' + response.data.items[2]['imDbRating'] },
          { name: "4. " +response.data.items[3]['fullTitle'], value: 'IMDB Rating: ' + response.data.items[3]['imDbRating'] },
          { name: "5. " +response.data.items[4]['fullTitle'], value: 'IMDB Rating: ' + response.data.items[4]['imDbRating'] },
        )
        .setTimestamp()
        msg.reply({ embeds: [movieEmbed] });
      })
      .catch(error => {
        console.log(error);
      });
});

client.login(process.env.DJS_TOKEN);