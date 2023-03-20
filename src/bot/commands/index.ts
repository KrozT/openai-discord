import { Command } from '@/bot/models/command';
import { PingCommand } from '@/bot/commands/pingCommand';
import { ChatCommand } from '@/bot/commands/chatCommand';
import { ClearCommand } from '@/bot/commands/clearCommand';

/**
 * Export all the commands registered as an array for centralized management
 */
export const commands: Command[] = [
  PingCommand,
  ChatCommand,
  ClearCommand,
];
