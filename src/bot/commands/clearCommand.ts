import {
  ApplicationCommandType, ChannelType, Client, CommandInteraction, TextChannel,
} from 'discord.js';
import { Command } from '@/bot/models/command';

export const ClearCommand: Command = {
  name: 'clear',
  description: 'Clear the chat history with the bot',
  type: ApplicationCommandType.ChatInput,
  execute: async (client: Client, interaction: CommandInteraction) => {
    /**
     * Get the chat history from the channel and filter the messages from the user
     */
    const channel = client.channels.cache.get(interaction.channelId) as TextChannel; // Get the channel from the channel id
    const messages = await channel.messages.fetch({ limit: 100 }); // Get the last 100 messages from the channel
    const consistentMessages = messages
      .filter((x) => x.interaction?.user.id === interaction.user.id);

    /**
     * Check if the channel is a guild text channel or a DM channel
     */
    if (channel.type === ChannelType.GuildText) {
      /**
       * Bulk delete the messages if the channel is a guild text channel
       */
      await channel.bulkDelete(consistentMessages);
    } else {
      /**
       * Delete the messages one by one if the channel is a DM channel
       */
      messages.forEach((message) => {
        if (message.author.id !== client.user?.id) return; // Skip if the message is not from the bot
        message.delete();
      });
    }
  },
};
