import {
  CommandInteraction,
  Client,
  CommandInteractionOptionResolver,
  TextChannel, ApplicationCommandType, ApplicationCommandOptionType,
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
    const channel = client.channels.cache.get(interaction.channelId) as TextChannel;
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
        role: item.footer?.text === 'embed-question' ? 'user' : 'assistant',
        content: item.description || 'An error occurred during the process, please try again later.',
      };

      chatHistory.push(message); // Add the message to the chat history
    });

    /**
     * Get the options from the interaction
     */
    const interactionResolver = (interaction.options as CommandInteractionOptionResolver);
    const question = interactionResolver.getString('question') || undefined; // Default to undefined
    const ephemeral = interactionResolver.getBoolean('ephemeral') || true; // Default to true

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
      .then((response) => response.content)
      .catch((error: Error) => error.message);

    /**
     * Add the current answer to the chat history and reply to the user on the channel
     */
    await interaction.followUp({
      ephemeral,
      fetchReply: true,
      embeds: [
        {
          color: 15844367,
          title: '✥   Question',
          description: question,
          footer: {
            text: 'embed-question', // embed-question is used to identify is an interaction from user to bot
          },
        },
        {
          color: 5763719,
          title: '✥   Answer',
          description: answer,
          footer: {
            text: 'embed-answer', // embed-answer is used to identify is an interaction from bot to user
          },
        },
      ],
    });
  },
};
