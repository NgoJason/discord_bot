
const Discord = require('discord.js');
const { MessageEmbed } = require('discord.js');
const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES"] });
//require('dotenv').config();
const axios = require('axios');
// API endpoints
const show_URL = "https://imdb-api.com/en/API/MostPopularTVs/" + process.env.IMDB_TOKEN
const movies_URL = "https://imdb-api.com/en/API/MostPopularMovies/" + process.env.IMDB_TOKEN
const cmc_URL = "https://pro-api.coinmarketcap.com/v2/cryptocurrency/quotes/latest?symbol="

client.on('ready', () => {
  console.log('Bot is ready');
});

//set a time to run every 4 days = 3450 * 100000
//{"id":"tt9288030","rank":"1","rankUpDown":"+7","title":"Reacher","fullTitle":"Reacher (2022)","year":"2022","image":"https://m.media-amazon.com/images/M/MV5BNzQ4MGYzYzAtNjJlOC00NTdkLTlmNTAtMmZjMzZmZTg2YTEzXkEyXkFqcGdeQXVyMjkwOTAyMDU@._V1_UX128_CR0,3,128,176_AL_.jpg","crew":"Alan Ritchson, Malcolm Goodwin","imDbRating":"8.4","imDbRatingCount":"44910"}

// This will be repeated 5 times with 1 second intervals:
// setIntervalX(function () {
//   msg.reply("Hi")
// }, 10000, 3);

// var channel = client.channels.get('gambling-den', nameOfChannel);
// client.sendMessage(channel, "test") 

// calculate time
function calcTime(city, offset) {
  d = new Date();
  utc = d.getTime() + (d.getTimezoneOffset() * 60000);
  nd = new Date(utc + (3600000 * offset));
  return "The local time in " + city + " is " + nd.toLocaleString();
}


client.on('message', (msg) => {

  if (msg.content === '!time' || msg.content === '!utc') {
    const timeEmbed = new MessageEmbed()
      .setColor('#0099ff')
      .setTitle('Time Zones')
      .addFields(
        { name: "UTC (London)", value: calcTime('London/UTC', '0') },
        { name: "New York EST", value: calcTime('New York', '-5') },
        { name: "Houston CST", value: calcTime('Houston', '-6') },
        { name: "Los Angeles PST", value: calcTime('LA', '-8') },
        { name: "Singapore", value: calcTime('SG', '+8') },
        { name: "Tallinn", value: calcTime('Estonia', '+2') },
      )
    msg.reply({ embeds: [timeEmbed] });
  };
  if (msg.content === '!bothelp')
    msg.reply("to stop Jason's bot use jail and to start it use start_bot");
  if (msg.content === '!help') {
    const helpEmbed = new MessageEmbed()
      .setColor('#0099ff')
      .setTitle('Time Zones')
      .addFields(
        { name: "!time or !utc", value: 'Get the time zones' },
        { name: "!btc", value: 'Get the current Bitcoin price' },
        { name: "!shows", value: 'Get the top 5 shows on IMDB' },
        { name: "!movies", value: 'Get the top 5 movies on IMDB' },
        { name: "!stream", value: 'Get MMA live stream links' },
      )
    msg.reply({ embeds: [helpEmbed] });
  }
  if (msg.content === '!stream') {
    const streamsEmbed = new MessageEmbed()
      .setColor('#0099ff')
      .setTitle('MMA Streams')
      .addFields(
        { name: "List of Streams", value: 'https://ufcstream.me/ufc-streams  https://v2.sportsurge.net/list-mma http://bestsolaris.com/category/mmastreams http://buffstream.io/mma-buff https://720pstream.tv/mma-stream https://crackstreams.me/mmacrackedstreams http://live.worldcupfootball.me/ufc-stream' }
      )
    msg.reply({ embeds: [streamsEmbed] });
  }
  if (msg.content === '!btc')
    axios
      .get(cmc_URL + "BTC", { headers: { 'X-CMC_PRO_API_KEY': process.env.CMC_API_KEY }, })
      .then(response => {
        const json = response.data;
        const btc_price = String(json.data['BTC'][0].quote.USD.price)
        msg.reply(btc_price);
      })
  if (msg.content === '!shows' || msg.content === "!show")
    axios
      .get(show_URL)
      .then(response => {
        const showEmbed = new MessageEmbed()
          .setColor('#0099ff')
          .setTitle('Top 5 shows')
          .addFields(
            { name: "1. " + response.data.items[0]['fullTitle'], value: 'IMDB Rating: ' + response.data.items[0]['imDbRating'] },
            { name: "2. " + response.data.items[1]['fullTitle'], value: 'IMDB Rating: ' + response.data.items[1]['imDbRating'] },
            { name: "3. " + response.data.items[2]['fullTitle'], value: 'IMDB Rating: ' + response.data.items[2]['imDbRating'] },
            { name: "4. " + response.data.items[3]['fullTitle'], value: 'IMDB Rating: ' + response.data.items[3]['imDbRating'] },
            { name: "5. " + response.data.items[4]['fullTitle'], value: 'IMDB Rating: ' + response.data.items[4]['imDbRating'] },
          )
          .setTimestamp()
          .setFooter({ text: 'Try doing !help for more info or complain to me, Jason!', iconURL: 'https://i.imgur.com/WWmAV5s.jpg' });
        msg.reply({ embeds: [showEmbed] });
      })
      .catch(error => {
        console.log(error);
      });
  else if (msg.content === "!movies" || msg.content === "!movie")
    axios
      .get(movies_URL)
      .then(response => {
        const movieEmbed = new MessageEmbed()
          .setColor('#FF0000')
          .setTitle('Top 5 movies')
          .addFields(
            { name: "1. " + response.data.items[0]['fullTitle'], value: 'IMDB Rating: ' + response.data.items[0]['imDbRating'] },
            { name: "2. " + response.data.items[1]['fullTitle'], value: 'IMDB Rating: ' + response.data.items[1]['imDbRating'] },
            { name: "3. " + response.data.items[2]['fullTitle'], value: 'IMDB Rating: ' + response.data.items[2]['imDbRating'] },
            { name: "4. " + response.data.items[3]['fullTitle'], value: 'IMDB Rating: ' + response.data.items[3]['imDbRating'] },
            { name: "5. " + response.data.items[4]['fullTitle'], value: 'IMDB Rating: ' + response.data.items[4]['imDbRating'] },
          )
          .setTimestamp()
          .setFooter({ text: 'Try doing !help for more info or complain to me, Jason!', iconURL: 'https://i.imgur.com/WWmAV5s.jpg' });
        msg.reply({ embeds: [movieEmbed] });
      })
      .catch(error => {
        console.log(error);
      });
});

client.login(process.env.DJS_TOKEN);
