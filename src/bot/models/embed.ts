import { Client, CommandInteraction, EmbedBuilder } from 'discord.js';

export enum EmbedAuthor {
  User,
  Bot,
}

export abstract class Embed extends EmbedBuilder {
  /**
   * The client to use for the embed
   * @private
   */
  private _client: Client;

  /**
   * The interaction to use for the embed
   * @private
   */
  private _interaction: CommandInteraction;

  /**
   * The author of the embed
   * @private
   */
  private _author: EmbedAuthor;

  /**
   * Create a new embed with the given parameters
   * @param client - The client to use for the embed
   * @param interaction - The interaction to use for the embed
   * @param embedAuthor - Determines if the embed author should be the user or the bot
   * @param timestamp - Determines if the embed should have a timestamp (default: true)
   * @protected
   */
  protected constructor(
    client: Client,
    interaction: CommandInteraction,
    embedAuthor: EmbedAuthor,
    timestamp = true,
  ) {
    /**
     * Call the super constructor to initialize the embed
     */
    super();

    /**
     * Set the client and interaction
     */
    this._client = client;
    this._interaction = interaction;

    /**
     * Set the embed author type
     */
    this._author = embedAuthor;

    /**
     * Set the embed author based on the embedAuthor parameter
     */
    this.resolveAuthor(embedAuthor);

    /**
     * Set the timestamp if the timestamp parameter is true
     */
    if (timestamp) {
      this.setTimestamp();
    }
  }

  /**
   * Set the author of the embed
   * @param embedAuthor The author of the embed
   */
  private resolveAuthor(embedAuthor: EmbedAuthor): void {
    switch (embedAuthor) {
      case EmbedAuthor.User:
        this.setAuthor({
          name: this._interaction.user.username,
          iconURL: this._interaction.user.avatarURL() || undefined,
        });
        break;
      case EmbedAuthor.Bot:
        this.setAuthor({
          name: this._client.user?.username || 'Aurora AI',
          iconURL: this._client.user?.avatarURL() || undefined,
        });
        break;
      default:
        throw new Error('Invalid embed author please use EmbedAuthor.User or EmbedAuthor.Bot');
    }
  }

  /**
   * Get the embed author
   */
  get author(): EmbedAuthor {
    return this.author;
  }
}
