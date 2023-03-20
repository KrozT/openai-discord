import { CommandInteraction, ChatInputApplicationCommandData, Client } from 'discord.js';
import { AI } from '@/models/ai';

export interface Command extends ChatInputApplicationCommandData {
  /**
   * Execute the command with the given parameters
   * @param client
   * @param interaction
   * @param ai
   */
  execute: (client: Client, interaction: CommandInteraction, ai?: AI) => Promise<void>;
}
