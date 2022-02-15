
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

//set a time to run every 4 days = 3450 * 100000
//{"id":"tt9288030","rank":"1","rankUpDown":"+7","title":"Reacher","fullTitle":"Reacher (2022)","year":"2022","image":"https://m.media-amazon.com/images/M/MV5BNzQ4MGYzYzAtNjJlOC00NTdkLTlmNTAtMmZjMzZmZTg2YTEzXkEyXkFqcGdeQXVyMjkwOTAyMDU@._V1_UX128_CR0,3,128,176_AL_.jpg","crew":"Alan Ritchson, Malcolm Goodwin","imDbRating":"8.4","imDbRatingCount":"44910"}

// This will be repeated 5 times with 1 second intervals:
setIntervalX(function () {
  msg.reply("Hi")
}, 10000, 3);

var channel = client.channels.get('gambling-den', nameOfChannel);
client.sendMessage(channel, "test") 

const embed = new Discord.MessageEmbed()
        .setTitle('Commands list')
        .setColor('#DAF7A6')
        .addFields(
            {name: 'Test 1',
            value:"`line 1`\n`line 2`\n`line 3`"}
        )

client.on('message', (msg) => {
  if (msg.content === '!shows')
    msg.reply(embed)
  .catch(error => {
    console.log(error);
  });
});


// client.on('message', (msg) => {
//   if (msg.content === '!shows')
//     axios
//       .get(show_URL)
//       .then(response => {
//         msg.reply("The top 5 shows are: " + response.data.items[0]['title'] + ",   "
//         + response.data.items[1]['title'] + ",   "
//         + response.data.items[2]['title'] + ",   "
//         + response.data.items[3]['title'] + ",   "
//         + response.data.items[4]['title']
//         );
//       })
//       .catch(error => {
//         console.log(error);
//       });
//     else if (msg.content === "!movies")
//       axios
//       .get(movies_URL)
//       .then(response => {

//         msg.reply("The top 5 movies are: " + response.data.items[0]['title'] + ",   "
//         + response.data.items[1]['title'] + ",   "
//         + response.data.items[2]['title'] + ",   "
//         + response.data.items[3]['title'] + ",   "
//         + response.data.items[4]['title'] 
//         );
//       })
//       .catch(error => {
//         console.log(error);
//       });
// });

client.login(process.env.DJS_TOKEN);