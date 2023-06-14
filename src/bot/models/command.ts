import {
  Client,
  CommandInteraction,
  CommandInteractionOptionResolver,
  SlashCommandBuilder,
  TextChannel,
} from 'discord.js';
import { AI } from '@/models/ai';

export abstract class Command extends SlashCommandBuilder {
  /**
   * Discord client for the command
   * @protected
   */
  protected _client!: Client;

  /**
   * Discord interaction for the command
   * @protected
   */
  protected _interaction!: CommandInteraction;

  /**
   * Interaction option resolver for command options
   * @protected
   */
  protected _interactionResolver!: CommandInteractionOptionResolver;

  /**
   * Add Ephemeral option to command
   * @protected
   */
  protected addEphemeralOption(): void {
    this.addBooleanOption((option) => option
      .setName('ephemeral')
      .setDescription('Hide the response from other users')
      .setRequired(false));
  }

  /**
   * Get Ephemeral option from command
   * @protected
   */
  protected get ephemeral(): boolean {
    return this._interactionResolver.getBoolean('ephemeral') ?? false;
  }

  /**
   * Get message history from channel of interaction was called in
   * @param quantity - Number of messages to fetch (max 100)
   * @protected
   */
  protected async fetchMessages(quantity: number) {
    const channel = this._interaction.channel as TextChannel;
    return channel.messages.fetch({ limit: quantity });
  }

  /**
   * Execute the command
   * @param client - Discord client to use for the command
   * @param interaction - Interaction to use for the command
   * @param ai - AI service to use for the command response
   * @protected
   */
  protected abstract execute(
    client: Client,
    interaction: CommandInteraction,
    ai?: AI
  ): Promise<void>;

  /**
   * Execute the command
   * @param client - Discord client to use for the command
   * @param interaction - Interaction to use for the command
   * @param ai - AI service to use for the command response
   * @public
   */
  public async executeCommand(
    client: Client,
    interaction: CommandInteraction,
    ai?: AI,
  ): Promise<void> {
    /**
     * Set the client for the command
     */
    this._client = client;

    /**
     * Set the interaction for the command
     */
    this._interaction = interaction;

    /**
     * Get the options from the interaction
     */
    this._interactionResolver = (interaction.options as CommandInteractionOptionResolver);

    /**
     * Execute the command
     */
    await this.execute(client, interaction, ai);
  }
}
