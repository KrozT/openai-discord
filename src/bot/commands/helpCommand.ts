import { Client, CommandInteraction } from 'discord.js';
import { Command } from '@/bot/models/command';
import { SystemEmbed } from '@/bot/embeds/systemEmbed';
import { EmbedAuthor, EmbedType } from '@/bot/models/embed';

export class HelpCommand extends Command {
  public configure(): void {
    this.setName('help');
    this.setDescription('Get all the commands available');
    this.addEphemeralOption(); // Add the ephemeral option to the command
  }

  protected async execute(client: Client, interaction: CommandInteraction): Promise<void> {
    /**
     * Defer the reply to the interaction
     */
    await interaction.deferReply({ ephemeral: this.ephemeral });

    /**
     * Create the content for the message
     */
    const embed = new SystemEmbed(client, interaction, EmbedAuthor.None, EmbedType.Info);
    embed.setTitle('Help'); // Set the title of the embed

    /**
     * Fetch all the commands from the client and filter the commands to remove the current command
     */
    const commands = await client.application?.commands.fetch();
    const filteredCommands = commands
      ?.filter((command) => command.name !== interaction.commandName)
      .map((command) => ({ name: `/${command.name}`, value: command.description }));

    /**
     * Add the fields to the embed if there are commands available, otherwise set the description to no commands available
     */
    if (filteredCommands) {
      embed.addFields(filteredCommands);
      embed.setDescription('Here is a list of all the commands you can use with this bot:\n');
    } else {
      embed.setDescription('No commands available');
    }

    /**
     * Send the embed to the channel
     */
    await interaction.followUp({
      fetchReply: true,
      embeds: [
        embed,
      ],
    });
  }
}
