const { //imports for discord.js
  Client,
  GatewayIntentBits,
  Partials,
  Collection,
  Events,
  MessageEmbed, // Change EmbedBuilder to MessageEmbed
  permissions,
  voiceschemas,
  AttachmentBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  ModalBuilder,
  TextInputBuilder,
  PermissionsBitField,
  TextInputStyle,
  commands,
  Options,
  MessageActionRow,
  MessageButton,
  EmbedBuilder,
  Embed,
} = require("discord.js");
const Discord = ('discord.js')
const { MessageAttachment } = require('discord.js')
const warnFilePath = './warns.json';
const { svg2png } = require('svg-png-converter')
const { DisTube } = require("distube");
const config = require('./config.json');
const { SpotifyPlugin } = require('@distube/spotify');
const translate = require('@iamtraction/google-translate');
const { SoundCloudPlugin } = require('@distube/soundcloud');
const { YtDlpPlugin } = require('@distube/yt-dlp');
const { handleLogs } = require('./Handlers/handleLogs');
const { handler } = require('./Handlers/handler');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const fs = require('fs');
const logs = require('discord-logs');
const Topgg = require('@top-gg/sdk');
const prefix = '?'; // Your bot's command prefix
const axios = require('axios');
const fetch = require('node-fetch');
const readdirSync = require('fs');
const banschema = require('./Schemas/ban.js');
const messageLogging = require('./Handlers/messageLogging');
const { ChannelType } = require('discord.js');
//use this if your bot on top.gg
///const topggAPI = new Topgg.Api('Your_topp.gg_token'); // If your bot added in top.gg line (1492) uncoment other function
const { loadEvents } = require("./Handlers/eventHandler");
const { loadCommands } = require("./Handlers/commandHandler");
const { loadModals } = require("./Handlers/modalHandler");
const { loadButtons } = require("./Handlers/buttonHandler");
const { LoadErrorHandler } = require("./Handlers/ErrorHandler");
const { loadComponents } = require('./Handlers/ComponentsHandler');
const { OpenAIApi, Configuration } = require("openai");
const { CaptchaGenerator } = require('captcha-canvas');
const modschema = require('./Schemas/modmailschema.js'); // Import the modschema model
const moduses = require ('./Schemas/modmailuses.js')
const contextMenu = require('fs').readdirSync('./context-menus').filter(file => file.endsWith('.js'));
const client = new Client({
  intents: [Object.keys(GatewayIntentBits)],
  partials: [Object.keys(Partials)],
  makeCache: Options.cacheWithLimits({
    MessageManager: { maxSize: 0 },
    PresenceManager: { mazSize: 0 },
  }),
  allowedMentions: { parse: ["users", "roles", "everyone"] },
});

///levelingroles//

//shardingg//

////join dm owner//



client.on('guildCreate', async (guild) => {
  try {
    const owner = await guild.members.fetch(guild.ownerId);

    if (owner) {
      const embed = new EmbedBuilder()
        .setColor('#0099ff')
        .setTitle('Thank You for Adding Me!')
        .setDescription(`<:utility12:1082695146560307281>Thanks for adding me to your server, ${owner.user.username}!`)
         .addFields(
          { name: 'How to Use Me', value: '<:reply_end:1111372039463374880>You Can use me Via Slash command or prefix But Prefix Is Beta Now' }
          // Add more fields as needed
        );
      owner.send({ embeds: [embed] });
      console.log(`Sent thank-you message to ${owner.user.tag}`);
    }
  } catch (error) {
    console.error(`Error sending thank-you message: ${error.message}`);
  }
});

///rempve dm ////


client.on('guildDelete', async (guild) => {
  try {
    const owner = await guild.members.fetch(guild.ownerId);

    if (owner) {
      const embed = new EmbedBuilder()
        .setColor('#ff0000')
        .setTitle('Goodbye!')
        .setDescription(`<:1984icondelete:1117884114259951636>I was removed from your server, ${owner.user.username}. KICKED ME MISTAKENLY?, Here you can [Add Me](https://top.gg/bot/1023810715250860105).`);

      owner.send({ embeds: [embed] });
      console.log(`Sent farewell message to ${owner.user.tag}`);
    }
  } catch (error) {
    console.error(`Error sending farewell message: ${error.message}`);
  }
});
//uncomnet this if you want to use bardai system 
///end ////
client.on(Events.MessageCreate, async message => {
    if (message.channel.type === ChannelType.DM) {
        if (message.author.bot) return;

        await message.channel.sendTyping();

        let input = {
            method: 'GET',
            url: 'https://google-bard1.p.rapidapi.com/',
            headers: {
                text: message.content,
                'x-RapidAPI-key': 'api of rapid ,//enter your own api',	
                'x-RapidAPI-Host': 'google-bard1.p.rapidapi.com',
            }
        };

        try {
            const output = await axios.request(input);
            const response = output.data.response;

            if (response.length > 2000) {
                const chunks = response.match(/.{1,2000}/g);

                for (let i = 0; i < chunks.length; i++) {
                    await message.author.send(chunks[i]).catch(err => {
                        message.author.send("I am having a hard time finding that request! Because I am an AI on Discord, I might have trouble with long requests.").catch(err => {});
                    });
                }
            } else {
                await message.author.send(response).catch(err => {
                    message.author.send("I am having a hard time finding that request! Because I am an AI on Discord, I might have trouble with long requests.").catch(err => {});
                });
            }
        } catch (e) {
            console.log(e);
            message.author.send("I am having a hard time finding that request! Because I am an AI on Discord, I might have trouble with long requests.").catch(err => {});
        }
    } else {
        return;
    }
});
// MODMAIL CODE //

client.on(Events.MessageCreate, async message => {

  if (message.guild) return;
  if (message.author.id === client.user.id) return;
  if (!message.author.user) return;
  
  const usesdata = await moduses.findOne({ User: message.author.id });

  if (!usesdata) {

      message.react('👋')

      const modselect = new EmbedBuilder()
      .setColor("White")
      .setThumbnail("https://cdn.discordapp.com/avatars/1046468420037787720/5a6cfe15ecc9df0aa87f9834de38aa07.webp")
      .setAuthor({ name: `📞 Modmail System`})
      .setFooter({ text: `📞 Modmail Selecion`})
      .setTimestamp()
      .setTitle('> Select a Server')
      .addFields({ name: `• Select a Modmail`, value: `> Please submit the Server's ID you are \n> trying to connect to in the modal displayed when \n> pressing the button bellow!`})
      .addFields({ name: `• How do I get the server's ID?`, value: `> To get the Server's ID you will have to enable \n> Developer Mode through the Discord settings, then \n> you can get the Server's ID by right \n> clicking the Server's icon and pressing "Copy Server ID".`})

      const button = new ActionRowBuilder()
      .addComponents(
          new ButtonBuilder()
          .setCustomId('selectmodmail')
          .setLabel('• Select your Server')
          .setStyle(ButtonStyle.Secondary)
      )     

      const msg = await message.reply({ embeds: [modselect], components: [button] });
      const selectcollector = msg.createMessageComponentCollector();

      selectcollector.on('collect', async i => {

          if (i.customId === 'selectmodmail') {

              const selectmodal = new ModalBuilder()
              .setTitle('• Modmail Selector')
              .setCustomId('selectmodmailmodal')

              const serverid = new TextInputBuilder()
              .setCustomId('modalserver')
              .setRequired(true)
              .setLabel('• What server do you want to connect to?')
              .setPlaceholder('Example: "1078641070180675665"')
              .setStyle(TextInputStyle.Short);

              const subject = new TextInputBuilder()
              .setCustomId('subject')
              .setRequired(true)
              .setLabel(`• What's the reason for contacting us?`)
              .setPlaceholder(`Example: "I wanted to bake some cookies, but toowake didn't let me!!!"`)
              .setStyle(TextInputStyle.Paragraph);

              const serveridrow = new ActionRowBuilder().addComponents(serverid)
              const subjectrow = new ActionRowBuilder().addComponents(subject)

              selectmodal.addComponents(serveridrow, subjectrow)

              i.showModal(selectmodal)

          }
      })

  } else {

      if (message.author.bot) return;

      const sendchannel = await client.channels.cache.get(usesdata.Channel);
      if (!sendchannel) {

          message.react('⚠')
          await message.reply('**Oops!** Your **modmail** seems **corrupted**, we have **closed** it for you.')
          return await moduses.deleteMany({ User: usesdata.User });

      } else {

          const msgembed = new EmbedBuilder()
          .setColor("#ecb6d3")
          .setAuthor({ name: `${message.author.username}`, iconURL: `${message.author.displayAvatarURL()}`})
          .setFooter({ text: `📞 Modmail Message - ${message.author.id}`})
          .setTimestamp()
          .setDescription(`${message.content || `**No message provided.**`}`)

          if (message.attachments.size > 0) {

              try {
                  msgembed.setImage(`${message.attachments.first()?.url}`);
              } catch (err) {
                  return message.react('❌')
              }

          }

          const user = await sendchannel.guild.members.cache.get(usesdata.User)
          if (!user) {
              message.react('⚠️')
              message.reply(`⚠️ You have left **${sendchannel.guild.name}**, your **modmail** was **closed**!`)
              sendchannel.send(`⚠️ <@${message.author.id}> left, this **modmail** has been **closed**.`)
              return await moduses.deleteMany({ User: usesdata.User })
          }

          try {

              await sendchannel.send({ embeds: [msgembed] });

          } catch (err) {
              return message.react('❌')
          }
          
          message.react('📧')
      }
  }
})

client.on(Events.InteractionCreate, async interaction => {

  if (!interaction.isModalSubmit()) return;

  if (interaction.customId === 'selectmodmailmodal') {

      const data = await moduses.findOne({ User: interaction.user.id });
      if (data) return await interaction.reply({ content: `You have **already** opened a **modmail**! \n> Do **/modmail close** to close it.`, ephemeral: true });
      else {

          const serverid = interaction.fields.getTextInputValue('modalserver');
          const subject = interaction.fields.getTextInputValue('subject');

          const server = await client.guilds.cache.get(serverid);
          if (!server) return await interaction.reply({ content: `**Oops!** It seems like that **server** does not **exist**, or I am **not** in it!`, ephemeral: true });
          
          const executor = await server.members.cache.get(interaction.user.id);
          if (!executor) return await interaction.reply({ content: `You **must** be a member of **${server.name}** in order to **open** a **modmail** there!`, ephemeral: true});

          const modmaildata = await modschema.findOne({ Guild: server.id });
          if (!modmaildata) return await interaction.reply({ content: `Specified server has their **modmail** system **disabled**!`, ephemeral: true});
          
          const channel = await server.channels.create({
              name: `modmail-${interaction.user.id}`,
              parent: modmaildata.Category,

          }).catch(err => {
              return interaction.reply({ content: `I **couldn't** create your **modmail** in **${server.name}**!`, ephemeral: true});
          })
  
          await channel.permissionOverwrites.create(channel.guild.roles.everyone, { ViewChannel: false });

          const embed = new EmbedBuilder()
          .setColor("White")
          .setThumbnail("https://cdn.discordapp.com/avatars/1046468420037787720/5a6cfe15ecc9df0aa87f9834de38aa07.webp")
          .setAuthor({ name: `📞 Modmail System`})
          .setFooter({ text: `📞 Modmail Opened`})
          .setTimestamp()
          .setTitle(`> ${interaction.user.username}'s Modmail`)
          .addFields({ name: `• Subject`, value: `> ${subject}`})

          const buttons = new ActionRowBuilder()
          .addComponents(
              new ButtonBuilder()
              .setCustomId('deletemodmail')
              .setEmoji('❌')
              .setLabel('Delete')
              .setStyle(ButtonStyle.Secondary),

              new ButtonBuilder()
              .setCustomId('closemodmail')
              .setEmoji('🔒')
              .setLabel('Close')
              .setStyle(ButtonStyle.Secondary)
          )
      
          await moduses.create({
              Guild: server.id,
              User: interaction.user.id,
              Channel: channel.id
          })
          
          await interaction.reply({ content: `Your **modmail** has been opened in **${server.name}**!`, ephemeral: true});
          const channelmsg = await channel.send({ embeds: [embed], components: [buttons] });
          channelmsg.createMessageComponentCollector();

      }
  }
})

