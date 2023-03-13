import { ChatCompletionRequestMessage, ChatCompletionResponseMessage } from 'openai';

export interface AI {
  chatCompletion(chatHistory: ChatCompletionRequestMessage[]):
    Promise<ChatCompletionResponseMessage>;
}
