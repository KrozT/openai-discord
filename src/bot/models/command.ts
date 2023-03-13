import { CommandInteraction, ChatInputApplicationCommandData, Client } from 'discord.js';
import { AI } from '@/models/ai';

export interface Command extends ChatInputApplicationCommandData {
  execute: (client: Client, interaction: CommandInteraction, ai?: AI) => Promise<void>;
}