client.on(Events.InteractionCreate, async interaction => {

  if (interaction.customId === 'deletemodmail') {

      const closeembed = new EmbedBuilder()
      .setColor("White")
      .setThumbnail("https://cdn.discordapp.com/avatars/1046468420037787720/5a6cfe15ecc9df0aa87f9834de38aa07.webp")
      .setAuthor({ name: `📞 Modmail System`})
      .setFooter({ text: `📞 Modmail Closed`})
      .setTimestamp()
      .setTitle('> Your modmail was Closed')
      .addFields({ name: `• Server`, value: `> ${interaction.guild.name}`})

      const delchannel = await interaction.guild.channels.cache.get(interaction.channel.id);
      const userdata = await moduses.findOne({ Channel: delchannel.id });

      await delchannel.send('❌ **Deleting** this **modmail**..')

      setTimeout(async () => {

          if (userdata) {

              const executor = await interaction.guild.members.cache.get(userdata.User)
              if (executor) {
                  await executor.send({ embeds: [closeembed] });
                  await moduses.deleteMany({ User: userdata.User });
              }

          }

          try {
              await delchannel.delete();
          } catch (err) {
              return;
          }
          
      }, 100)

  }

  if (interaction.customId === 'closemodmail') {

      const closeembed = new EmbedBuilder()
      .setColor("White")
      .setThumbnail("https://cdn.discordapp.com/avatars/1046468420037787720/5a6cfe15ecc9df0aa87f9834de38aa07.webp")
      .setAuthor({ name: `📞 Modmail System`})
      .setFooter({ text: `📞 Modmail Closed`})
      .setTimestamp()
      .setTitle('> Your modmail was Closed')
      .addFields({ name: `• Server`, value: `> ${interaction.guild.name}`})

      const clchannel = await interaction.guild.channels.cache.get(interaction.channel.id);
      const userdata = await moduses.findOne({ Channel: clchannel.id });

      if (!userdata) return await interaction.reply({ content: `🔒 You have **already** closed this **modmail**.`, ephemeral: true})

      await interaction.reply('🔒 **Closing** this **modmail**..')

      setTimeout(async () => {
          
          const executor = await interaction.guild.members.cache.get(userdata.User)
          if (executor) {

              try {
                  await executor.send({ embeds: [closeembed] });
              } catch (err) {
                  return;
              }
              
          }

          interaction.editReply(`🔒 **Closed!** <@${userdata.User}> can **no longer** view this **modmail**, but you can!`)

          await moduses.deleteMany({ User: userdata.User });

      }, 100)

  }
})

client.on(Events.MessageCreate, async message => {

  if (message.author.bot) return;
  if (!message.guild) return;

  const data = await modschema.findOne({ Guild: message.guild.id });
  if (!data) return;

  const sendchanneldata = await moduses.findOne({ Channel: message.channel.id });
  if (!sendchanneldata) return;

  const sendchannel = await message.guild.channels.cache.get(sendchanneldata.Channel);
  const member = await message.guild.members.cache.get(sendchanneldata.User);
  if (!member) return await message.reply(`⚠ <@${sendchanneldata.User} is **not** in your **server**!`)

  const msgembed = new EmbedBuilder()
  .setColor("White")
  .setThumbnail("https://cdn.discordapp.com/avatars/1046468420037787720/5a6cfe15ecc9df0aa87f9834de38aa07.webp")
  .setAuthor({ name: `${message.author.username}`, iconURL: `${message.author.displayAvatarURL()}`})
  .setFooter({ text: `📞 Modmail Received - ${message.author.id}`})
  .setTimestamp()
  .setDescription(`${message.content || `**No message provided.**`}`)

  if (message.attachments.size > 0) {

      try {
          msgembed.setImage(`${message.attachments.first()?.url}`);
      } catch (err) {
          return message.react('❌')
      }

  }

  try {
      await member.send({ embeds: [msgembed] });
  } catch (err) {
      message.reply(`⚠ I **couldn't** message **<@${sendchanneldata.User}>**!`)
      return message.react('❌')
  }
          
  message.react('📧')

})
///prefix system//

client.on('messageCreate', (message) => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const command = args.shift().toLowerCase();

  if (command === 'devtest') {
    const replyMessage = `The bot is working and online!\n My Prefix is: ${prefix}\n My Ping is: ${client.ws.ping}ms\n My Uptime is: ${client.uptime}ms\n I am in ${client.guilds.cache.size} servers!`;
    message.reply(replyMessage);
  }
});

client.on('messageCreate', (message) => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const command = args.shift().toLowerCase();

  if (command === 'dev') {
    const replyMessage = `The bot is owned by:\n- shykh69\n- typedrago\n\nDeveloped by:\n- Hotsuop\n- Titsou™!`;
    message.reply(replyMessage);
  }
});
// Random memme with ?meme
client.on('messageCreate', async (message) => {
  if (message.content.toLowerCase() === '?meme') {
    try {
      const response = await fetch('https://www.reddit.com/r/memes/random/.json');
      const data = await response.json();
      const meme = data[0].data.children[0].data;

      const memeTitle = meme.title;
      const memeImage = meme.url;

      message.channel.send({ content: memeTitle, files: [memeImage] });
    } catch (error) {
      console.error('Error fetching the meme:', error);
      message.reply('There was an error while fetching the meme.');
    }
  }
});
// sunset image with ?sunset
client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}`);
});

client.on('messageCreate', async (message) => {
  if (message.content.toLowerCase() === '?sunset') {
    try {
      const response = await fetch(`https://api.unsplash.com/photos/random?query=sunset&orientation=landscape&client_id=dO6I6GGAh84-fQdTHpAUH2kzeLbd2rxALb-GUL9a7Ic`);
      const data = await response.json();
      const sunsetImage = data.urls.regular;

      message.channel.send(sunsetImage);
    } catch (error) {
      console.error('Error fetching the sunset image:', error);
      message.reply('There was an error while fetching the sunset image.');
    }
  }
});
// weather commannd
client.on('messageCreate', async (message) => {
  if (message.content.startsWith('?weather')) {
    const args = message.content.split(' ');
    if (args.length < 2) {
      message.reply('Please specify a location. Example: `?weather London`');
      return;
    }

    args.shift(); // Remove the command ('?weather')
    const location = args.join(' '); // Join the remaining args as the location

    try {
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(location)}&appid=cde77657814616656ba0de9fec623ed1&units=metric`);
      const weatherData = response.data;

      const weatherDescription = weatherData.weather[0].description;
      const temperature = weatherData.main.temp;
      const humidity = weatherData.main.humidity;
      const windSpeed = weatherData.wind.speed;

      const weatherInfo = `Weather in ${location}: ${weatherDescription}\nTemperature: ${temperature}°C\nHumidity: ${humidity}%\nWind Speed: ${windSpeed} m/s`;

      message.channel.send(weatherInfo);
    } catch (error) {
      console.error('Error fetching weather:', error);
      message.reply('There was an error while fetching the weather - Did you spell the location correctly?');
    }
  }
});
// server info (prefix)
client.on('messageCreate', async (message) => {
  if (message.content.toLowerCase() === '?serverinfo') {
    const guild = message.guild;

    if (!guild) {
      console.error('Guild not found.');
      return;
    }

    const name = guild.name;
    const memberCount = guild.memberCount;
    const owner = guild.ownerId;
    const serverAge = `<t:${Math.floor(guild.createdTimestamp / 1000)}:R>`;

    const embed = {
      color: 0x00ff00, // Green color in decimal format (you can change this)
      title: 'Server Information',
      fields: [
        { name: 'Server Name', value: `> ${name}` },
        { name: 'Server Member Count', value: `> ${memberCount}` },
        { name: 'Server Owner', value: `> ${owner}` },
        { name: 'Server Age', value: `> ${serverAge}` }
      ],
      timestamp: new Date()
    };

    try {
      await message.channel.send({ embeds: [embed] });
    } catch (error) {
      console.error('Error sending embed:', error);
      message.reply('There was an error while sending the server information.');
    }
  }
});
// above is weather
// help command
// is here down

const commandsList = [
  {
    name: 'serverinfo',
    description: 'Get information about the server',
    usage: '?serverinfo',
    category: 'Info',
  },
  {
    name: 'meme',
    description: 'Fetch a random meme',
    usage: '?meme',
    category: 'Fun',
  },
  {
    name: 'sunset',
    description: 'Get a random sunset image',
    usage: '?sunset',
    category: 'Image',
  },
  {
    name: 'weather',
    description: 'Get weather information for a location',
    usage: '?weather <location>',
    category: 'Info',
  },
  {
    name: 'translate',
    description: 'Translate text to a target language',
    usage: '?translate <text> <target_language>',
    category: 'Utilities',
  },
  {
    name: 'slowmode',
    description: 'Set channel slow mode',
    usage: '?slowmode <seconds>',
    category: 'Utilities',
  },
  {
    name: 'joke',
    description: 'Get a random joke',
    usage: '?joke',
    category: 'Fun',
  },
  {
    name: 'ask',
    description: 'Ask the AI a question',
    usage: '?ask <your_question>',
    category: 'Utilities',
  },
  // Add more commands as needed
];

const chunkArray = (array, chunkSize) => {
  const chunks = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    chunks.push(array.slice(i, i + chunkSize));
  }
  return chunks;
};

client.on('messageCreate', async (message) => {
  if (message.author.bot) return;

  if (message.content.toLowerCase() === '?help') {
    // Display categories for help
    const categories = [...new Set(commandsList.map((command) => command.category))];
    const embed = new EmbedBuilder()
      .setColor('#3498db')
      .setTitle('Command Categories')
      .setDescription('List of available categories:')
      .addFields(categories.map((category) => {
        return { name: category, value: `Use ?help ${category.toLowerCase()} for commands in this category` };
      }));
    message.channel.send({ embeds: [embed] });
  } else {
    // Handle commands based on categories
    const commandCategory = message.content.toLowerCase().split(' ')[1];
    const filteredCommands = commandsList.filter((command) =>
      command.category.toLowerCase() === commandCategory.toLowerCase());

  

    const pages = chunkArray(filteredCommands, 5);
    let currentPage = 0;

    const embed = new EmbedBuilder()
      .setColor('#3498db')
      .setTitle(`Commands in ${commandCategory}`)
      .setDescription('List of available commands:')
      .setFooter({ text: `Page ${currentPage + 1}/${pages.length}` });

    embed.addFields(pages[currentPage].map((command) => {
      return { name: command.name, value: `**Description:** ${command.description}\n**Usage:** ${command.usage}` };
    }));

    const helpMessage = await message.channel.send({ embeds: [embed] });

    if (pages.length > 1) {
      await helpMessage.react('⬅️');
      await helpMessage.react('➡️');
    }

    const filter = (reaction, user) => ['⬅️', '➡️'].includes(reaction.emoji.name) && user.id === message.author.id;
    const collector = helpMessage.createReactionCollector({ filter, time: 60000 });

    collector.on('collect', async (reaction) => {
      reaction.users.remove(message.author).catch(console.error);

      if (reaction.emoji.name === '➡️' && currentPage < pages.length - 1) {
        currentPage++;
      } else if (reaction.emoji.name === '⬅️' && currentPage > 0) {
        currentPage--;
      }

      embed.fields = [];
      embed.setFooter({ text: `Page ${currentPage + 1}/${pages.length}` });

      embed.addFields(pages[currentPage].map((command) => {
        return { name: command.name, value: `**Description:** ${command.description}\n**Usage:** ${command.usage}` };
      }));

      await helpMessage.edit({ embeds: [embed] });
    });

    collector.on('end', () => {
      helpMessage.reactions.removeAll().catch(console.error);
    });
  }
});
//translate modual
client.on('messageCreate', async (message) => {
  if (message.author.bot) return;

  const args = message.content.toLowerCase().split(' ');

  if (args[0] === '?translate') {
    const text = args.slice(1, -1).join(' ');
    const targetLanguage = args[args.length - 1];

    if (!text || !targetLanguage) {
      return message.reply('Please provide text and the target language for translation.');
    }

    try {
      const translation = await translate(text, { to: targetLanguage });

      const translatedText = translation.text ? translation.text : 'Unable to translate';

      const embed = new EmbedBuilder()
        .setTitle('Translation')
        .setDescription(`**Original:** ${text}\n**Translated:** ${translatedText}`)
        
        .setColor('#00FFFF')
        .setFooter('Translated using Google Translate');

      message.channel.send({ embeds: [embed] });
    } catch (error) {
      console.error('Error translating text:', error);
      message.reply('An error occurred while translating the text.');
    }
  }
});
//Slow mode
client.on('messageCreate', async (message) => {
  if (message.author.bot) return;

  const args = message.content.toLowerCase().split(' ');

  if (args[0] === '?slowmode') {
    if (!message.member.permissions.has('MANAGE_CHANNELS')) {
      return message.reply('You do not have permission to use this command.');
    }

    const seconds = parseInt(args[1]);

    if (!seconds || isNaN(seconds)) {
      return message.reply('Please provide a valid number of seconds for slow mode.');
    }

    if (seconds < 0 || seconds > 21600) {
      return message.reply('Slow mode duration must be between 0 and 21600 seconds (6 hours).');
    }

    try {
      await message.channel.setRateLimitPerUser(seconds);
      message.reply(`Slow mode set to ${seconds} seconds.`);
    } catch (error) {
      console.error('Error setting slow mode:', error);
      message.reply('An error occurred while setting slow mode.');
    }
  }
});
// brain shop ai 
client.on('messageCreate', async message => {
  if (!message.guild) return; // Ignore messages from DMs
  if (message.author.bot) return; // Ignore messages from bots

  if (message.content.startsWith(`${prefix}ask`)) {
      const prompt = message.content.slice(`${prefix}ask`.length).trim();
      
      try {
          const url = `${config.brainShopApiUrl}?bid=${config.brainShopBotId}&key=${config.brainShopApiKey}&uid=1&msg=${encodeURIComponent(prompt)}`;
          const response = await fetch(url);
          
          if (response.ok) {
              const data = await response.json();
              const answer = data.cnt;

              await message.reply(`The AI says: ${answer}`);
          } else {
              throw new Error('Failed to fetch data from BrainShop API');
          }
      } catch (error) {
          console.error('Error occurred:', error);
          await message.reply('An error occurred while processing your request.');
      }
  }
});
// joke
client.on('messageCreate', async message => {
  if (!message.guild) return; // Ignore DMs
  if (message.author.bot) return; // Ignore bots

  if (message.content === `${prefix}joke`) {
      try {
          const response = await fetch('https://v2.jokeapi.dev/joke/Any?type=single');
          
          if (response.ok) {
              const jokeData = await response.json();
              const joke = jokeData.joke;

              await message.reply(`Here's a joke: ${joke}`);
          } else {
              throw new Error('Failed to fetch joke from the API');
          }
      } catch (error) {
          console.error('Error occurred:', error);
          await message.reply('An error occurred while fetching the joke.');
      }
  }
});
// warn and warns checking and sending

