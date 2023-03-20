import {
  CommandInteraction,
  Client,
  CommandInteractionOptionResolver,
  TextChannel, ApplicationCommandType, ApplicationCommandOptionType, Colors,
} from 'discord.js';
import { ChatCompletionRequestMessage } from 'openai';
import { Command } from '@/bot/models/command';

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
      description: 'If the response should be ephemeral or not',
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

    const embed = consistentMessages.map((message) => message.embeds)
      .flatMap((item) => item)
      .flatMap((item) => item.data);

    embed.forEach((item) => {
      /**
       * Create the message object from the embed and add it to the chat history
       */
      const message: ChatCompletionRequestMessage = {
        role: item.footer?.text === 'embed-question' ? 'user' : 'assistant', // Check if the message is a question from the user or an answer from the bot
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
     * Get the answer from the AI
     */
    const answer = await ai?.chatCompletion(chatHistory)
      .then((response) => response.content) // Get the content from the response
      .catch((error: Error) => error.message); // Get the error message from the error

    /**
     * Add the current answer to the chat history and reply to the user on the channel
     */
    await interaction.followUp({
      ephemeral,
      fetchReply: true,
      embeds: [
        {
          color: Colors.Gold,
          author: {
            name: interaction.user.username, // Get the username from the user
            icon_url: interaction.user.avatarURL() || undefined, // Get the avatar from the user or default to undefined
          },
          description: question, // Get the question from the user
          footer: {
            text: 'embed-question', // Mark the embed as a question from the user
          },
          timestamp: new Date().toISOString(), // Add the timestamp to the embed
        },
        {
          color: Colors.Green,
          author: {
            name: client.user?.username || 'Aurora GPT', // Get the username from the bot or default to Aurora GPT
            icon_url: client.user?.avatarURL() || undefined, // Get the avatar from the bot or default to undefined
          },
          description: answer, // Get the answer from the AI
          footer: {
            text: 'embed-answer', // Mark the embed as an answer from the bot
          },
          timestamp: new Date().toISOString(), // Add the timestamp to the embed
        },
      ],
    });
  },
};
