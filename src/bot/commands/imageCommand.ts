import {
  Client,
  CommandInteraction,
  CommandInteractionOptionResolver,
  EmbedBuilder, SlashCommandBuilder, APIApplicationCommandOptionChoice,
} from 'discord.js';
import { CreateImageRequestSizeEnum } from 'openai';
import { Command } from '@/bot/models/command';
import { ImageEmbed } from '@/bot/embeds/imageEmbed';
import { EmbedAuthor, EmbedType } from '@/bot/models/embed';
import { ChatEmbed } from '@/bot/embeds/chatEmbed';
import { SystemEmbed } from '@/bot/embeds/systemEmbed';

/**
 * Choices for the quantity option
 * @type {APIApplicationCommandOptionChoice<number>[]}
 */
const quantityChoices:
  APIApplicationCommandOptionChoice<number>[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    .map((number) => ({ name: number.toString(), value: number }));

/**
 * Choices for the size option
 * @type {APIApplicationCommandOptionChoice<string>[]}
 */
const sizeChoices:
  APIApplicationCommandOptionChoice<string>[] = Object.values(CreateImageRequestSizeEnum)
    .map((size) => ({ name: size, value: size }));

export const ImageCommand: Command = {
  data: new SlashCommandBuilder()
    .setName('image')
    .setDescription('Get an image from the AI')
    .addStringOption((option) => option
      .setName('prompt')
      .setDescription('The prompt to generate the image from (e.g. A cat)')
      .setRequired(true))
    .addNumberOption((option) => option
      .setName('quantity')
      .setDescription('The number of images to generate (default: 1)')
      .addChoices(...quantityChoices)
      .setRequired(false))
    .addStringOption((option) => option
      .setName('size')
      .setDescription('The size of the image to generate (default: 256x256)')
      .addChoices(...sizeChoices)
      .setRequired(false)),
  execute: async (client: Client, interaction: CommandInteraction, ai) => {
    /**
     * Get the options from the interaction
     */
    const interactionResolver = (interaction.options as CommandInteractionOptionResolver); // Get the options from the interaction
    const prompt = interactionResolver.getString('prompt') || 'Random'; // Get the prompt option from the options or default to Random
    const quantity = interactionResolver.getNumber('quantity') || 1; // Get the quantity option from the options or default to 1
    const size = interactionResolver.getString('size') || CreateImageRequestSizeEnum._256x256; // Get the size option from the options or default to 256x256
    const ephemeral = interactionResolver.getBoolean('ephemeral') || false; // Get the ephemeral option from the options or default to false

    /**
     * Adds a loading message to the channel
     */
    await interaction.deferReply({ ephemeral }); // Defer the reply to the interaction

    /**
     * Embeds array to store the embeds
     */
    const embeds: EmbedBuilder[] = [];

    /**
     * Create a new prompt embed and add it to the embeds array
     */
    const promptEmbed = new ChatEmbed(client, interaction, EmbedAuthor.User, prompt);
    embeds.push(promptEmbed);

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
        const errorEmbed = new SystemEmbed(
          client,
          interaction,
          EmbedAuthor.Bot,
          EmbedType.Error,
          error.message,
        ); // Create a new error embed with the error message
        embeds.push(errorEmbed); // Add the error to the embeds array
      });

    console.log(Date.now() - interaction.createdTimestamp);

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