if (!fs.existsSync(warnFilePath)) {
  fs.writeFileSync(warnFilePath, JSON.stringify({}));
}

client.on('messageCreate', async message => {
  if (!message.guild || message.author.bot) return;

  const prefix = '?';
  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const command = args.shift()?.toLowerCase();

  if (command === 'warn') {
    if (args.length < 2) {
      return message.reply('Please provide a user and a reason for the warning.');
    }

    const user = message.mentions.users.first();
    if (!user) {
      return message.reply('Please mention the user you want to warn.');
    }

    const reason = args.slice(1).join(' ');

    const warnings = JSON.parse(fs.readFileSync(warnFilePath, 'utf-8'));

    warnings[user.id] = warnings[user.id] || [];

    warnings[user.id].push({
      moderator: message.author.tag,
      reason,
      timestamp: new Date().toUTCString()
    });

    fs.writeFileSync(warnFilePath, JSON.stringify(warnings, null, 2));

    message.reply(`Successfully warned ${user.tag} for: ${reason}`);
  }

  if (command === 'warns') {
    const user = message.mentions.users.first();
    if (!user) {
      return message.reply('Please mention the user to check their warnings.');
    }

    const warnings = JSON.parse(fs.readFileSync(warnFilePath, 'utf-8'));
    const userWarnings = warnings[user.id] || [];

    if (userWarnings.length === 0) {
      return message.reply(`No warnings found for ${user.tag}.`);
    }

    const warnList = userWarnings.map(
      (warning, index) =>
        `${index + 1}. Moderator: ${warning.moderator}, Reason: ${warning.reason}, Timestamp: ${warning.timestamp}`
    );

    message.channel.send(`Warnings for ${user.tag}:\n${warnList.join('\n')}`);
  }
});
// purge

client.on('messageCreate', async message => {
  if (!message.guild) return;
  if (message.author.bot) return;

  const prefix = '?';
  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const command = args.shift()?.toLowerCase();

  if (command === 'purge') {
      if (!message.member.permissions.has('ADMINISTRATOR')) {
          return message.reply('You must have administrator permissions to use this command.');
      }

      const amount = parseInt(args[0]);

      if (isNaN(amount) || amount <= 0 || amount > 100) {
          return message.reply('Please provide a valid number between 1 and 100 for the amount of messages to delete.');
      }

      try {
          const messages = await message.channel.messages.fetch({ limit: amount });
          await message.channel.bulkDelete(messages);

          const transcript = messages.reduce((acc, msg) => {
              return acc + `<p>${msg.author.tag} (${msg.author.id}) at ${msg.createdAt.toLocaleString()}:</p>\n<p>${msg.content}</p>\n\n`;
          }, '');

          const timestamp = Date.now();
          const fileName = `deleted-messages-${timestamp}.html`;
          const filePath = `./${fileName}`;
          fs.writeFileSync(filePath, generateStyledHTML(transcript));

          const attachment = new MessageAttachment(filePath);
          await message.channel.send({ files: [attachment] });

          setTimeout(() => {
              fs.unlinkSync(filePath); // Deletes the file after a short delay
          }, 5000); // Adjust the delay as needed (5000 milliseconds = 5 seconds)
      } catch (error) {
          console.error('Error deleting messages:', error);
          message.reply('Failed to delete messages.');
      }
  }
  if (command === 'checkpurge') {
      try {
          const log = await message.guild.fetchAuditLogs({ type: 'MESSAGE_BULK_DELETE', limit: 1 });
          const entry = log.entries.first();

          if (!entry) {
              return message.reply('No recent message purges found.');
          }

          const { executor, target, createdTimestamp } = entry;

          const embed = new MessageEmbed()
              .setColor('#00FF00')
              .setTitle('Message Purge Details')
              .addField('Executor', `${executor.tag} (${executor.id})`)
              .addField('Target', `${target.tag} (${target.id})`)
              .addField('Deleted At', new Date(createdTimestamp).toLocaleString());

          const timestamp = Date.now();
          const fileName = `purge-details-${timestamp}.txt`;
          fs.writeFileSync(`./${fileName}`, `Executor: ${executor.tag} (${executor.id})\nTarget: ${target.tag} (${target.id})\nDeleted At: ${new Date(createdTimestamp).toLocaleString()}`);

          const attachment = new MessageAttachment(`./${fileName}`, fileName);
          await message.channel.send({ embeds: [embed], files: [attachment] });
      } catch (error) {
          console.error('Error fetching purge details:', error);
          message.reply('Saved.');
      }
  }
});

// Function to generate styled HTML
function generateStyledHTML(content) {
  return `
  <!DOCTYPE html>
  <html>
  <head>
      <style>
          body {
              background-color: #36393f;
              color: #dcddde;
              font-family: Arial, sans-serif;
              padding: 20px;
              margin: 0;
          }
          .message {
              background-color: #40444b;
              border-radius: 8px;
              padding: 10px;
              margin-bottom: 10px;
          }
          .author {
              font-weight: bold;
              color: #7289da;
          }
          p {
              margin-bottom: 5px;
              line-height: 1.5;
          }
          p:last-child {
              margin-bottom: 0;
          }
      </style>
  </head>
  <body>
      <div class="message">
          ${content}
      </div>
  </body>
  </html>`;
}

//econmey
const economyFile = 'economy.json';

let economyData = {};

try {
  economyData = JSON.parse(fs.readFileSync(economyFile));
} catch (err) {
  console.error('Error loading economy data:', err);
}

client.once('ready', () => {
  console.log(`Logged in as ${client.user.tag}`);
});

