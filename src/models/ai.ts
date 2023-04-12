import {
  ChatCompletionRequestMessage,
  ChatCompletionResponseMessage,
  CreateImageRequestSizeEnum,
  ImagesResponse,
} from 'openai';

export interface AI {
  /**
   * Get the chat completion from the OpenAI API
   * @param chatHistory - Chat history to generate completion from
   */
  chatCompletion(chatHistory: ChatCompletionRequestMessage[]):
    Promise<ChatCompletionResponseMessage>;

  /**
   * Generate a variable quantity of images from the OpenAI API using DALL-E
   * @param prompt - Prompt to generate images from (e.g. "A photo of a")
   * @param quantity - Quantity of images to generate (e.g. 5) (max 10)
   * @param size - Size of the image (e.g. "512x512") (max "1024x1024")
   */
  createImage(prompt: string, quantity: number, size: CreateImageRequestSizeEnum):
    Promise<ImagesResponse>;
}
