import {
  CommandInteraction, Client, TextChannel, ChannelType, ApplicationCommandType,
} from 'discord.js';
import { Command } from '@/bot/models/command';

export const ClearCommand: Command = {
  name: 'clear',
  description: 'Delete your interactions with the Chat bot',
  type: ApplicationCommandType.ChatInput,
  execute: async (client: Client, interaction: CommandInteraction) => {
    const channel = client.channels.cache.get(interaction.channelId) as TextChannel;
    const messages = await channel.messages.fetch({ limit: 100 });
    const consistentMessages = messages
      .filter((x) => x.interaction?.user.id === interaction.user.id);

    if (channel.type === ChannelType.GuildText) {
      await channel.bulkDelete(consistentMessages);
    } else {
      await messages.forEach((message) => {
        if (message.author.id !== client.user?.id) return;
        message.delete();
      });
    }
  },
};