client.on('messageCreate', async (message) => {
  if (!message.content.startsWith('?')) return;

  const args = message.content.slice(1).trim().split(/ +/);
  const command = args.shift().toLowerCase();

  if (command === 'balance') {
    const userId = message.author.id;
    const userBalance = economyData[userId] ? economyData[userId].balance : 0;
    message.reply(`Your balance is: 💵 ${userBalance}`);
  }

  if (command === 'work') {
    const userId = message.author.id;
    const earnings = Math.floor(Math.random() * 50) + 20;
    if (!economyData[userId]) {
      economyData[userId] = {
        balance: earnings,
        job: 'Unemployed',
      };
    } else {
      economyData[userId].balance += earnings;
    }
    message.reply(`You worked and earned 💵 ${earnings} coins!`);
    saveData();
  }

  if (command === 'setjob') {
    const userId = message.author.id;
    const newJob = args.join(' ');
    if (!economyData[userId]) {
      message.reply('You need to work first before getting a job!');
    } else {
      economyData[userId].job = newJob;
      message.reply(`Your job has been set to: ${newJob}`);
      saveData();
    }
  }

  if (command === 'daily') {
    const userId = message.author.id;
    const lastDaily = economyData[userId]?.lastDaily || 0;
    const now = Date.now();
    const cooldown = 24 * 60 * 60 * 1000; // 24 hours cooldown for daily command

    if (now - lastDaily < cooldown) {
      const timeLeft = (cooldown - (now - lastDaily)) / (1000 * 60 * 60);
      message.reply(`You've already claimed your daily reward! Come back in ${timeLeft.toFixed(1)} hours.`);
    } else {
      const dailyAmount = Math.floor(Math.random() * 100) + 50; // Daily reward between 50 and 150 coins
      economyData[userId].balance += dailyAmount;
      economyData[userId].lastDaily = now;
      message.reply(`You've claimed your daily reward! 💵 ${dailyAmount} coins have been added to your account.`);
      saveData();
    }
  }

  if (command === 'pay') {
    const userId = message.author.id;
    const recipient = message.mentions.users.first();
    const amount = parseInt(args[1]);

    if (!recipient || isNaN(amount) || amount <= 0) {
      message.reply('Invalid command usage! Use `?pay @user amount`.');
      return;
    }

    if (!economyData[userId] || economyData[userId].balance < amount) {
      message.reply('You don\'t have enough coins for this transaction.');
      return;
    }

    economyData[userId].balance -= amount;
    economyData[recipient.id] = (economyData[recipient.id] || { balance: 0 });
    economyData[recipient.id].balance += amount;
    message.reply(`You've paid 💵 ${amount} coins to ${recipient.username}.`);
    saveData();
  }

  if (command === 'leaderboard') {
    const sortedUsers = Object.entries(economyData).sort((a, b) => b[1].balance - a[1].balance);
    const topUsers = sortedUsers.slice(0, 10); // Display top 10 users

    const leaderboard = topUsers.map(([userId, userData], position) => {
      const user = client.users.cache.get(userId);
      return `${position + 1}. ${user ? user.username : 'Unknown'} - 💵 ${userData.balance}`;
    });

    message.reply(`**Economy Leaderboard**\n${leaderboard.join('\n')}`);
  }

  if (command === 'shop') {
    const shopItems = {
      laptop: { name: 'Laptop', price: 500 },
      phone: { name: 'Phone', price: 300 },
      headphones: { name: 'Headphones', price: 150 },
    };

    const shopList = Object.keys(shopItems)
      .map(item => `${item}: ${shopItems[item].name} - 💵 ${shopItems[item].price}`)
      .join('\n');

    message.reply(`**Welcome to the Shop!**\n${shopList}`);
  }

  if (command === 'buy') {
    const userId = message.author.id;
    const itemName = args[0];
    const shopItems = {
      laptop: { name: 'Laptop', price: 500 },
      phone: { name: 'Phone', price: 300 },
      headphones: { name: 'Headphones', price: 150 },
    };

    if (!shopItems[itemName]) {
      message.reply('That item does not exist in the shop!');
      return;
    }

    if (economyData[userId].balance < shopItems[itemName].price) {
      message.reply('You don\'t have enough coins to buy this item.');
      return;
    }

    economyData[userId].balance -= shopItems[itemName].price;
    economyData[userId].inventory = economyData[userId].inventory || [];
    economyData[userId].inventory.push(shopItems[itemName].name);

    message.reply(`You've successfully bought ${shopItems[itemName].name} for 💵 ${shopItems[itemName].price}.`);
    saveData();
  }

  if (command === 'inventory') {
    const userId = message.author.id;
    const userInventory = economyData[userId]?.inventory || [];

    if (userInventory.length === 0) {
      message.reply('Your inventory is empty.');
    } else {
      const inventoryList = userInventory.map(item => `• ${item}`).join('\n');
      message.reply(`**Your Inventory**\n${inventoryList}`);
    }
  }

  // Other economy-related commands can be added here
});

function saveData() {
  fs.writeFile(economyFile, JSON.stringify(economyData, null, 2), (err) => {
    if (err) {
      console.error('Error saving economy data:', err);
    }
  });
}

// chatsave

//tag
const TAGS_FILE = 'tags.json';

client.once('ready', () => {
  console.log(`Logged in as ${client.user.tag}`);
});

client.on('messageCreate', async (message) => {
  if (!message.guild || message.author.bot || !message.content.startsWith(prefix)) return;

  const [command, ...args] = message.content.slice(prefix.length).trim().split(/ +/);

  if (command === 'addtag') {
    if (!message.member.permissions.has('MANAGE_MESSAGES')) {
      return message.reply('You do not have permission to use this command.');
    }

    const [tagName, ...tagContent] = args;

    if (!tagName || !tagContent.length) {
      return message.reply('Please provide a tag name and content.');
    }

    const tag = tagContent.join(' ');

    try {
      const tags = await getTags();
      tags[tagName] = tag;
      await saveTags(tags);
      message.reply(`Tag '${tagName}' has been added.`);
    } catch (error) {
      console.error('Error adding tag:', error);
      message.reply('There was an error adding the tag.');
    }
  }

  if (command === 'tag') {
    const tagName = args[0];

    if (!tagName) {
      return message.reply('Please provide a tag name.');
    }

    try {
      const tags = await getTags();
      const tagContent = tags[tagName];
      if (tagContent) {
        message.channel.send(tagContent);
      } else {
        message.reply(`Tag '${tagName}' does not exist.`);
      }
    } catch (error) {
      console.error('Error fetching tag:', error);
      message.reply('There was an error fetching the tag.');
    }
  }
});

