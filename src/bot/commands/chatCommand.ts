import {
  ApplicationCommandOptionType,
  ApplicationCommandType,
  Client,
  CommandInteraction,
  CommandInteractionOptionResolver,
  EmbedBuilder,
  TextChannel,
} from 'discord.js';
import { ChatCompletionRequestMessage } from 'openai';
import { Command } from '@/bot/models/command';
import { EmbedAuthor } from '@/bot/models/embed';
import { TextEmbed } from '@/bot/embeds/textEmbed';
import { ErrorEmbed } from '@/bot/embeds/errorEmbed';

export const ChatCommand: Command = {
  name: 'chat',
  description: 'Chat with the bot',
  type: ApplicationCommandType.ChatInput,
  options: [
    {
      name: 'question',
      description: 'The question you want to ask the bot',
      required: true,
      type: ApplicationCommandOptionType.String,
    },
    {
      name: 'ephemeral',
      description: 'Hide the response from other users',
      required: false,
      type: ApplicationCommandOptionType.Boolean,
    },
  ],
  execute: async (client: Client, interaction: CommandInteraction, ai) => {
    /**
     * Get the chat history from the channel
     */
    const channel = client.channels.cache.get(interaction.channelId) as TextChannel; // Get the channel from the channel id
    const messages = await channel.messages.fetch({ limit: 100 }); // Get the last 100 messages from the channel

    /**
     * Filter the messages from the user and get the embeds from the messages
     */
    const chatHistory: ChatCompletionRequestMessage[] = [];
    const consistentMessages = messages
      .filter((x) => x.interaction?.user.id === interaction.user.id);

    const embedInteractions = consistentMessages.map((message) => message.embeds)
      .flatMap((item) => item)
      .flatMap((item) => item.data);

    embedInteractions.forEach((item) => {
      /**
       * Create the message object from the embed and add it to the chat history
       */
      const message: ChatCompletionRequestMessage = {
        role: item.footer?.text === 'embed-request' ? 'user' : 'assistant', // Check if the message is a request from the user or a response from the bot
        content: item.description || 'An error occurred during the process, please try again later.', // Get the description from the embed or set it to an error message
      };

      chatHistory.push(message); // Add the message to the chat history
    });

    /**
     * Get the options from the interaction
     */
    const interactionResolver = (interaction.options as CommandInteractionOptionResolver); // Get the options from the interaction
    const question = interactionResolver.getString('question') || undefined; // Get the question from the options or set it to undefined
    const ephemeral = interactionResolver.getBoolean('ephemeral') || true; // Get the ephemeral option from the options or set it to true

    /**
     * Add the current question to the chat history
     */
    const currentQuestion: ChatCompletionRequestMessage = {
      role: 'user',
      content: question || 'An error occurred during the process, please try again later.',
    };

    chatHistory.push(currentQuestion);

    /**
     * Embeds array to store the embeds
     */
    const embeds: EmbedBuilder[] = [];

    /**
     * Add the question to the embeds array
     */
    embeds.push(new TextEmbed(client, interaction, EmbedAuthor.User, question as string));

    /**
     * Get the answer from the AI
     */
    await ai?.chatCompletion(chatHistory)
      .then((response) => {
        const responseEmbed = new TextEmbed(client, interaction, EmbedAuthor.Bot, response.content); // Create a new text embed with the response
        embeds.push(responseEmbed); // Add the response embed to the embeds array
      }) // Get the content from the response
      .catch((error: Error) => {
        const errorEmbed = new ErrorEmbed(client, interaction, error); // Create a new error embed with the error
        embeds.push(errorEmbed); // Add the error embed to the embeds array
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
