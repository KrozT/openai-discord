import dotenv from 'dotenv';
import { Bot } from '@/bot';
import { Api } from '@/api';

/**
 * Configure dotenv.
 */
dotenv.config();

/**
 * OpenAI contained in API Module.
 */
const api = new Api();
api.run();

/**
 * Discord contained in Bot Module.
 */
const bot = new Bot(api);
bot.run();
