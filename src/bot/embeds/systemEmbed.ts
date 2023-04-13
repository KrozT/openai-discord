import { Client, CommandInteraction } from 'discord.js';
import { Embed, EmbedAuthor, EmbedType } from '@/bot/models/embed';

export class SystemEmbed extends Embed {
  /**
   * Create a new system embed with the given parameters
   * @param client - The client to use for the embed
   * @param interaction - The interaction to use for the embed
   * @param author - The author of the message (none or bot)
   * @param type - The type of the message (system or error)
   * @param message - The message to display (system or error message)
   */
  constructor(
    client: Client,
    interaction: CommandInteraction,
    author: EmbedAuthor.None | EmbedAuthor.Bot,
    type: EmbedType.Info | EmbedType.Error,
    message: string | undefined = undefined,
  ) {
    /**
     * Call the super constructor to initialize the embed
     */
    super(client, interaction, author, type);

    /**
     * Set the description of the embed if a message was provided
     */
    if (message) {
      this.setDescription(message);
    }
  }
}
