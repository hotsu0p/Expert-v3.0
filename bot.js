const { Client, Intents, Constants: { Events, GatewayIntentBits } } = require('discord.js');

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.on(Events.INTERACTION_CREATE, interaction => {
    if (!interaction.isCommand()) return;

    const { commandName } = interaction;

    if (commandName === 'stats') {
        return interaction.reply(`Server count: ${client.guilds.cache.size}.`);
    }
});

client.login(client.config.token)
