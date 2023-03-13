import { CommandInteraction, Client, ApplicationCommandType } from 'discord.js';
import { Command } from '@/bot/models/command';

export const PingCommand: Command = {
  name: 'ping',
  description: 'A very simple ping command',
  type: ApplicationCommandType.ChatInput,
  execute: async (client: Client, interaction: CommandInteraction) => {
    const content = 'Pong';
    await interaction.followUp({
      ephemeral: true,
      content,
    });
  },
};