async function getTags() {
  try {
    const data = await fs.readFile(TAGS_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    if (error.code === 'ENOENT') {
      return {};
    }
    throw error;
  }
}

async function saveTags(tags) {
  await fs.writeFile(TAGS_FILE, JSON.stringify(tags, null, 2));
}

// end tags

client.on('messageCreate', async message => {
  if (!message.guild) return;
  if (message.author.bot) return;

  if (message.content === '?chatsave') {
      if (!message.member.permissions.has('ADMINISTRATOR')) {
          return message.reply('You need to have administrator permissions to use this command.');
      }

      try {
          const messages = await message.channel.messages.fetch({ limit: 100 });
          const transcript = generateStyledHTML(messages);

          const timestamp = Date.now();
          const fileName = `chat-transcript-${timestamp}.html`;
          const filePath = `./${fileName}`;
          fs.writeFileSync(filePath, transcript);

          const attachment = new MessageAttachment(filePath, fileName);
          await message.channel.send({ files: [attachment] });

          setTimeout(() => {
              fs.unlinkSync(filePath); // Deletes the file after a short delay
          }, 5000); // Adjust the delay as needed (5000 milliseconds = 5 seconds)
      } catch (error) {
          console.error('Error saving chat transcript:', error);
          message.reply('Failed to save chat transcript.');
      }
  }
});

//styled HTML
function generateStyledHTML(messages) {
  const htmlHeader = `
      <html>
          <head>
              <style>
                  /* Your CSS styling for the HTML goes here */
                  body {
                      font-family: Arial, sans-serif;
                      background-color: #36393f;
                      color: #fff;
                  }
                  .message {
                      border: 1px solid #5865f2;
                      padding: 10px;
                      margin: 5px 0;
                      border-radius: 5px;
                  }
                  .author {
                      font-weight: bold;
                  }
                  .timestamp {
                      color: #aaa;
                      font-size: 0.8em;
                  }
                  .content {
                      white-space: pre-wrap;
                  }
              </style>
          </head>
          <body>
              <h1>Chat Transcript</h1>
  `;
  const htmlFooter = `
          </body>
      </html>
  `;

  const messageContent = messages.reduce((acc, msg) => {
      return acc + `
          <div class="message">
              <span class="author">${msg.author.tag}</span>
              <span class="timestamp">(${msg.createdAt.toLocaleString()})</span>
              <div class="content">${msg.content}</div>
          </div>
      `;
  }, '');

  return htmlHeader + messageContent + htmlFooter;
}

//summarize
client.on('message', async (message) => {
  if (message.author.bot) return;

  // Handle ?create_report command
  if (message.content.startsWith('?create_report')) {
    const channelId = message.content.substring(15).replace('<#', '').replace('>', '');
    const channel = message.guild.channels.cache.get(channelId);

    if (!channel) {
      message.channel.send('Invalid channel ID.');
      return;
    }

    const reportData = generateReportData(channel);
    const htmlReport = generateHTMLReport(reportData);

    // Send HTML report as a temporary message
    const tempMessage = await message.channel.send({
      files: [{ attachment: Buffer.from(htmlReport), name: 'report.html' }]
    });

    // Delete temporary message after 5 minutes
    setTimeout(() => {
      tempMessage.delete();
    }, 300000);

    // Store report data and timestamp
    reports.push({
      channelId: channel.id,
      reportData: reportData,
      timestamp: new Date().toISOString()
    });
  }
});

// Create a Map to store the server prefixes
const prefixes = new Map();

// Function to retrieve the server prefix
const getPrefix = (guildId) => {
  return prefixes.get(guildId) || '';
};

// Load the prefix commands from the "prefixcommands" folder
client.prefixcommands = new Collection();
const prefixCommandFiles = fs.readdirSync('./prefixcommands').filter(file => file.endsWith('.js'));
for (const file of prefixCommandFiles) {
  const command = require(`./prefixcommands/${file}`);
  client.prefixcommands.set(command.nombre, command);
}

// Rest of your code...

client.on('messageCreate', async (message) => {
  // Ignore messages from bots and non-text channels
  if (message.author.bot || !message.guild) return;

  // Retrieve the server prefix
  const prefix = getPrefix(message.guild.id);

  // Check if the message starts with the prefix
  if (!message.content.startsWith(prefix)) return;

  // Extract the command and arguments
  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const commandName = args.shift().toLowerCase();

  // Check if the command exists in the prefix commands collection
  if (client.prefixcommands.has(commandName)) {
    const command = client.prefixcommands.get(commandName);
    try {
      // Execute the command
      command.run(client, message, args);
    } catch (error) {
      console.error(error);
      message.reply('An error occurred while executing the command.');
    }
  }
});
// Function to generate HTML transcript of deleted messages
function generateHTMLTranscript(deletedMessages) {
  let html = '<html><head><title>Deleted Messages Transcript</title></head><body>';

  for (const message of deletedMessages) {
    html += `<p>${message.author.tag}: ${message.content}</p>`;
  }

  html += '</body></html>';
  return html;
}


// If you want to enable the auto mod command (bad words) uncomment this section (You can config the words and message in config.json know as badwords)
/* client.on('messageCreate', async (message) => {
  const lowerCaseContent = message.content.toLowerCase(); // Lowercase the message content for better matching

  if (config.badWords.some(word => lowerCaseContent.includes(word))) {
    try {
      const warningMessage = await message.reply(config.warningMessage);
      setTimeout(() => {
        warningMessage.delete().catch(console.error); // Delete the warning message after a short delay
      }, 5000); // 5000 milliseconds (5 seconds) - 1000ms = 1 seccond

      await message.delete(); // Delete the message containing the swear word
    } catch (error) {
      console.error('Error:', error);
    }
  }
}); */
//---pend---


//games 1v1
const levelNames2 = ["Unranked", "Bronze", "Silver", "Gold", "Emerald", "Diamond", "Master", "Elite"];
const discordTranscripts = require('discord-html-transcripts');
const duelsSchema = require('./Schemas/1v1Schema');
const duelsLevelSchema = require("./Schemas/1v1Levels");
const chatSchema = require('./Schemas/chat');
 
client.on(Events.InteractionCreate, async i => {
  if (i.isButton()) {
    if (i.customId === 'queue') {
      
      const duelsData = await duelsSchema.findOne({ Guild: i.guild.id })
 
      if (!duelsData) {
        i.reply({ content: "The 1v1 system is currently disabled.", ephemeral: true})
        return;
      }
      
      const category = i.guild.channels.cache.get(duelsData.Category)    
      const logChannel = i.guild.channels.cache.get(duelsData.Logs)
      const transcriptsChannel = i.guild.channels.cache.get(duelsData.Transcript)
 
      const member = i.member
  
      if (!member) {
          i.reply({ content: "This command can only be used by guild members.", ephemeral: true });
          return;
      }
 
      const username = member.user.username.toLowerCase();
      const channelName = username.replace(/ /g, "-");
      const posChannel = await i.guild.channels.cache.find(c => c.name.includes(username) || c.name.includes(channelName));
 
      const openMatchmakingEmbed = new EmbedBuilder()
      .setColor("Green")
      .setAuthor({ 
          name: "Match Open 🎮",
          iconURL: client.user.avatarURL({ dynamic: true, size: 1024 }) 
      })
      .setDescription(`You are already in a match there for you cannot queue again! Wait until your match has been played out!`)
      .setTimestamp()
      .setFooter({ text: `Radiant Utilities | Matchmaking System`})
 
      const dmEmbed = new EmbedBuilder()
      .setColor("Green")
      .setAuthor({ 
          name: "Matchmaking Queue 🎮",
          iconURL: client.user.avatarURL({ dynamic: true, size: 1024 }) 
      })
      .setDescription(`You were added to the matchmaking queue. You can leave this queue at any time by clicking the 'unqueue' button on the queue message.`)
      .setTimestamp()
      .setFooter({ text: `Radiant Utilities | Matchmaking System`})
 
 
      if (posChannel) return await i.reply({ embeds: [openMatchmakingEmbed], ephemeral: true})
 
      const Data2 = await duelsLevelSchema.findOne({ Guild: i.guild.id, User: member.id });
          
      if (!Data2) {
          duelsLevelSchema.create({
              Guild: i.guild.id,
              User: member.id,
              Rank: 0,
              Level: 0
          })
      }
 
      const Data = await duelsSchema.findOne({ Guild: i.guild.id, MatchID: 0 });
      if (!Data) {
          duelsSchema.create({
              Guild: i.guild.id, 
              MatchID: 0,
              MemberOneID: member.id,
              UserID: 0
          })
 
          i.reply({ content: ":white_check_mark:  You were added to the queue!", ephemeral: true })
          member.send({ embeds: [dmEmbed] }).catch(err => {
              return;
          })
 
          const queueEmbed = new EmbedBuilder()
          .setColor("Aqua")
          .setAuthor({ 
              name: "Entered Queue",
              iconURL: client.user.avatarURL({ dynamic: true, size: 1024 }) 
          })
          .setDescription(`${member} has enterd the queue`)
          .setTimestamp()
          .setFooter({ text: "Radiant Utilities | Matchmaking System"})
          logChannel.send({ embeds: [queueEmbed] })
 
      } else if (Data.MemberOneID != member.id) {
          const memberTwo = member
          const guild = i.guild
          if (!guild) return console.log(`Couldn't find guild with ID ${guild}`);
          const memberOne = guild.members.cache.get(Data.MemberOneID);
          if (!memberOne) return i.reply({ content: 'The 1v1 queuing system is down for maintenance.' });
          const channel = await i.guild.channels.create({
              name: `1v1 ${memberOne.user.username} vs ${memberTwo.user.username}`,
              type: ChannelType.GuildText,
              parent: category
          }).catch(err => {
              i.reply({ content: 'The 1v1 queuing system is down for maintenance.' })
          })                   
 
          await duelsSchema.deleteMany({
              Guild: i.guild.id,
              MemberOneID: memberOne.id
          });
 
          const queueEmbed = new EmbedBuilder()
          .setColor("Blue")
          .setAuthor({ 
              name: "Entered Queue",
              iconURL: client.user.avatarURL({ dynamic: true, size: 1024 }) 
          })
          .setDescription(`${memberTwo} has enterd the queue`)
          .setTimestamp()
          .setFooter({ text: "Radiant Utilities | Matchmaking System"})
 
          const guildMemberOne = await channel.guild.members.fetch(memberOne.id).catch(() => null);
          if (!guildMemberOne) {
              return;
          } else {
              channel.permissionOverwrites.create(memberOne, { ViewChannel: true, SendMessages: true });
          }
 
          const guildMemberTwo = await channel.guild.members.fetch(memberTwo.id).catch(() => null);
          if (!guildMemberTwo) {
              return;
          } else {
              channel.permissionOverwrites.create(memberTwo, { ViewChannel: true, SendMessages: true });
          }
 
          i.reply({ content: `:white_check_mark:  You were added to the queue! You can see it here: ${channel}`, ephemeral: true })
          memberTwo.send({ embeds: [dmEmbed] }).catch(err => {
              return;
          })
 
          memberOne.send(`Hey ${memberOne}, your 1v1 has started, you are going against ${memberTwo}, you can view it here: ${channel}. Good luck!`).catch(err => {
              return;
          });
 
          memberTwo.send(`Hey ${memberTwo}, your 1v1 has started, you are going against ${memberOne}, you can view it here: ${channel}. Good luck!`).catch(err => {
              return;
          });
 
          if (logChannel) {
            await logChannel.send({ embeds: [queueEmbed] });
          } else {
            return;
          }
 
          const logEmbed = new EmbedBuilder()
          .setColor('Green')
          .setAuthor({ 
              name: "New Match Started",
              iconURL: client.user.avatarURL({ dynamic: true, size: 1024 }) 
          })
          .setDescription(`Match started between ${memberOne} and ${memberTwo}`)
          .setTimestamp()
          .setFooter({ text: "Radiant Utilities | Matchmaking System"})
 
          if (logChannel) {
          await logChannel.send({ embeds: [logEmbed] })
        } else {
          return;
        }
 
          const levelData = await duelsLevelSchema.findOne({ Guild: i.guild.id, User: memberOne.id});
          const levelData2 = await duelsLevelSchema.findOne({ Guild: i.guild.id, User: memberTwo.id });
 
          const embeder2 = new EmbedBuilder()
          .setColor("DarkBlue")
          .setAuthor({ 
              name: "Matchmaking",
              iconURL: client.user.avatarURL({ dynamic: true, size: 1024 }) 
          })
          .setDescription(`**A Radiant Utilities Valorant match has been found for ${memberOne} and ${memberTwo}**\n\n__**Team 1**__\nDiscord: ${memberOne}\nDiscord ID: ${memberOne.id}\nXP: ${levelData ? levelData.Rank : 'Unknown'}\n\n__**Team 2**__\nDiscord: ${memberTwo}\nDiscord ID: ${memberTwo.id}\nXP: ${levelData2 ? levelData2.Rank : 'Unknown'}\n\n__**How to play**__\nYou must tell your opponent your __Valorant__ username\nYou must play a __deathmatch in Valorant__\nThe winner is decided by __best of 5__\n\n__**Rules**__\nYou're NOT allowed to have friends to spectate.\n__Be respectful to your opponent!__`);
 
          const embeder = new EmbedBuilder()
          .setColor("DarkBlue")       
          .setDescription(`**When the game is over, use the reactions below to react with the __winner__**\n\n${memberOne.user.tag} **won?** 1️⃣\n\n${memberTwo.user.tag} **won?** 2️⃣\n\n**Need assistance?** React with ❓`)
          .setFooter({ text: "Radiant Utilities | Matchmaking System"})
          .setTimestamp();
 
          const message = await channel.send({ embeds: [embeder2, embeder], content: `${memberOne} ${memberTwo}` });
          await message.react('1️⃣');
          await message.react('2️⃣'); 
          await message.react('❓');
 
          let resolved = false;
          let roleHasPermissions = false;
          
          const filter = (reaction, user) => reaction.emoji.name === '1️⃣' || reaction.emoji.name === '2️⃣' || reaction.emoji.name === '❓' && !user.bot;
 
          const collector = message.createReactionCollector({ filter, max: 100 });
          
          collector.on('collect', async (collected, user) => {
          if (collected.count === 3) {
              
              if (collected.emoji.name === '1️⃣') {
 
                  const attachment = await discordTranscripts.createTranscript(channel);
 
                  channel.delete();
 
                  //XP system
 
                  duelsLevelSchema.findOne({ Guild: i.guild.id, User: memberOne.id }, async (err, data) => {
 
                      if (err) throw err;
 
                      if (!data) {
                          duelsLevelSchema.create({
                              Guild: i.guild.id, 
                              User: memberOne.id,
                              Rank: 100,
                              Level: 0
                          })
                      }
                  })
 
                  const give = Math.floor(Math.random() * 81) + 60;
 
                  const levelData = await duelsLevelSchema.findOne({ Guild: i.guild.id, User: memberOne.id});
 
                  if (!levelData) return;
 
                  const levelThresholds = [0, 300, 750, 1250, 1750, 2500, 3500, 5000, 1000000000000000]; // XP thresholds for each level
                  const currentLevel = levelData.Level;
 
                  const nextLevel = currentLevel + 1;
                  const nextLevelThreshold = levelThresholds[nextLevel];
 
                  const requiredXP = nextLevelThreshold ? nextLevelThreshold : 0;
 
                  if (levelData.Rank + give >= requiredXP) {
 
                      levelData.Rank += give;
                      levelData.Level += 1;
                      await levelData.save();
 
                  } else {
                      levelData.Rank += give;
                      levelData.save()
                  }
 
                  //XP system take
                  duelsLevelSchema.findOne({ Guild: i.guild.id, User: memberTwo.id }, async (err, data) => {
                      if (err) throw err;
                  
                      if (!data) {
                          duelsLevelSchema.create({
                              Guild: i.guild.id, 
                              Guild: guildId,
                              User: memberOne.id
                          })
                      }
                  });
                  
                  let take = Math.floor(Math.random() * 30) + 50;
                  
                  const levelData1 = await duelsLevelSchema.findOne({ Guild: i.guild.id, User: memberTwo.id });
                  
                  if (!levelData1) return;
                  
                  const levelThresholds1 = [0, 300, 750, 1250, 1750, 2500, 3500, 5000, 1000000000000000]; // XP thresholds for each level
                  const currentLevel1 = levelData1.Level;
                  
                  if (levelData1.Rank - take <= 0) {
                      take = levelData1.Rank;
                      levelData1.Rank = 0;
                      levelData1.Level = Math.max(0, currentLevel1 - 1);
                      levelData1.save();
                  } else {
                      const prevLevelThreshold = levelThresholds1[currentLevel1] || 0;
                      const requiredXP = prevLevelThreshold;
                  
                      if (levelData1.Rank - take < requiredXP && currentLevel1 > 0) {
                          levelData1.Rank -= take;
                          levelData1.Level = Math.max(0, currentLevel1 - 1);
                          await levelData1.save();
                      } else {
                          levelData1.Rank -= take;                            
                          await levelData1.save();
                      }
                  }
 
                  const memberOneWinner = new EmbedBuilder()
                  .setColor('Gold')
                  .setAuthor({ 
                      name: "Match Ended",
                      iconURL: client.user.avatarURL({ dynamic: true, size: 1024 }) 
                  })
                  .setDescription(`${memberOne} has won the match!`)
                  .addFields({ name: `${memberOne.user.tag}`, value: `+${give} (${levelData.Rank})`, inline: true})
                  .addFields({ name: `${memberTwo.user.tag}`, value: `-${take} (${levelData1.Rank})`, inline: true})
                  .setTimestamp()
                  .setFooter({ text: 'Radiant Utilities | Matchmaking System'})
 
                  const memberOneWinnerTranscripts = new EmbedBuilder()
                  .setColor('Gold')
                  .setAuthor({ 
                      name: "Match Ended",
                      iconURL: client.user.avatarURL({ dynamic: true, size: 1024 }) 
                  })
                  .setDescription(`${memberOne}'s and ${memberTwo}'s match history.`)
                  .addFields({ name: `${memberOne.user.tag}`, value: `+${give} (${levelData.Rank})`, inline: true})
                  .addFields({ name: `${memberTwo.user.tag}`, value: `-${take} (${levelData1.Rank})`, inline: true})
                  .setTimestamp()
                  .setFooter({ text: 'Radiant Utilities | Matchmaking System'})
 
                  const levelObj = await duelsLevelSchema.findOne({ Guild: i.guild.id, User: memberOne.id });
 
                  const levelName = levelNames2[levelObj.Level];                            
 
                  const levelObj2 = await duelsLevelSchema.findOne({ Guild: i.guild.id, User: memberTwo.id });
                  
                  const levelName2 = levelNames2[levelObj2.Level]; 
 
                  memberOne.send({ content: `You won the match and earned +**${give}** XP!\n\nCurrent XP: **${levelData.Rank}**\n\nCurrent rank: **${levelName}**`}).catch(err => {
                      return;
                  })
 
                  memberTwo.send({ content: `You unfortunately lost the match, queue again to gain your XP back!\n\nXP lost: -**${take}**\n\nCurrent XP: **${levelData1.Rank}**\n\nCurrent rank: **${levelName2}**`}).catch(err => {
                      return;
                  })
                  
                  if (transcriptsChannel) {
                    transcriptsChannel.send({
                        files: [attachment],
                        embeds: [memberOneWinnerTranscripts]
                    });
                  } else {
                    return;
                  }
 
                  if (logChannel) {
                    logChannel.send({ embeds: [memberOneWinner] });
                  } else {
                    return;
                  }
              } else if (collected.emoji.name === '2️⃣') {
 
                  const attachment = await discordTranscripts.createTranscript(channel);
 
                  channel.delete();
 
                  // XP system
                  duelsLevelSchema.findOne({ Guild: i.guild.id, User: memberTwo.id }, async (err, data) => {
                    if (err) throw err;

                    if (!data) {
                      await duelsLevelSchema.create({
                        Guild: i.guild.id,
                        User: memberTwo.id,
                        Rank: 100,
                        Level: 0
                      });
                    }
                  });

                  const give = Math.floor(Math.random() * 61) + 80;

                  const levelData = await duelsLevelSchema.findOne({ Guild: i.guild.id, User: memberTwo.id });

                  if (!levelData) return;

                  const levelThresholds = [0, 300, 750, 1250, 1750, 2500, 3500, 5000, 1000000000000000]; // XP thresholds for each level
                  const currentLevel = levelData.Level;

                  const nextLevel = currentLevel + 1;
                  const nextLevelThreshold = levelThresholds[nextLevel];

                  const requiredXP = nextLevelThreshold || 0;

                  if (levelData.Rank + give >= requiredXP) {
                    levelData.Rank += give;
                    levelData.Level += 1;
                    await levelData.save();
                  } else {
                    levelData.Rank += give;
                    levelData.save();
                  }
 
                  //XP system take
                  duelsLevelSchema.findOne({ Guild: i.guild.id, User: memberOne.id }, async (err, data) => {
                      if (err) throw err;
                  
                      if (!data) {
                          duelsLevelSchema.create({
                              Guild: i.guild.id, 
                              User: memberOne.id
                          })
                      }
                  });
                  
                  let take = Math.floor(Math.random() * 30) + 50;
                  
                  const levelData1 = await duelsLevelSchema.findOne({ Guild: i.guild.id, User: memberOne.id });
                  
                  if (!levelData1) return;
                  
                  const levelThresholds1 = [0, 300, 750, 1250, 1750, 2500, 3500, 5000, 1000000000000000]; // XP thresholds for each level
                  const currentLevel1 = levelData1.Level;
                  
                  if (levelData1.Rank - take <= 0) {
                      take = levelData1.Rank;
                      levelData1.Rank = 0;                                
                      levelData1.Level = Math.max(0, currentLevel1 - 1);
                      levelData1.save();
                  } else {
                      const prevLevelThreshold = levelThresholds1[currentLevel1] || 0;
                      const requiredXP = prevLevelThreshold;
                  
                      if (levelData1.Rank - take < requiredXP && currentLevel1 > 0) {
                          levelData1.Rank -= take;
                          levelData1.Level = Math.max(0, currentLevel1 - 1);
                          await levelData1.save();
                      } else {
                          levelData1.Rank -= take;
                          await levelData1.save();
                      }
                  }
                  //XP system end take
 
                  const memberTwoWinner = new EmbedBuilder()
                  .setColor('Gold')
                  .setAuthor({ 
                      name: "Match Ended",
                      iconURL: client.user.avatarURL({ dynamic: true, size: 1024 }) 
                  })
                  .setDescription(`${memberTwo} has won the match!`)
                  .addFields({ name: `${memberTwo.user.tag}`, value: `+${give} (${levelData.Rank})`, inline: true})
                  .addFields({ name: `${memberOne.user.tag}`, value: `-${take} (${levelData1.Rank})`, inline: true})
                  .setTimestamp()
                  .setFooter({ text: 'Radiant Utilities | Matchmaking System'})
 
                  const memberTwoWinnerTranscripts = new EmbedBuilder()
                  .setColor('Gold')
                  .setAuthor({ 
                      name: "Match Ended",
                      iconURL: client.user.avatarURL({ dynamic: true, size: 1024 }) 
                  })
                  .setDescription(`${memberTwo}'s and ${memberOne}'s match history.`)
                  .setTimestamp()
                  .setFooter({ text: 'Radiant Utilities | Matchmaking System'})
 
                  const levelObj = await duelsLevelSchema.findOne({ Guild: i.guild.id, User: memberOne.id });
 
                  const levelName = levelNames2[levelObj.Level];                            
 
                  const levelObj2 = await duelsLevelSchema.findOne({ Guild: i.guild.id, User: memberTwo.id });
                  
                  const levelName2 = levelNames2[levelObj2.Level]; 
 
                  memberTwo.send({ content: `You won the match and earned +**${give}** XP!\n\nCurrent XP: **${levelData.Rank}**\n\nCurrent rank: **${levelName2}**`}).catch(err => {
                      return;
                  })
 
                  memberOne.send({ content: `You unfortunately lost the match, queue again to gain your XP back!\n\nXP lost: -**${take}**\n\nCurrent XP: **${levelData1.Rank}**\n\nCurrent rank: **${levelName}**`}).catch(err => {
                      return;
                  })
                  
                  if (transcriptsChannel) {
                    transcriptsChannel.send({
                        files: [attachment],
                        embeds: [memberTwoWinnerTranscripts]
                    });
                  } else {
                    return;
                  }
 
                  if (logChannel) {
                    logChannel.send({ embeds: [memberTwoWinner] });
                  } else {
                    return;
                  }
              } 
          }
 
          if (collected.emoji.name === '❓' && !resolved && !roleHasPermissions) {
              const duelsData = await duelsSchema.findOne({ Guild: i.guild.id })
 
              const role = i.guild.roles.cache.get(duelsData.Role)
              channel.permissionOverwrites.create(role, { ViewChannel: true, SendMessages: true });
              roleHasPermissions = true;
              resolved = true;
 
              const assistanceEmbed = new EmbedBuilder()
              .setColor('Orange')
              .setAuthor({ 
                  name: "Staff Assistance",
                  iconURL: client.user.avatarURL({ dynamic: true, size: 1024 }) 
              })
              .setDescription(`${user} has called for staff assistance.`)
              .setTimestamp()
              .setFooter({ text: 'Radiant Utilities | Matchmaking System'})
          
              channel.send(`${role} - ${user.tag} has called for staff assistance.`).catch(collected => {
                  channel.send('The voting system is down for maintenance.');
              });
 
              logChannel.send({ embeds: [assistanceEmbed] })
              await chatSchema.create({ 
                  Guild: i.guild.id, 
                  MemberID: user.id,
                  ChannelId: channel.id,
                  AskedForSuport: true,
              })
 
          } else if (collected.emoji.name === '❓' && resolved) {
              const member = await collected.message.guild.members.fetch(user);
              if (member === memberOne || member === memberTwo) {
                  return;
              }
              if (member.roles.cache.has(role.id)) {
 
                  const resolvedEmbed = new EmbedBuilder()
                  .setColor('Purple')
                  .setAuthor({ 
                      name: "Match Resolved",
                      iconURL: client.user.avatarURL({ dynamic: true, size: 1024 }) 
                  })
                  .setDescription(`${member} has resolved the match.`)
                  .setTimestamp()
                  .setFooter({ text: 'Radiant Utilities | Matchmaking System'})
 
                  channel.send(`${member.user.tag} has resolved the match. React to the ❓ if you need any help.`);
                  channel.permissionOverwrites.create(role, { ViewChannel: false, SendMessages: false });
 
                  if (logChannel) {
                    logChannel.send({ embeds: [resolvedEmbed] });
                  } else {
                    return;
                  }
 
                  resolved = false;
                  roleHasPermissions = false;
              }
          }
          
          });                                                             
 
      } else if (Data.MemberOneID === member.id) {
          i.reply({ content: "You have already entered a queue!", ephemeral: true})
      }  
    }
  }
})
 
client.on(Events.InteractionCreate, async i => {
  if (i.isButton()) {
      if (i.customId === 'unqueue') {
 
          const duelsData = await duelsSchema.findOne({ Guild: i.guild.id });
 
          if (!duelsData) {
              i.reply({ content: "The 1v1 system is currently disabled.", ephemeral: true });
              return;
          }
 
          const member = i.member;
 
          if (!member) {
              i.reply({ content: "This command can only be used by guild members.", ephemeral: true });
              return;
          }
 
          const username = member.user.username.toLowerCase();
          const channelName = username.replace(/ /g, "-");
          const posChannel = await i.guild.channels.cache.find(c => c.name.includes(username) || c.name.includes(channelName));
 
          const unqueueEmbed = new EmbedBuilder()
              .setColor('Red')
              .setAuthor({
                  name: "Left Queue",
                  iconURL: client.user.avatarURL({ dynamic: true, size: 1024 })
              })
              .setDescription(`${member} has left the queue`)
              .setTimestamp()
              .setFooter({ text: "Radiant Utilities | Matchmaking System" });
 
          const openMatchmakingEmbed = new EmbedBuilder()
              .setColor("Green")
              .setAuthor({
                  name: "Match Open 🎮",
                  iconURL: client.user.avatarURL({ dynamic: true, size: 1024 })
              })
              .setDescription(`You are already in a match there for you cannot unqueue!`)
              .setTimestamp()
              .setFooter({ text: `Radiant Utilities | Matchmaking System` });
 
          if (posChannel) return await i.reply({ embeds: [openMatchmakingEmbed], ephemeral: true });
 
          const inQueueEmbed = new EmbedBuilder()
              .setColor("Green")
              .setAuthor({
                  name: "Matchmaking Queue 🎮",
                  iconURL: client.user.avatarURL({ dynamic: true, size: 1024 })
              })
              .setDescription(`You have not entered a queue yet and can there for not unqueue.`)
              .setTimestamp()
              .setFooter({ text: `Radiant Utilities | Matchmaking System` });
 
          const dmUnqueue = new EmbedBuilder()
              .setColor("Red")
              .setAuthor({
                  name: "Left Queue",
                  iconURL: client.user.avatarURL({ dynamic: true, size: 1024 })
              })
              .setDescription('You have successfully left the queue!');
 
          const data = await duelsSchema.findOne({ Guild: i.guild.id, MemberOneID: member.id });
 
          if (data) {
              duelsSchema.deleteMany({ MemberOneID: member.id }, async (err, data) => {
                  i.reply({ content: ":white_check_mark: You were removed from the queue!", ephemeral: true });
                  member.send({ embeds: [dmUnqueue] }).catch(err => {
                      return;
                  });
 
                  const logChannel = i.guild.channels.cache.get(duelsData.Logs);
 
                  if (!logChannel) {
                    return;
                  } else {
                      logChannel.send({ embeds: [unqueueEmbed] });
                  }
              });
          } else {
              await i.reply({ embeds: [inQueueEmbed], ephemeral: true });
          }
 
      }
  }
});
///////////////////////////////////////////end 1v1/////////////////////////////////////



///logs roles//
const inviteSchema = require('./Schemas/inviteSchema');

const invites = new Collection();
const wait = require("timers/promises").setTimeout;

client.on('ready', async () => {

  await wait(2000);

  client.guilds.cache.forEach(async (guild) => {

      const clientMember = guild.members.cache.get(client.user.id);

      if (!clientMember.permissions.has(PermissionsBitField.Flags.ManageGuild)) return;

      const firstInvites = await guild.invites.fetch().catch(err => {console.log(err)});

      if (firstInvites) {
          invites.set(guild.id, new Collection(firstInvites.map((invite) => [invite.code, invite.uses])));
      }
  });
});

 
client.on(Events.GuildMemberAdd, async member => {
 
    const Data = await inviteSchema.findOne({ Guild: member.guild.id});
    if (!Data) return;
 
    const channelID = Data.Channel;
 
    const channel = await member.guild.channels.cache.get(channelID);
 
    const newInvites = await member.guild.invites.fetch();
 
    const oldInvites = invites.get(member.guild.id);
 
    const invite = newInvites.find(i => i.uses > oldInvites.get(i.code));
 
    if (!invite) return await channel.send(`${member.user.tag} joined the server using an unknown invite.  This could possibly a vanity invite link if your server has one.`)
 
    const inviter = await client.users.fetch(invite.inviter.id);
 
    inviter 
        ? channel.send(`${member.user.tag} joined the server using the invite ${invite.code} from ${inviter.tag}.  The invite was used ${invite.uses} times since its creation`)
        : channel.send(`${member.user.tag} joined the server but I can't find what invite they used to do it`);
})
 


//end//
/**
 * This arrow function runs periodically using setInterval. It fetches banned users from a database and checks if their ban time has expired.
 * If a ban has expired, it removes the ban from the corresponding guild and deletes the ban entry from the database.
 */
setInterval(async () => {
  try {
    const bans = await banschema.find();
    if (!bans) return;

    for (const ban of bans) {
      if (ban.Time > Date.now()) continue;

      const server = await client.guilds.cache.get(ban.Guild);
      if (!server) {
        console.log('No server found');
        await banschema.deleteMany({ Guild: ban.Guild });
        continue;
      }

      const guildBans = await server.bans.fetch();
      if (guildBans.size === 0) {
        console.log('No bans found');
        await banschema.deleteMany({ Guild: ban.Guild });
        continue;
      }

      const user = client.users.cache.get(ban.User);
      if (!user) {
        console.log('No user found');
        await banschema.deleteMany({ User: ban.User, Guild: ban.Guild });
        continue;
      }

      await server.bans.remove(ban.User).catch((err) => {
        console.log('Could not unban');
      });

      await banschema.deleteMany({ User: ban.User, Guild: ban.Guild });
    }
  } catch (error) {
    console.error(error);
  }
}, 30000);

//end///
//chat gpt//




/* const configuration = new Configuration({
  apiKey: 'your_openai_api_key'
});
const openai = new OpenAIApi(configuration);

const BOT_CHANNEL = "Your_chatbot_channel_id"
client.on('messageCreate', async (message) => {
  if (message.author.bot) return;
  if (message.channel.id !== BOT_CHANNEL)  return;
  if (message.content.startsWith('!')) return;

  let conversationLog = [
    { role: 'system', content: 'You are a friendly chatbot.' },
  ];

  try {
    await message.channel.sendTyping();
    let prevMessages = await message.channel.messages.fetch({ limit: 15 });
    prevMessages.reverse();
    
    prevMessages.forEach((msg) => {
      if (msg.content.startsWith('!')) return;
      if (msg.author.id !== client.user.id && message.author.bot) return;
      if (msg.author.id == client.user.id) {
        conversationLog.push({
          role: 'assistant',
          content: msg.content,
          name: msg.author.username
            .replace(/\s+/g, '_')
            .replace(/[^\w\s]/gi, ''),
        });
      }

      if (msg.author.id == message.author.id) {
        conversationLog.push({
          role: 'user',
          content: msg.content,
          name: message.author.username
            .replace(/\s+/g, '_')
            .replace(/[^\w\s]/gi, ''),
        });
      }
    });

    const result = await openai
      .createChatCompletion({
        model: 'gpt-3.5-turbo',
        messages: conversationLog,
        // max_tokens: 256, // limit token usage
      })
      .catch((error) => {
        console.log(`OPENAI ERR: ${error}`);
      });
    message.reply(result.data.choices[0].message);
  } catch (error) {
    console.log(`ERR: ${error}`);
  }
}); */






//end//
//verify systemm start//


const capschema = require('./Schemas/verify');
const verifyusers = require('./Schemas/verifyusers');
 
client.on(Events.InteractionCreate, async interaction => {
 
    if (interaction.guild === null) return;
 
    const verifydata = await capschema.findOne({ Guild: interaction.guild.id });
    const verifyusersdata = await verifyusers.findOne({ Guild: interaction.guild.id, User: interaction.user.id });
 
    if (interaction.customId === 'verify') {
 
        if (!verifydata) return await interaction.reply({ content: `The **verification system** has been disabled in this server!`, ephemeral: true});
 
        if (verifydata.Verified.includes(interaction.user.id)) return await interaction.reply({ content: 'You have **already** been verified!', ephemeral: true})
        else {
 
            let letter = ['0','1','2','3','4','5','6','7','8','9','a','A','b','B','c','C','d','D','e','E','f','F','g','G','h','H','i','I','j','J','f','F','l','L','m','M','n','N','o','O','p','P','q','Q','r','R','s','S','t','T','u','U','v','V','w','W','x','X','y','Y','z','Z',]
            let result = Math.floor(Math.random() * letter.length);
            let result2 = Math.floor(Math.random() * letter.length);
            let result3 = Math.floor(Math.random() * letter.length);
            let result4 = Math.floor(Math.random() * letter.length);
            let result5 = Math.floor(Math.random() * letter.length);
 
            const cap = letter[result] + letter[result2] + letter[result3] + letter[result4] + letter[result5];
            console.log(cap)
 
            const captcha = new CaptchaGenerator()
            .setDimension(150, 450)
            .setCaptcha({ text: `${cap}`, size: 60, color: "red"})
            .setDecoy({ opacity: 0.5 })
            .setTrace({ color: "red" })
 
            const buffer = captcha.generateSync();
 
            const verifyattachment = new AttachmentBuilder(buffer, { name: `captcha.png`});
 
            const verifyembed = new EmbedBuilder()
            .setColor('Green')
            .setAuthor({ name: `✅ Verification Proccess`})
            .setFooter({ text: `✅ Verification Captcha`})
            .setTimestamp()
            .setImage('attachment://captcha.png')
            .setThumbnail('https://images-ext-2.discordapp.net/external/onEO9D9OUhbAlUwHEufMANlozh8GfT2cJAAbyfMF0kE/%3Fsize%3D1024/https/cdn.discordapp.com/avatars/1023810715250860105/388e4d2421ca6223424895dce4003e2c.png?width=656&height=656')
            .setTitle('> Verification Step: Captcha')
            .addFields({ name: `• Verify`, value: '> Please use the button bellow to \n> submit your captcha!'})
 
            const verifybutton = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                .setLabel('✅ Enter Captcha')
                .setStyle(ButtonStyle.Success)
                .setCustomId('captchaenter')
            )
 
            const vermodal = new ModalBuilder()
            .setTitle('Verification')
            .setCustomId('vermodal')
 
            const answer = new TextInputBuilder()
            .setCustomId('answer')
            .setRequired(true)
            .setLabel('• Please sumbit your Captcha code')
            .setPlaceholder('Your captcha code')
            .setStyle(TextInputStyle.Short)
 
            const vermodalrow = new ActionRowBuilder().addComponents(answer);
            vermodal.addComponents(vermodalrow);
 
            const vermsg = await interaction.reply({ embeds: [verifyembed], components: [verifybutton], ephemeral: true, files: [verifyattachment] });
 
            const vercollector = vermsg.createMessageComponentCollector();
 
            vercollector.on('collect', async i => {
 
                if (i.customId === 'captchaenter') {
                    i.showModal(vermodal);
                }
 
            })
 
            if (verifyusersdata) {
 
                await verifyusers.deleteMany({
                    Guild: interaction.guild.id,
                    User: interaction.user.id
                })
 
                await verifyusers.create ({
                    Guild: interaction.guild.id,
                    User: interaction.user.id,
                    Key: cap
                })
 
            } else {
 
                await verifyusers.create ({
                    Guild: interaction.guild.id,
                    User: interaction.user.id,
                    Key: cap
                })
 
            }
        } 
    }
});
 
