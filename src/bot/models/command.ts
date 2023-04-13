import {
  Client,
  CommandInteraction,
  SlashCommandBuilder,
  SlashCommandSubcommandsOnlyBuilder,
} from 'discord.js';
import { AI } from '@/models/ai';

export interface Command {
  /**
   * Command data to register with Discord API
   */
  data: | Omit<SlashCommandBuilder, 'addSubcommandGroup' | 'addSubcommand'> | SlashCommandSubcommandsOnlyBuilder;

  /**
   * Execute the command with the given parameters
   * @param client - Discord client to use for the command
   * @param interaction - Interaction to use for the command
   * @param ai - AI service to use for the command response
   */
  execute: (client: Client, interaction: CommandInteraction, ai?: AI) => Promise<void>;
}
