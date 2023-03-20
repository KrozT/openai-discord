import { ChatCompletionRequestMessage, ChatCompletionResponseMessage } from 'openai';

export interface AI {
  /**
   * Get the chat completion from the OpenAI API
   * @param chatHistory
   */
  chatCompletion(chatHistory: ChatCompletionRequestMessage[]):
    Promise<ChatCompletionResponseMessage>;
}
