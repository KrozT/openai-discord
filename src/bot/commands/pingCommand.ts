import {
  CommandInteraction, Client, ApplicationCommandType, Colors,
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
    const content = `Client Latency is: **${Date.now() - interaction.createdTimestamp}ms**\nAPI Latency is: **${Date.now() - interaction.createdTimestamp}ms**`;

    /**
     * Send a message to the channel
     */
    await interaction.followUp({
      ephemeral: true,
      embeds: [
        {
          color: Colors.Aqua,
          title: 'Pong',
          description: content,
          timestamp: new Date().toISOString(), // Set the timestamp to the current time
          footer: {
            text: 'embed-ping', // Mark the message as a ping message
          },
        },
      ],
    });
  },
};
