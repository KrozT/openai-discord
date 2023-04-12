import { Client, Colors, CommandInteraction } from 'discord.js';
import { Embed, EmbedAuthor } from '@/bot/models/embed';

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
     */
    super(client, interaction, EmbedAuthor.Bot);

    /**
     * Set the embed properties
     */
    this.setColor(Colors.Purple); // Set the embed color to purple
    this.setURL('https://github.com/KrozT/openai-discord'); // Add a link to the GitHub repository
    this.setImage(imageURL); // Add the image to the embed
    this.setFooter({ text: 'embed-image' }); // Mark the embed as an image from the bot
  }
}
