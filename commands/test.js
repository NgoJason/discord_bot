const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');


module.exports = {
	data: new SlashCommandBuilder()
		.setName('help')
		.setDescription('Replies with help command'),
	async execute(interaction) {
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
		return interaction.reply({ embeds: [helpEmbed] });
	},
};