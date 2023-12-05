const { Client, ChatInputCommandInteraction, SlashCommandBuilder, PermissionFlagsBits, ChannelType, EmbedBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle, } = require('discord.js')

const voiceDB = require('../../Schemas/VoiceSystem');


module.exports = {
    data: new SlashCommandBuilder()
    .setName("setup-jointocreate")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .setDescription("Setup some settings!")
    .addSubcommand(
        command =>
        command.setName("voice")
        .setDescription("Setup voice configuration")
        .addChannelOption(
            channel =>
            channel.setName("channel")
            .setDescription("The join to create Channel!")
            .setRequired(true)
            .addChannelTypes(ChannelType.GuildVoice)
    ))
    .addSubcommand(
        command =>
        command.setName("info")
        .setDescription("Get Information about your configurations!"))
    .addSubcommand(
        command =>
        command.setName("remove")
        .setDescription("Remove configurations!")
        .addStringOption(
            option =>
            option.setName("configuration")
            .setDescription("The configuration you want to remove!")
            .setRequired(true)
            .addChoices(
                { name: '🔊 Voice', value: 'voice' },
            ))),
    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     */
    async execute(interaction) {
        const { options, guild } = interaction;

        const channel = options.getChannel("channel")
        const type = options.getString("configuration")

        const sub = options.getSubcommand();

        const Response = new EmbedBuilder()
        .setTitle("✨ Setup")
        .setTimestamp(Date.now())
        .setDescription("Here can you see your current settings!")

        switch(sub) {
            case "voice": {
                await voiceDB.findOneAndUpdate(
                    {GuildID: guild.id}, 
                    {ChannelID: channel.id},
                    {new: true, upsert: true})
                
                Response.setDescription("✅ Successfully set up the voice system!")
            }
            break;


            case "info": {

                let voiceStatus = '`🔴 Off`'

                const voiceCheck = await voiceDB.findOne({GuildID: guild.id})
                if(voiceCheck) voiceStatus = '`🟢 On`'

                await Response.addFields([
                    {name: '🔊 Voice', value: voiceStatus, inline: true },
                ])
            }
            break;

            case "remove": {
                switch(type) {
                    case "voice": {
                        try {
                            await voiceDB.findOneAndDelete({ GuildID: guild.id });
                            Response.setDescription("🗑️ Successfully removed the voice system!")
                        } catch (err) {
                            console.error('Error occurred while removing the voice system:', err);
                            // Handle the error or report it to a logging service
                        }
                    }
                    break;

                }
            }
        }

        await interaction.reply({embeds: [Response], ephemeral: true})
    }
}

function isValidHttpUrl(string) {
    let url;

    try {
        url = new URL(string);
    } catch (_) {
        return false
    }

    return url.protocol === "https:" || url.protocol === "http:";
}