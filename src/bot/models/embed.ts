import {
  Client, Colors, CommandInteraction, EmbedBuilder,
} from 'discord.js';

export enum EmbedAuthor {
  /**
   * Define the embed author as none and do not display a profile
   */
  None,

  /**
   * Define the embed author as the user and display its profile
   */
  User,

  /**
   * Define the embed author as the bot and display its profile
   */
  Bot,
}

export enum EmbedType {
  /**
   * Define the embed type as a system embed
   */
  Info = 'embed-info',

  /**
   * Define the embed type as an error embed
   */
  Error = 'embed-error',

  /**
   * Define the embed type as a request embed
   */
  Request = 'embed-request',

  /**
   * Define the embed type as a response embed
   */
  Response = 'embed-response',
}

export abstract class Embed extends EmbedBuilder {
  /**
   * The client to use for the embed
   * @private
   * readonly
   */
  private readonly _client: Client;

  /**
   * The interaction to use for the embed
   * @private
   * @readonly
   */
  private readonly _interaction: CommandInteraction;

  /**
   * Create a new embed with the given parameters
   * @param client - The client to use for the embed
   * @param interaction - The interaction to use for the embed
   * @param embedAuthor - Determines if the embed should have an author profile to display
   * @param embedType - The type of embed to create and determine the footer text
   * @param timestamp - Determines if the embed should have a timestamp (default: true)
   * @protected
   */
  protected constructor(
    client: Client,
    interaction: CommandInteraction,
    embedAuthor: EmbedAuthor,
    embedType: EmbedType,
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
     * Set the embed author based on the embedAuthor parameter
     */
    this.resolveAuthor(embedAuthor);

    /**
     * Set the embed type based on the embedType parameter
     */
    this.resolveType(embedType);

    /**
     * Set the timestamp if the timestamp parameter is true
     */
    if (timestamp) {
      this.setTimestamp();
    }
  }

  /**
   * Set the author of the embed
   * @param embedAuthor - Determines if the embed should have an author profile to display
   */
  private resolveAuthor(embedAuthor: EmbedAuthor): void {
    switch (embedAuthor) {
      case EmbedAuthor.None:
        break;
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
        throw new Error('Invalid embed author please use EmbedAuthor.None, EmbedAuthor.User or EmbedAuthor.Bot');
    }
  }

  /**
   * Set the type of the embed to set the footer text and color
   * @param embedType - Determines the footer text and color of the embed
   * @private
   */
  private resolveType(embedType: EmbedType): void {
    switch (embedType) {
      case EmbedType.Info:
        this.setColor(Colors.Aqua);
        this.setFooter({ text: EmbedType.Info });
        break;
      case EmbedType.Error:
        this.setColor(Colors.Red);
        this.setFooter({ text: EmbedType.Error });
        break;
      case EmbedType.Request:
        this.setColor(Colors.Gold);
        this.setFooter({ text: EmbedType.Request });
        break;
      case EmbedType.Response:
        this.setColor(Colors.Green);
        this.setFooter({ text: EmbedType.Response });
        break;
      default:
        throw new Error('Invalid embed type please use EmbedType.System, EmbedType.Error, EmbedType.Request or EmbedType.Response');
    }
  }
}
