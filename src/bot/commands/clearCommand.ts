import {
  ChannelType, Client, CommandInteraction, SlashCommandBuilder, TextChannel,
} from 'discord.js';
import { Command } from '@/bot/models/command';
import { SystemEmbed } from '@/bot/embeds/systemEmbed';
import { EmbedAuthor, EmbedType } from '@/bot/models/embed';

export const ClearCommand: Command = {
  data: new SlashCommandBuilder()
    .setName('clear')
    .setDescription('Clear the chat history with the bot'),
  execute: async (client: Client, interaction: CommandInteraction) => {
    /**
     * Adds a loading message to the channel
     */
    await interaction.deferReply({ ephemeral: true }); // Defer the reply to the interaction

    /**
     * Get the chat history from the channel and filter the messages from the user
     */
    const channel = client.channels.cache.get(interaction.channelId) as TextChannel; // Get the channel from the channel id
    const messages = await channel.messages.fetch({ limit: 100 }); // Get the last 100 messages from the channel
    const consistentMessages = messages
      .filter((x) => x.interaction?.user.id === interaction.user.id);

    /**
     * Create the embed message
     */
    const content = `Found ${consistentMessages.size} messages to delete in the last 100 messages, task completed.`;
    const embed = new SystemEmbed(
      client,
      interaction,
      EmbedAuthor.None,
      EmbedType.Info,
      content,
    );

    /**
     * Delete the messages from the channel if there are any
     */
    if (consistentMessages.size > 0) {
      if (channel.type === ChannelType.GuildText) {
        /**
         * Bulk delete the messages if the channel is a guild text channel
         */
        await channel.bulkDelete(consistentMessages);
      } else {
        /**
         * Delete the messages one by one if the channel is a DM channel
         */
        consistentMessages.forEach((message) => {
          message.delete();
        });
      }
    }

    /**
     * Update the ephemeral message on the channel
     */
    await interaction.followUp({
      fetchReply: true,
      embeds: [
        embed,
      ],
    });
  },
};
