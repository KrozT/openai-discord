import { Client, Colors, CommandInteraction } from 'discord.js';
import { Embed, EmbedAuthor } from '@/bot/models/embed';

export class TextEmbed extends Embed {
  constructor(
    client: Client,
    interaction: CommandInteraction,
    embedAuthor: EmbedAuthor,
    text: string,
  ) {
    /**
     * Call the super constructor to initialize the embed
     */
    super(client, interaction, embedAuthor);

    /**
     * Set the embed properties
     */
    this.setDescription(text); // Set the embed description to the text

    /**
     * Set the embed footer based on the embedAuthor parameter
     */
    switch (embedAuthor) {
      case EmbedAuthor.User:
        this.setColor(Colors.Gold); // Set the embed color to gold if the embed author is the user
        this.setFooter({ text: 'embed-request' }); // Mark the embed as a request from the user
        break;
      case EmbedAuthor.Bot:
        this.setColor(Colors.Green); // Set the embed color to green if the embed author is the bot
        this.setFooter({ text: 'embed-response' }); // Mark the embed as a response from the bot
        break;
      default:
        throw new Error('Invalid embed author type please use EmbedAuthor.User or EmbedAuthor.Bot');
    }
  }
}
