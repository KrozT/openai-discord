import {
  ActivityType, Client, CommandInteraction, IntentsBitField, Interaction, Partials, REST, Routes,
} from 'discord.js';
import process from 'process';
import fs from 'fs-extra';
import { Logger } from '@/logger';
import { Runnable } from '@/models/runnable';
import { AI } from '@/models/ai';
import { Command } from '@/bot/models/command';

export class Bot implements Runnable {
  /**
   * Logger instance
   * @private
   * @readonly
   */
  private readonly _logger: Logger;

  /**
   * AI instance
   * @private
   * @readonly
   */
  private readonly _ai: AI;

  /**
   * Discord API client instance
   * @private
   * @readonly
   */
  private readonly _client: Client;

  /**
   * Discord Command instances
   * @private
   */
  private _commands: Command[] = [];

  /**
   * Create Bot instance
   * @param ai - OpenAI API instance to use for all AI related tasks
   */
  constructor(ai: AI) {
    this._logger = new Logger(Bot.name);
    this._ai = ai;

    /**
     * Create Discord API client instance with intents and partials
     */
    this._client = new Client({
      intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
        IntentsBitField.Flags.DirectMessages,
      ],
      partials: [
        Partials.Channel, // For DMs
      ],
    });

    /**
     * Load and initialize all the commands contained in the commands folder
     */
    this.loadAndInitializeCommandsFromFolder(`${__dirname}/commands`).then((commands) => {
      this._commands = commands;
    }).catch((error) => {
      this._logger.logService.error(`Failed to load and initialize commands: ${error}`);
      process.exit(1);
    });
  }

  /**
   * Load and initialize all the commands existing in the commands folder
   * @private
   */
  private async loadAndInitializeCommandsFromFolder(folderPath: string): Promise<Command[]> {
    /**
     * Get all the files in the commands folder
     */
    const files = await fs.readdir(folderPath);
    const tsFiles = files.filter((file) => file.endsWith('js') // For compiled files on production
      || file.endsWith('.ts') || file.endsWith('.tsx')); // For source files on development

    /**
     * Command classes container to return
     */
    const loadedCommands: Command[] = [];

    /**
     * Load all the commands from the files in the commands folder
     */
    await Promise.all(
      tsFiles.map(async (file) => {
        const filePath = `${folderPath}/${file}`;
        const module = await import(filePath);

        Object.keys(module).forEach((exportedKey) => {
          const ImportedCommand = module[exportedKey];
          if (typeof ImportedCommand === 'function' && ImportedCommand.prototype instanceof Command) {
            const commandInstance = new ImportedCommand(); // Create command instance
            commandInstance.configure(); // Configure command
            loadedCommands.push(commandInstance); // Add command to the container
          }
        });
      }),
    );

    this._logger.logService.debug(`Loaded ${loadedCommands.length} available commands and initialized them.`);
    return loadedCommands;
  }

  /**
   * Handle slash commands from Discord API
   * @param interaction - Interaction from Discord API to handle as slash command (e.g. /help)
   * @private
   */
  private async handleSlashCommand(interaction: CommandInteraction): Promise<void> {
    /**
     * Find command by name and execute it if found or return error message
     */
    const slashCommand = this._commands
      .find((command) => command.name === interaction.commandName);
    if (!slashCommand) {
      this._logger.logService.warning(`SlashCommand [${interaction.commandName}] not found.`);
      await interaction.followUp({ content: 'An error has occurred' });
      return;
    }

    this._logger.logService.debug(`SlashCommand [${interaction.commandName}] executed properly.`); // Log command execution
    await slashCommand.executeCommand(this._client, interaction, this._ai);
  }

  /**
   * Initialize Discord API service
   */
  run(): void {
    /**
     * Login to Discord API and set status for show command if login was successful or exit process if failed
     */
    this._client.login(process.env.DISCORD_API_KEY).then(() => {
      this._logger.logService.info('Discord Client has been initialized successfully.'); // Log service initialization
    }).catch((error) => {
      this._logger.logService.error(`Failed to start Discord Service: ${error}`); // Log service initialization error
      process.exit(1); // Exit process
    });

    this._client.on('ready', async () => {
      /**
       * Check if user and application are available before continue
       */
      if (!this._client.user || !this._client.application) {
        return;
      }

      /**
       * Create Discord API REST instance and register slash commands if successful or exit process if failed
       */
      try {
        const availableCommands = this._commands.map((command) => command.toJSON());
        const rest = new REST().setToken(process.env.DISCORD_API_KEY as string);

        await rest.put(
          Routes.applicationCommands(this._client.application.id),
          { body: availableCommands },
        );

        this._logger.logService.info(`Discord API REST [${availableCommands.length}] commands registered successfully.`);
      } catch (error) {
        this._logger.logService.error(`Failed to start Discord API REST: ${error}`);
        process.exit(1); // Exit process
      }

      /**
       * Set activity status for show command
       */
      this._client.user?.setActivity({
        name: '/help',
        type: ActivityType.Listening,
      });
    });

    /**
     *  On interaction create event handler
     */
    this._client.on('interactionCreate', async (interaction: Interaction) => {
      /**
       * Check if interaction is command or chat input command
       */
      if (interaction.isCommand() || interaction.isChatInputCommand()) {
        await this.handleSlashCommand(interaction); // Handle slash command
      }
    });
  }
}
