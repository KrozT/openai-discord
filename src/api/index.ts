import {
  ChatCompletionRequestMessage, ChatCompletionResponseMessage, Configuration, OpenAIApi,
} from 'openai';
import process from 'process';
import { AI } from '@/models/ai';
import { Runnable } from '@/models/runnable';
import { Logger } from '@/logger';

export class Api implements AI, Runnable {
  /**
   * Logger instance
   * @private
   */
  private _logger: Logger;

  /**
   * OpenAI API instance
   * @private
   */
  private _api!: OpenAIApi;

  /**
   * OpenAI API configuration
   * @private
   */
  private readonly _configuration: Configuration;

  /**
   * Create API instance
   */
  constructor() {
    this._logger = new Logger(Api.name);

    /**
     * Create OpenAI API configuration with API key
     */
    this._configuration = new Configuration({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }

  /**
   * Initialize OpenAI API service
   */
  run(): void {
    try {
      this._api = new OpenAIApi(this._configuration); // Create API instance
      this._logger.service.info('OpenAI Service has been initialized successfully.'); // Log service initialization
    } catch (error) {
      this._logger.service.error(`Failed to start OpenAI Service: ${error}`); // Log service initialization error
      process.exit(1); // Exit process
    }
  }

  /**
   * Get the chat completion from the OpenAI API
   * @param chatHistory
   */
  async chatCompletion(chatHistory: ChatCompletionRequestMessage[])
    : Promise<ChatCompletionResponseMessage> {
    /**
     * Create chat completion request and return response or throw error
     */
    const request = await this._api.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: chatHistory,
    }).then((response) => response.data.choices[0].message)
      .catch((error: Error) => {
        this._logger.service.error(error.message);
        throw error;
      });

    return (request as ChatCompletionResponseMessage);
  }
}
