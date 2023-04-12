import {
  ApplicationCommandOptionType,
  ApplicationCommandType,
  Client,
  CommandInteraction,
  CommandInteractionOptionResolver,
  EmbedBuilder,
} from 'discord.js';
import { CreateImageRequestSizeEnum } from 'openai';
import { Command } from '@/bot/models/command';
import { ImageEmbed } from '@/bot/embeds/imageEmbed';
import { ErrorEmbed } from '@/bot/embeds/errorEmbed';
import { TextEmbed } from '@/bot/embeds/textEmbed';
import { EmbedAuthor } from '@/bot/models/embed';

export let ImageCommand: Command;
ImageCommand = {
  name: 'image',
  description: 'Get an image from the bot',
  type: ApplicationCommandType.ChatInput,
  options: [
    {
      name: 'prompt',
      description: 'Text to generate the image from (e.g. "A photo of a")',
      required: true,
      type: ApplicationCommandOptionType.String,
    },
    {
      name: 'quantity',
      description: 'Quantity of images to generate (default 1)',
      required: false,
      type: ApplicationCommandOptionType.Number,
      choices: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((number) => ({
        name: number.toString(),
        value: number,
      })),
    },
    {
      name: 'size',
      description: 'Quality of the image (default "256x256")',
      required: false,
      type: ApplicationCommandOptionType.String,
      choices: [
        {
          name: '256x256',
          value: CreateImageRequestSizeEnum._256x256,
        },
        {
          name: '512x512',
          value: CreateImageRequestSizeEnum._512x512,
        },
        {
          name: '1024x1024',
          value: CreateImageRequestSizeEnum._1024x1024,
        },
      ],
    },
    {
      name: 'ephemeral',
      description: 'If the response should be ephemeral or not',
      required: false,
      type: ApplicationCommandOptionType.Boolean,
    },
  ],
  execute: async (client: Client, interaction: CommandInteraction, ai) => {
    /**
     * Get the options from the interaction
     */
    const interactionResolver = (interaction.options as CommandInteractionOptionResolver); // Get the options from the interaction
    const prompt = interactionResolver.getString('prompt') || 'Random'; // Get the prompt option from the options or default to Random
    const quantity = interactionResolver.getNumber('quantity') || 1; // Get the quantity option from the options or default to 1
    const size = interactionResolver.getString('size') || CreateImageRequestSizeEnum._256x256; // Get the size option from the options or default to 256x256
    const ephemeral = interactionResolver.getBoolean('ephemeral') || true; // Get the ephemeral option from the options or set it to true

    /**
     * Embeds array to store the embeds
     */
    const embeds: EmbedBuilder[] = [];

    /**
     * Add the prompt to the embeds array
     */
    embeds.push(new TextEmbed(client, interaction, EmbedAuthor.User, prompt));

    /**
     * Get the image from the AI
     */
    await ai?.createImage(prompt, quantity, size as CreateImageRequestSizeEnum) // Create the image from the prompt and quantity
      .then((response) => {
        response.data.forEach((image) => {
          const responseEmbed = new ImageEmbed(client, interaction, image.url as string); // Create a new image embed with the image
          embeds.push(responseEmbed); // Add the image to the embeds array
        });
      })
      .catch((error: Error) => {
        const errorEmbed = new ErrorEmbed(client, interaction, error); // Create a new error embed with the error
        embeds.push(errorEmbed); // Add the error to the embeds array
      });

    /**
     * Send the embeds to the channel
     */
    await interaction.followUp({
      ephemeral,
      fetchReply: true,
      embeds,
    });
  },
};
