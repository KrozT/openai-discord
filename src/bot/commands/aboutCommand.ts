import {
  Client, CommandInteraction, CommandInteractionOptionResolver, SlashCommandBuilder,
} from 'discord.js';
import { Command } from '@/bot/models/command';
import { SystemEmbed } from '@/bot/embeds/systemEmbed';
import { EmbedAuthor, EmbedType } from '@/bot/models/embed';

export const AboutCommand: Command = {
  data: new SlashCommandBuilder()
    .setName('about')
    .setDescription('About the bot')
    .addBooleanOption((option) => option
      .setName('ephemeral')
      .setDescription('Hide the response from other users')
      .setRequired(false)),
  execute: async (client: Client, interaction: CommandInteraction) => {
    /**
     * Get the options from the interaction
     */
    const interactionResolver = (interaction.options as CommandInteractionOptionResolver); // Get the options from the interaction
    const ephemeral = interactionResolver.getBoolean('ephemeral') || false; // Get the ephemeral from the options or set it to false

    /**
     * Adds a loading message to the channel
     */
    await interaction.deferReply({ ephemeral }); // Defer the reply to the interaction

    /**
     * Create the content for the message
     */
    const content = 'This bot is a fork of the [OpenAI Discord Bot](https://github.com/KrozT/openai-discord)';

    /**
     * Create the embed message
     */
    const embed = new SystemEmbed(client, interaction, EmbedAuthor.None, EmbedType.Info, content);
    embed.setTitle('About');

    /**
     * Send embed message to the channel
     */
    await interaction.followUp({
      fetchReply: true,
      embeds: [
        embed,
      ],
    });
  },
};