client.on(Events.InteractionCreate, async interaction => {
 
    if (!interaction.isModalSubmit()) return;
 
    if (interaction.customId === 'vermodal') {
 
        const userverdata = await verifyusers.findOne({ Guild: interaction.guild.id, User: interaction.user.id });
        const verificationdata = await capschema.findOne({ Guild: interaction.guild.id });
 
        if (verificationdata.Verified.includes(interaction.user.id)) return await interaction.reply({ content: `You have **already** verified within this server!`, ephemeral: true});
 
        const modalanswer = interaction.fields.getTextInputValue('answer');
        if (modalanswer === userverdata.Key) {
 
            const verrole = await interaction.guild.roles.cache.get(verificationdata.Role);
 
            try {
                await interaction.member.roles.add(verrole);
            } catch (err) {
                return await interaction.reply({ content: `There was an **issue** giving you the **<@&${verificationdata.Role}>** role, try again later!`, ephemeral: true})
            }
 
            await interaction.reply({ content: 'You have been **verified!**', ephemeral: true});
            await capschema.updateOne({ Guild: interaction.guild.id }, { $push: { Verified: interaction.user.id }});
 
        } else {
            await interaction.reply({ content: `**Oops!** It looks like you **didn't** enter the valid **captcha code**!`, ephemeral: true})
        }
    }
});
//verify system end//

