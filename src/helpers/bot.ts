import {Telegraf} from "telegraf";

const token = process.env.BOT_TOKEN

if (token === undefined) {
  throw new Error('BOT_TOKEN must be provided!')
}

export const bot = new Telegraf(process.env.BOT_TOKEN)
