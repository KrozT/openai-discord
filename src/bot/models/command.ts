import { ChatInputApplicationCommandData, Client, CommandInteraction } from 'discord.js';
import { AI } from '@/models/ai';

export interface Command extends ChatInputApplicationCommandData {
  /**
   * Execute the command with the given parameters
   * @param client - Discord client to use for the command
   * @param interaction - Interaction to use for the command
   * @param ai - AI service to use for the command response
   */
  execute: (client: Client, interaction: CommandInteraction, ai?: AI) => Promise<void>;
}
