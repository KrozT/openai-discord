import {
  ChatCompletionRequestMessage, ChatCompletionResponseMessage, Configuration, OpenAIApi,
} from 'openai';
import { AI } from '@/models/ai';
import { Runnable } from '@/models/runnable';
import { Logger } from '@/logger';

export class Api implements AI, Runnable {
  private _logger: Logger;

  private _api: OpenAIApi;

  private readonly _configuration: Configuration;

  constructor() {
    this._logger = new Logger(Api.name);

    this._configuration = new Configuration({
      apiKey: process.env.OPENAI_API_KEY,
    });

    this._api = new OpenAIApi(this._configuration);
  }

  run(): void {
    this._logger.service.info('OpenAI Service has been initialized successfully.');
  }

  async chatCompletion(chatHistory: ChatCompletionRequestMessage[])
    : Promise<ChatCompletionResponseMessage> {
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
