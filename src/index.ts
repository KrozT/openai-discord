import dotenv from 'dotenv';
import { Bot } from '@/bot';
import { Api } from '@/api';

/**
 * Load environment variables from .env file
 */
dotenv.config();

/**
 * OpenAI contained in Api Module.
 */
const api = new Api();
api.run();

/**
 * Discord contained in Bot Module.
 */
const bot = new Bot(api);
bot.run();
