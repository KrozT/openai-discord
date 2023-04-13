import { Client, CommandInteraction } from 'discord.js';
import { Embed, EmbedAuthor, EmbedType } from '@/bot/models/embed';

export class ChatEmbed extends Embed {
  /**
   * Create a new error embed with the given parameters
   * @param client - The client to use for the embed
   * @param interaction - The interaction to use for the embed
   * @param author - The author of the message (user or bot)
   * @param message - The message to display (chat message)
   */
  constructor(
    client: Client,
    interaction: CommandInteraction,
    author: EmbedAuthor.User | EmbedAuthor.Bot, // The author of the message can only be the user or the bot
    message: string,
  ) {
    /**
     * Set the embed type based on the author of the message (user or bot)
     */
    const type = author === EmbedAuthor.User ? EmbedType.Request : EmbedType.Response;

    /**
     * Call the super constructor to initialize the embed
     */
    super(client, interaction, author, type);

    /**
     * Set the embed properties
     */
    this.setDescription(message); // Set the embed description to the message
  }
}
