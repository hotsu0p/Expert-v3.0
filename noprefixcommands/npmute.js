const { MessageEmbed, PermissionFlagsBits } = require('discord.js');
const ms = require('ms');

module.exports = {
  name: 'mute',
  description: 'Mute a member from the guild.',
  async execute(client, message, args) {
    if (!message.member.permissions.has(PermissionFlagsBits.MANAGE_ROLES)) {
      return message.reply("You don't have permission to use this command.");
    }

    const user = message.mentions.users.first();
    if (!user) {
      return message.reply('Please mention a user to mute.');
    }

    const member = message.guild.members.cache.get(user.id);
    if (!member) {
      return message.reply('The mentioned user is not a member of this guild.');
    }

    if (!message.guild.me.permissions.has(PermissionFlagsBits.MANAGE_ROLES)) {
      return message.reply("I don't have permission to manage roles.");
    }

    const duration = args[1];
    const reason = args.slice(2).join(' ') || 'No reason provided';

    const muteDuration = ms(duration);
    if (!muteDuration) {
      return message.reply('Invalid mute duration. Please provide a valid duration (e.g., 1h, 30m).');
    }

    const mutedRole = message.guild.roles.cache.find(role => role.name === 'Muted');
    if (!mutedRole) {
      return message.reply('The "Muted" role does not exist. Please create the role first.');
    }

    member.roles
      .add(mutedRole)
      .then(async () => {
        const embed = new MessageEmbed()
          .setColor('#0099ff')
          .setTitle('User Muted')
          .setDescription(`${user} has been muted for ${duration}.`)
          .addField('Reason', reason)
          .setTimestamp()
          .setFooter(`Muted by ${message.author.tag}`);

        await message.channel.send({ embeds: [embed] });

        setTimeout(async () => {
          await member.roles.remove(mutedRole);
          message.channel.send(`${user} has been unmuted.`);
        }, muteDuration);
      })
      .catch(error => {
        console.error(error);
        message.reply('Failed to mute the user.');
      });
  },
};
