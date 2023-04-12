import {
  ApplicationCommandType, Client, Colors, CommandInteraction, EmbedBuilder,
} from 'discord.js';
import { Command } from '@/bot/models/command';

export const PingCommand: Command = {
  name: 'ping',
  description: 'Ping the bot to check if it is online',
  type: ApplicationCommandType.ChatInput,
  execute: async (client: Client, interaction: CommandInteraction) => {
    /**
     * Create the content for the message and calculate the latency
     */
    const content = `Interaction Latency is: **${Date.now() - interaction.createdTimestamp}ms**\nDue limitations of OpenAI API the service latency is unknown.`;

    /**
     * Create the embed message
     */
    const embed = new EmbedBuilder()
      .setColor(Colors.Aqua) // Set the color to Aqua
      .setTitle('Online') // Set the title to Online
      .setDescription(content) // Set the description to the content
      .setFooter({ text: 'embed-ping' }) // Mark the message as a ping message
      .setTimestamp(); // Set the timestamp to the current time

    /**
     * Send embed message to the channel
     */
    await interaction.followUp({
      ephemeral: true,
      embeds: [
        embed,
      ],
    });
  },
};
