import { Client, CommandInteraction } from 'discord.js';
import { Command } from '@/bot/models/command';
import { SystemEmbed } from '@/bot/embeds/systemEmbed';
import { EmbedAuthor, EmbedType } from '@/bot/models/embed';

export class AboutCommand extends Command {
  constructor() {
    /**
     * Call the parent constructor
     */
    super();

    /**
     * Set command data for Discord API
     */
    this.setName('about');
    this.setDescription('About the bot');
    this.addEphemeralOption(); // Add the ephemeral option to the command
  }

  /**
   * Execute the command with the given interaction
   * @param client
   * @param interaction
   */
  protected async execute(client: Client, interaction: CommandInteraction): Promise<void> {
    /**
     * Defer the reply to the interaction
     */
    await interaction.deferReply({ ephemeral: this.ephemeral });

    /**
     * Create the content for the message
     */
    const content = 'This bot is a fork of the [OpenAI Discord](https://github.com/KrozT/openai-discord)';

    /**
     * Create the embed message
     */
    const embed = new SystemEmbed(
      client,
      interaction,
      EmbedAuthor.None,
      EmbedType.Info,
      content,
    );

    embed.setTitle('About'); // Set the title of the embed

    /**
     * Send embed message to the channel
     */
    await interaction.followUp({
      fetchReply: true,
      embeds: [
        embed,
      ],
    });
  }
}
