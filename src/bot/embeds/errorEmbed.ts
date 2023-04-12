import { Client, Colors, CommandInteraction } from 'discord.js';
import { Embed, EmbedAuthor } from '@/bot/models/embed';

export class ErrorEmbed extends Embed {
  /**
   * Create a new error embed with the given parameters
   * @param client - The client to use for the embed
   * @param interaction - The interaction to use for the embed
   * @param error - The error occurred
   */
  constructor(client: Client, interaction: CommandInteraction, error: Error) {
    /**
     * Call the super constructor to initialize the embed
     */
    super(client, interaction, EmbedAuthor.Bot);

    /**
     * Set the embed properties
     */
    this.setColor(Colors.Red); // Set the embed color to red
    this.setDescription(error.message); // Set the embed description to the error message
    this.setFooter({ text: 'embed-error' }); // Mark the embed as an error from the bot
  }
}
