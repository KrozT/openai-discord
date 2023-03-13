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
  description: 'Say anything to the Chat bot',
  type: ApplicationCommandType.ChatInput,
  options: [
    {
      name: 'question',
      description: 'Question for the Chat bot',
      required: true,
      type: ApplicationCommandOptionType.String,
    },
    {
      name: 'ephemeral',
      description: 'If you set \'false\' the message will be persisted over time',
      required: false,
      type: ApplicationCommandOptionType.Boolean,
    },
  ],
  execute: async (client: Client, interaction: CommandInteraction, ai) => {
    const channel = client.channels.cache.get(interaction.channelId) as TextChannel;
    const messages = await channel.messages.fetch({ limit: 100 });

    const chatHistory: ChatCompletionRequestMessage[] = [];
    const consistentMessages = messages
      .filter((x) => x.interaction?.user.id === interaction.user.id);

    const embed = consistentMessages.map((message) => message.embeds)
      .flatMap((item) => item)
      .flatMap((item) => item.data);

    embed.forEach((item) => {
      const message: ChatCompletionRequestMessage = {
        role: item.footer?.text === 'embed-question' ? 'user' : 'assistant',
        content: item.description || 'An error occurred during the process, please try again later.',
      };

      chatHistory.push(message);
    });

    const interactionResolver = (interaction.options as CommandInteractionOptionResolver);
    const question = interactionResolver.getString('question') || undefined;
    const ephemeral = interactionResolver.getBoolean('ephemeral') || true;

    const currentQuestion: ChatCompletionRequestMessage = {
      role: 'user',
      content: question || 'An error occurred during the process, please try again later.',
    };

    chatHistory.push(currentQuestion);

    const answer = await ai?.chatCompletion(chatHistory)
      .then((response) => response.content)
      .catch((error: Error) => error.message);

    await interaction.followUp({
      ephemeral,
      fetchReply: true,
      embeds: [
        {
          color: 15844367,
          title: '✥   Question',
          description: question,
          footer: {
            text: 'embed-question',
          },
        },
        {
          color: 5763719,
          title: '✥   Answer',
          description: answer,
          footer: {
            text: 'embed-answer',
          },
        },
      ],
    });
  },
};
