import {
  Client, CommandInteraction, CommandInteractionOptionResolver, SlashCommandBuilder,
} from 'discord.js';
import { Command } from '@/bot/models/command';
import { SystemEmbed } from '@/bot/embeds/systemEmbed';
import { EmbedAuthor, EmbedType } from '@/bot/models/embed';

export const PingCommand: Command = {
  data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Ping the bot to check if it is online')
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
     * Create the content for the message and calculate the latency
     */
    const latency = Math.abs(Date.now() - interaction.createdTimestamp);
    const content = `Interaction Latency is: **${latency}ms**\nDue limitations of OpenAI API the service latency is unknown.`;

    /**
     * Create the embed message
     */
    const embed = new SystemEmbed(client, interaction, EmbedAuthor.None, EmbedType.Info, content);
    embed.setTitle('Online');

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
