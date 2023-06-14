import { Client, CommandInteraction } from 'discord.js';
import { Command } from '@/bot/models/command';
import { SystemEmbed } from '@/bot/embeds/systemEmbed';
import { EmbedAuthor, EmbedType } from '@/bot/models/embed';

export class PingCommand extends Command {
  public configure(): void {
    this.setName('ping');
    this.setDescription('Ping the bot to check if it is online');
    this.addEphemeralOption(); // Add the ephemeral option to the command
  }

  protected async execute(client: Client, interaction: CommandInteraction): Promise<void> {
    /**
     * Defer the reply to the interaction
     */
    await interaction.deferReply({ ephemeral: this.ephemeral });

    /**
     * Create the content for the message and calculate the latency
     */
    const latency = Math.abs(Date.now() - interaction.createdTimestamp);
    const content = `Interaction Latency is: **${latency}ms**\nDue limitations of OpenAI API the service latency is unknown.`;

    /**
     * Create the embed message
     */
    const embed = new SystemEmbed(client, interaction, EmbedAuthor.None, EmbedType.Info, content);
    embed.setTitle('Online');

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