///// uncoment this if your bot on top/gg
//top.gg stats//
/*client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}`);
  postBotStats();
});

async function postBotStats() {
  try {
    await topggAPI.postStats({
      serverCount: client.guilds.cache.size,
      shardId: client.shard?.ids[0] || 0, // If sharding, use the first shard ID
      shardCount: client.shard?.count || 1, // If sharding, use the total shard count
    });
    console.log('Successfully posted bot stats to top.gg');
  } catch (error) {
    console.error('Failed to post bot stats to top.gg:', error);
  }
};*/
//end//
//boton//
//noprefix//
// Load the no-prefix commands
client.noprefixcommands = new Collection();
const noprefixCommandFiles = fs.readdirSync('./noprefixcommands').filter(file => file.endsWith('.js'));
for (const file of noprefixCommandFiles) {
  const command = require(`./noprefixcommands/${file}`);
  client.noprefixcommands.set(command.name, command);
}
// ... Rest of your code ...

// Message event handler
client.on('messageCreate', async (message) => {
  // Ignore messages from bots and non-text channels
  if (message.author.bot || !message.guild) return;

  // Check if the message content matches any of the no-prefix command names
  const commandName = message.content.toLowerCase();
  if (client.noprefixcommands.has(commandName)) {
    const command = client.noprefixcommands.get(commandName);
    try {
      // Execute the command
      command.execute(client, message);
    } catch (error) {
      console.error(error);
      message.reply('An error occurred while executing the command.');
    }
  }
});
//end
///leveling-system//
const levelSchema = require('./Schemas/level');
const levelschema = require('./Schemas/levelsetup');

