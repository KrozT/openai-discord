import {
  Client, CommandInteraction, APIApplicationCommandOptionChoice, EmbedBuilder,
} from 'discord.js';
import { CreateImageRequestSizeEnum } from 'openai';
import { Command } from '@/bot/models/command';
import { SystemEmbed } from '@/bot/embeds/systemEmbed';
import { EmbedAuthor, EmbedType } from '@/bot/models/embed';
import { ImageEmbed } from '@/bot/embeds/imageEmbed';
import { AI } from '@/models/ai';
import { ChatEmbed } from '@/bot/embeds/chatEmbed';

export class ImageCommand extends Command {
  constructor() {
    /**
     * Call the parent constructor
     */
    super();

    /**
     * Set command data for Discord API
     */
    this.setName('image');
    this.setDescription('Generate an image with the prompt provided');
    this.addStringOption((option) => option
      .setName('prompt')
      .setDescription('The prompt to generate the image with (e.g. "A cat in a hat"')
      .setRequired(true));
    this.addNumberOption((option) => option
      .setName('quantity')
      .setDescription('The number of images to generate (default: 1)')
      .setMinValue(1)
      .setMaxValue(10)
      .setRequired(false));

    /**
     * Create the size choices for the size option
     */
    const sizeChoices: APIApplicationCommandOptionChoice<string>[] = Object
      .values(CreateImageRequestSizeEnum)
      .map((size) => ({
        name: size,
        value: size,
      }));

    this.addStringOption((option) => option
      .setName('size')
      .setDescription('The size of the image (default: 256x256)')
      .setChoices(...sizeChoices)
      .setRequired(false));
    this.addEphemeralOption(); // Add the ephemeral option to the command
  }

  protected async execute(client: Client, interaction: CommandInteraction, ai?: AI): Promise<void> {
    /**
     * Get the options from the interaction
     */
    const prompt = this._interactionResolver.getString('prompt') || 'Random'; // Get the prompt option from the options or default to Random
    const quantity = this._interactionResolver.getNumber('quantity') || 1; // Get the quantity option from the options or default to 1
    const size = this._interactionResolver.getString('size') || CreateImageRequestSizeEnum._256x256; // Get the size option from the options or default to 256x256

    /**
     * Defer the reply to the interaction
     */
    await interaction.deferReply({ ephemeral: this.ephemeral });

    /**
     * Create the embeds array with the prompt embed as the first embed
     */
    const embeds: EmbedBuilder[] = [new ChatEmbed(client, interaction, EmbedAuthor.User, prompt)];

    /**
     * Get the image from the AI
     */
    await ai?.createImage(prompt, quantity, size as CreateImageRequestSizeEnum) // Create the image from the prompt and quantity
      .then((response) => {
        response.data.forEach((image) => {
          /**
           * Create a new image embed and add it to the embeds array
           */
          embeds.push(new ImageEmbed(client, interaction, image.url as string));
        });
      })
      .catch((error: Error) => {
        /**
         * Create a new error embed and add it to the embeds array
         */
        embeds.push(new SystemEmbed(
          client,
          interaction,
          EmbedAuthor.Bot,
          EmbedType.Error,
          error.message,
        ));
      });

    /**
     * Send the embeds to the channel
     */
    await interaction.followUp({
      fetchReply: true,
      embeds,
    });
  }
}
