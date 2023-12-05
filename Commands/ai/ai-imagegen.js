const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const { Configuration, OpenAIApi } = require('openai');

const configuration = new Configuration({
    apiKey: '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'
});

const openai = new OpenAIApi(configuration);


module.exports = {
    data: new SlashCommandBuilder()
        .setName('image-generate')
        .setDescription('Generates an image based on a prompt provided by you')
        .addStringOption(option => option.setName('prompt').setDescription('Describe what image you want to generate').setRequired(true)),
    async execute(interaction) {
        await interaction.deferReply();

        const prompt = interaction.options.getString('prompt');

        try {
            const response = await openai.createImage({
                prompt: `${prompt}`,
                n: 1,
                size: '1024x1024',
            });

            if (!response || !response.data || !response.data.data || !response.data.data[0] || !response.data.data[0].url) {
                return await interaction.editReply({ content: 'Failed to generate the image. Please try a different prompt.' });
            }

            const image = response.data.data[0].url;

            const embed = new MessageEmbed()
                .setColor('BLUE')
                .setTitle(`Image generated: ${prompt}`)
                .setImage(image)
                .setTimestamp()
                .setFooter('Image Generator');

            await interaction.editReply({ embeds: [embed] });
        } catch (error) {
            console.error('Error occurred:', error);
            if (error.response && error.response.status === 400 && error.response.data && error.response.data.error) {
                const errorMessage = error.response.data.error.message || 'An error occurred while processing your request.';
                return await interaction.editReply({ content: `Failed to generate the image. Error: ${errorMessage}` });
            }
            await interaction.editReply({ content: 'An error occurred while processing your request.' });
        }
    }
};
