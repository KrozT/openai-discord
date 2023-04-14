import {
  Client, CommandInteraction, CommandInteractionOptionResolver, SlashCommandBuilder,
} from 'discord.js';
import { Command } from '@/bot/models/command';
import { SystemEmbed } from '@/bot/embeds/systemEmbed';
import { EmbedAuthor, EmbedType } from '@/bot/models/embed';
import { commands } from '@/bot/commands/index';

export const HelpCommand: Command = {
  data: new SlashCommandBuilder()
    .setName('help')
    .setDescription('Get a list of all the commands')
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
    const embed = new SystemEmbed(client, interaction, EmbedAuthor.None, EmbedType.Info);
    embed.setTitle('Help');
    embed.setDescription('Here is a list of all the commands you can use with this bot:\n\b');

    /**
     * Add all the commands to the embed except itself
     * Prefer to use map, filter and forEach instead of client.commands.fetch() because is faster than Discord API request
     */
    commands.map((command) => command.data)
      .filter((command) => command.name !== interaction.commandName)
      .forEach((command) => {
        embed.addFields({ name: `/${command.name}`, value: command.description });
      });

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
