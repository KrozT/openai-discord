import {
  Client,
  CommandInteraction,
  CommandInteractionOptionResolver,
  EmbedBuilder, SlashCommandBuilder,
  TextChannel,
} from 'discord.js';
import { ChatCompletionRequestMessage } from 'openai';
import { Command } from '@/bot/models/command';
import { EmbedAuthor, EmbedType } from '@/bot/models/embed';
import { ChatEmbed } from '@/bot/embeds/chatEmbed';
import { SystemEmbed } from '@/bot/embeds/systemEmbed';

export const ChatCommand: Command = {
  data: new SlashCommandBuilder()
    .setName('chat')
    .setDescription('Chat with the bot')
    .addStringOption((option) => option
      .setName('question') // Set the option name
      .setDescription('The question you want to ask the bot')
      .setRequired(true))
    .addBooleanOption((option) => option
      .setName('ephemeral')
      .setDescription('Hide the response from other users')
      .setRequired(false)),
  execute: async (client: Client, interaction: CommandInteraction, ai) => {
    /**
     * Get the options from the interaction
     */
    const interactionResolver = (interaction.options as CommandInteractionOptionResolver); // Get the options from the interaction
    const question = interactionResolver.getString('question') || undefined; // Get the question from the options or set it to undefined
    const ephemeral = interactionResolver.getBoolean('ephemeral') || false; // Get the ephemeral from the options or set it to false

    /**
     * Adds a loading message to the channel
     */
    await interaction.deferReply({ ephemeral }); // Defer the reply to the interaction

    /**
     * Get the chat history from the channel
     */
    const channel = client.channels.cache.get(interaction.channelId) as TextChannel; // Get the channel from the channel id
    const messages = await channel.messages.fetch({ limit: 100 }); // Get the last 100 messages from the channel

    /**
     * Create the chat history from the messages
     */
    const chatHistory: ChatCompletionRequestMessage[] = [];

    /**
     * Filter the messages from the user by the command name, author and if the message has an embed
     */
    const consistentMessages = messages
      .filter((x) => x.interaction?.user.id === interaction.user.id
        && x.interaction.commandName === interaction.commandName && x.embeds.length > 0);

    /**
     * Get the embeds from the messages and filter the embeds by the description and footer
     */
    const embedInteractions = consistentMessages.map((message) => message.embeds)
      .flatMap((embeds) => embeds)
      .filter((embed) => (embed.data.description !== undefined && embed.data.footer !== undefined))
      .flatMap((embed) => embed.data);

    if (embedInteractions.length > 0) {
      embedInteractions.forEach((embed) => {
        /**
        * Create the message object from the embed and add it to the chat history
        */
        const message: ChatCompletionRequestMessage = {
          role: embed.footer?.text === EmbedType.Request ? 'user' : 'assistant', // Check if the message is a request from the user or a response from the bot
          content: embed.description || 'An error occurred during the process, please try again later.', // Get the description from the embed or set it to an error message
        };

        chatHistory.push(message); // Add the message to the chat history
      });
    }

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
     * Create the question embed and add it to the embeds array
     */
    const questionEmbed = new ChatEmbed(client, interaction, EmbedAuthor.User, question as string);
    embeds.push(questionEmbed);

    /**
     * Get the answer from the AI
     */
    await ai?.chatCompletion(chatHistory)
      .then((response) => {
        const responseEmbed = new ChatEmbed(client, interaction, EmbedAuthor.Bot, response.content); // Create a new text embed with the response
        embeds.push(responseEmbed); // Add the response embed to the embeds array
      }) // Get the content from the response
      .catch((error: Error) => {
        const errorEmbed = new SystemEmbed(
          client,
          interaction,
          EmbedAuthor.Bot,
          EmbedType.Error,
          error.message,
        ); // Create a new error embed with the error message
        embeds.push(errorEmbed); // Add the error embed to the embeds array
      });

    /**
     * Send the embeds to the channel
     */
    await interaction.followUp({
      fetchReply: true,
      embeds,
    });
  },
};
