import { Command } from '@/bot/models/command';
import { AboutCommand } from '@/bot/commands/aboutCommand';
import { ChatCommand } from '@/bot/commands/chatCommand';
import { ClearCommand } from '@/bot/commands/clearCommand';
import { ImageCommand } from '@/bot/commands/imageCommand';
import { PingCommand } from '@/bot/commands/pingCommand';

/**
 * Export all the commands registered as an array for centralized management
 */
export const commands: Command[] = [
  AboutCommand,
  ChatCommand,
  ClearCommand,
  ImageCommand,
  PingCommand,
];
