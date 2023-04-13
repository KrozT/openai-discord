import { Client, CommandInteraction } from 'discord.js';
import { Embed, EmbedAuthor, EmbedType } from '@/bot/models/embed';

export class ImageEmbed extends Embed {
  /**
   * Create a new image embed with the given parameters
   * @param client - The client to use for the embed
   * @param interaction - The interaction to use for the embed
   * @param imageURL - The image URL for the image to display
   */
  constructor(client: Client, interaction: CommandInteraction, imageURL: string) {
    /**
     * Call the super constructor to initialize the embed
     * Due to nature of OpenAI's API, the embed author is always the bot and the embed type is always a response
     */
    super(client, interaction, EmbedAuthor.Bot, EmbedType.Response);

    /**
     * Set the embed properties
     */
    this.setURL('https://github.com/KrozT/openai-discord'); // Add a link to group multiple images on the same embed
    this.setImage(imageURL); // Add the image to the embed
  }
}
