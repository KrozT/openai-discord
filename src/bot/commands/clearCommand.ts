import { ChannelType, Client, CommandInteraction } from 'discord.js';
import { Command } from '@/bot/models/command';
import { SystemEmbed } from '@/bot/embeds/systemEmbed';
import { EmbedAuthor, EmbedType } from '@/bot/models/embed';

export class ClearCommand extends Command {
  constructor() {
    /**
     * Call the parent constructor
     */
    super();

    /**
     * Set command data for Discord API
     */
    this.setName('clear');
    this.setDescription('Clear the chat history with the bot');
    this.addNumberOption((option) => option
      .setName('amount') // Set the option name
      .setDescription('The amount of messages to delete')
      .setMinValue(1) // Set the minimum value to be deleted
      .setMaxValue(100) // Set the maximum value to be deleted
      .setRequired(false));
  }

  protected async execute(client: Client, interaction: CommandInteraction): Promise<void> {
    /**
     * Get the options from the interaction
     */
    const amount = this._interactionResolver.getNumber('amount') || 100; // Get the amount from the options or set it to 100

    /**
     * Defer the reply to the interaction
     */
    await interaction.deferReply({ ephemeral: true });

    /**
     * Get the last 100 messages from the channel and filter the messages by the author and if the message has an embed
     */
    const channelMessages = (await this.fetchMessages(amount))
      .filter((message) => message.interaction?.user.id === interaction.user.id
        && message.embeds.length > 0);

    /**
     * Create the embed message and send it to the channel
     */
    const content = channelMessages.size > 0
      ? `Found **${channelMessages.size}** messages on the chat history\nDue to Discord API limitations the ephemeral messages are not affected and only the last 100 messages can be deleted at once.`
      : 'No messages to delete from the chat history\nDue to Discord API limitations the ephemeral messages are not detected by the bot.';

    const embed = new SystemEmbed(
      client,
      interaction,
      EmbedAuthor.None,
      EmbedType.Info,
      content,
    );

    await interaction.editReply({ embeds: [embed] }); // Edit the reply to the interaction with the embed

    /**
     * Delete the messages from the channel if there are any
     */
    if (channelMessages.size > 0) {
      if (interaction.channel?.type === ChannelType.GuildText) {
        /**
         * Bulk delete the messages if the channel is a Guild Text channel
         */
        await interaction.channel.bulkDelete(channelMessages, true);
      } else {
        /**
         * Delete the messages one by one if the channel is a DM channel
         */
        channelMessages.forEach((message) => {
          message.delete();
        });
      }

      /**
       * Edit embed message to show the amount of messages deleted
       */
      embed.setDescription(`Deleted **${channelMessages.size}** messages from the chat history`); // Set the embed description to the deleted content

      /**
       * Add a new ephemeral reply to the interaction with the embed
       */
      await interaction.followUp({
        fetchReply: true,
        ephemeral: true,
        embeds: [
          embed,
        ],
      });
    }
  }
}
