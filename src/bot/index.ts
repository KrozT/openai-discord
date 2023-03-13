import {
  ActivityType, Client, CommandInteraction, IntentsBitField, Interaction, Partials,
} from 'discord.js';
import { Logger } from '@/logger';
import { Runnable } from '@/models/runnable';
import { AI } from '@/models/ai';
import { commands } from '@/bot/commands';

export class Bot implements Runnable {
  private _logger: Logger;

  private readonly _ai: AI;

  private readonly _client: Client;

  constructor(ai: AI) {
    this._logger = new Logger(Bot.name);
    this._ai = ai;

    this._client = new Client({
      intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
        IntentsBitField.Flags.DirectMessages,
      ],
      partials: [
        Partials.Channel,
      ],
    });
  }

  private async handleSlashCommand(interaction: CommandInteraction): Promise<void> {
    const slashCommand = commands.find((command) => command.name === interaction.commandName);
    if (!slashCommand) {
      this._logger.service.warning(`SlashCommand [${interaction.commandName}] not found.`);
      await interaction.followUp({ content: 'An error has occurred' });
      return;
    }

    await interaction.deferReply();
    this._logger.service.debug(`SlashCommand [${interaction.commandName}] executed properly.`);
    await slashCommand.execute(this._client, interaction, this._ai);
  }

  run(): void {
    this._client.login(process.env.DISCORD_API_KEY).then(() => {
      this._logger.service.info('Discord Service has been initialized successfully.');
    }).catch((reason) => {
      this._logger.service.error(`Failed to start Discord Service: ${reason}`);
    });

    this._client.on('ready', async () => {
      // Set status to listening command
      this._client.user?.setActivity({
        name: '/chat',
        type: ActivityType.Listening,
      });

      if (!this._client.user || !this._client.application) {
        return;
      }

      await this._client.application.commands.set(commands);
    });

    this._client.on('interactionCreate', async (interaction: Interaction) => {
      if (interaction.isCommand() || interaction.isChatInputCommand()) {
        await this.handleSlashCommand(interaction);
      }
    });
  }
}