client.on(Events.MessageCreate, async (message, err) => {

    const { guild, author } = message;
    if (message.guild === null) return;
    const leveldata = await levelschema.findOne({ Guild: message.guild.id });

    if (!leveldata || leveldata.Disabled === 'disabled') return;
    let multiplier = 1;
    
    multiplier = Math.floor(leveldata.Multi);
    

    if (!guild || author.bot) return;

    levelSchema.findOne({ Guild: guild.id, User: author.id}, async (err, data) => {

        if (err) throw err;

        if (!data) {
            levelSchema.create({
                Guild: guild.id,
                User: author.id,
                XP: 0,
                Level: 0
            })
        }
    })

    const channel = message.channel;

    const give = 1;

    const data = await levelSchema.findOne({ Guild: guild.id, User: author.id});

    if (!data) return;

    const requiredXP = data.Level * data.Level * 20 + 20;

    if (data.XP + give >= requiredXP) {

        data.XP += give;
        data.Level += 1;
        await data.save();
        
        if (!channel) return;

        const levelembed = new EmbedBuilder()
        .setColor("Purple")
        .setTitle(`> ${author.username} has Leveled Up!`)
        .setFooter({ text: `⬆ ${author.username} Leveled Up`})
        .setTimestamp()
        .setThumbnail('https://images-ext-2.discordapp.net/external/onEO9D9OUhbAlUwHEufMANlozh8GfT2cJAAbyfMF0kE/%3Fsize%3D1024/https/cdn.discordapp.com/avatars/1023810715250860105/388e4d2421ca6223424895dce4003e2c.png?width=656&height=656')
        .addFields({ name: `• New Level Unlocked 🎉`, value: `> ${author.username} is now level **${data.Level}**!`})
        .setAuthor({ name: `⬆ Level Playground`})

        await message.channel.send({ embeds: [levelembed] }).catch(err => console.log('Error sending level up message!'));
    } else {

        if(message.member.roles.cache.find(r => r.id === leveldata.Role)) {
            data.XP += give * multiplier;
        } data.XP += give;
        data.save();
    }
})
//guess//
const Schema = require('./Schemas/guess');

client.on(Events.MessageCreate, async (message) => {
  if (message.author.bot) return;

  const data = await Schema.findOne({ channelId: message.channel.id });

  if (!data) return;

  if (message.content === `${data.number}`) {
    await message.react('✅');
    await message.reply('Wow! That was the right number! 🥳');
    await message.pin();
    await message.channel.send('Successfully deleted number, use `/guess enable` to get a new number!');
    await data.delete();
  }

  if (isNaN(message.content)) {
    return;
  }
  if (parseInt(message.content) !== data.number) {
    return message.react(`❌`);
  }
});

//error logs//
const errorChannel = 'Channel iD '; //replace with your err channel id

client.on('error', (error) => {
  console.error('An error occurred:', error);
  try {
    const channel = client.channels.cache.get(errorChannel);
    channel.send(`An error occurred: \`\`\`${error}\`\`\``);
  } catch (error) {
    console.error('Failed to send error message:', error);
  }
});
//24/7 handler//
client.on('voiceStateUpdate', (oldState, newState) => {
  if (oldState.member.id === client.user.id && !newState.channelId) {
    const guildId = oldState.guild.id;
    const musicData = {}; // Replace with your actual music data storage object
    const dataOptions = musicData[guildId] || { enable: false, channel: null };

    if (dataOptions.enable && dataOptions.channel === oldState.channelId) {
      try {
        joinVoiceChannel({
          channelId: oldState.channelId,
          guildId: guildId,
          adapterCreator: oldState.guild.voiceAdapterCreator,
        });
      } catch (error) {
        console.error('Error rejoining voice channel:', error);
      }
    }
  }
});
//server joined//
client.on('guildCreate', async (guild) => {
    const channel = await client.channels.cache.get('110115438149'); //replace with your server join channel id
    const name = guild.name;
    const memberCount = guild.memberCount;
    const owner = guild.ownerId;

    const embed = new EmbedBuilder()
        .setColor("Green")
        .setTitle("New server joined")
        .addFields({ name: 'Server Name', value: `> ${name}` })
        .addFields({ name: 'Server Member Count', value: `> ${memberCount}` })
        .addFields({ name: 'Server Owner', value: `> ${owner}` })
        .addFields({ name: 'Server Age', value: `> <t:${Math.floor(guild.createdTimestamp / 1000)}:R>` })
        .setTimestamp();
    
    await channel.send({ embeds: [embed] });
});
///guild leave//
client.on('guildDelete', async (guild) => {
    const channel = await client.channels.cache.get('1101154382902'); //replace with your server  leve logs channel id
    const name = guild.name;
    const memberCount = guild.memberCount;
    const owner = guild.ownerId;

    const embed = new EmbedBuilder()
        .setColor("Red")
        .setTitle("Server left")
        .addFields({ name: 'Server Name', value: `> ${name}` })
        .addFields({ name: 'Server Member Count', value: `> ${memberCount}` })
        .addFields({ name: 'Server Owner', value: `> ${owner}` })
        .setTimestamp();
    
    await channel.send({ embeds: [embed] });
});


//command logging
client.on(Events.InteractionCreate, async (interaction) => {
    if (!interaction.inGuild()) return;
    if (!interaction.isCommand()) return;
    const channel = await client.channels.cache.get('1159484891268907069'); //replace with your server commands logs channel id
    const server = interaction.guild.name;
    const user = interaction.user.username;
    const userID = interaction.user.id;

const embed = new EmbedBuilder()
.setColor("Green")
.setTitle('🌐 chat command used')
.addFields({ name: 'server name', value: `${server}`})
.addFields({ name: 'chat command', value: `${interaction}`})
.addFields({ name: 'Command user', value: `${user} / ${userID}`})
.setTimestamp()
.setFooter({ text: 'chat command used' }); // pass an object with a `text` property

    await channel.send({ embeds: [embed] });
});

//nodejs-events
process.on("unhandledRejection", e => {
  console.log(e)
})
process.on("uncaughtException", e => {
  console.log(e)
})
process.on("uncaughtExceptionMonitor", e => {
  console.log(e)
})
//
client.distube = new DisTube(client, {
  emitNewSongOnly: true,
  leaveOnFinish: true,// you can change this to your needs
  emitAddSongWhenCreatingQueue: false,
  plugins: [new SpotifyPlugin()]
});
client.config = require("./config.json");
logs(client, {
  debug: true,
});
client.giveawayConfig = require("./config.js");
client.commands = new Collection();
client.subCommands = new Collection(); //sub commands
client.modals = new Collection();
client.buttons = new Collection();
client.errors = new Collection();
client.contextMenu = new Collection();
client.voiceGenerator = new Collection();

['giveawaysEventsHandler', 'giveawaysManager'].forEach((x) => {
  require(`./Utils/${x}`)(client);
})

module.exports = client;

client.login(client.config.token).then(() => {
  loadEvents(client);
  loadCommands(client);
  handleLogs(client);
messageLogging(client)

});
/// html code
// Function to generate report data
function generateReportData(channel) {
  const messageCount = channel.messages.cache.size;
  const userParticipation = {};

  for (const message of channel.messages.cache.values()) {
    if (!userParticipation[message.author.id]) {
      userParticipation[message.author.id] = {
        username: message.author.tag,
        messageCount: 0
      };
    }

    userParticipation[message.author.id].messageCount++;
  }

  // TODO: Implement keyword usage analysis

  return {
    messageCount: messageCount,
    userParticipation: userParticipation
  };
}

// Function to generate HTML report
function generateHTMLReport(reportData) {
  let html = '<html><head><title>Channel Activity Report</title></head><body>';

  html += `<h1>Channel Activity Report</h1>
    <p>Channel: ${channel.name}</p>
    <p>Report Generated At: ${new Date().toISOString()}</p>`;

  html += `<h2>Message Count</h2>
    <p>Total Messages: ${reportData.messageCount}</p>`;

  html += `<h2>User Participation</h2>
    <table>
      <thead>
        <tr>
          <th>Username</th>
          <th>Message Count</th>
        </tr>
      </thead>
      <tbody>`;

  for (const user of Object.values(reportData.userParticipation)) {
    html += `<tr>
      <td>${user.username}</td>
      <td>${user.messageCount}</td>
    </tr>`;
  }

  html += `</tbody>
    </table>`;

  // TODO: Add keyword usage section

  html += '</body></html>';
  return html;
}
