import { Client, CommandInteraction, EmbedBuilder } from 'discord.js';
import { ChatCompletionRequestMessage } from 'openai';
import { Command } from '@/bot/models/command';
import { AI } from '@/models/ai';
import { EmbedAuthor, EmbedType } from '@/bot/models/embed';
import { ChatEmbed } from '@/bot/embeds/chatEmbed';
import { SystemEmbed } from '@/bot/embeds/systemEmbed';

export class ChatCommand extends Command {
  constructor() {
    /**
     * Call the parent constructor
     */
    super();

    /**
     * Set command data for Discord API
     */
    this.setName('chat');
    this.setDescription('Chat with the bot');
    this.addStringOption((option) => option
      .setName('question') // Set the option name
      .setDescription('The question you want to ask the bot')
      .setRequired(true));
    this.addEphemeralOption(); // Add the ephemeral option to the command
  }

  protected async execute(client: Client, interaction: CommandInteraction, ai?: AI): Promise<void> {
    /**
     * Get the options from the interaction
     */
    const question = this._interactionResolver.getString('question') || undefined; // Get the question from the options or set it to undefined

    /**
     * Defer the reply to the interaction
     */
    await interaction.deferReply({ ephemeral: this.ephemeral });

    /**
     * Get the last 100 messages from the channel and filter the messages by the command name, author and if the message has an embed
     */
    const channelMessages = (await this.fetchMessages(100))
      .filter((message) => message.interaction?.user.id === interaction.user.id
        && message.interaction.commandName === interaction.commandName
        && message.embeds.length > 0);

    /**
     * Get the embeds from the messages and filter the embeds by the description and footer
     */
    const embedsInMessages = channelMessages.map((message) => message.embeds)
      .flatMap((embeds) => embeds)
      .filter((embed) => (embed.data.description !== undefined && embed.data.footer !== undefined))
      .flatMap((embed) => embed.data);

    /**
     * Get the embeds from the messages and filter the embeds by the description and footer
     */
    const chatHistory: ChatCompletionRequestMessage[] = embedsInMessages.map((embed) => {
      /**
       * Create the message object from the embed and add it to the chat history
       */
      const message: ChatCompletionRequestMessage = {
        role: embed.footer?.text === EmbedType.Request ? 'user' : 'assistant',
        content:
          embed.description || 'An error occurred during the process, please try again later.',
      };

      return message;
    });

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
  }
}
