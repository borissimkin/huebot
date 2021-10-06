import 'module-alias/register'
import * as dotenv from 'dotenv'
dotenv.config({ path: `${__dirname}/../.env` })
import { bot } from '@/helpers/bot'
import { leaveFromChat } from '@/handlers/leaveFromChat'
import { connectToChat } from '@/handlers/connectToChat'
import { allTextsHandler } from '@/handlers/allTexts'

/**
 *  - (добавить очень редкое преобразование к рандомным сообщениям)
 * **/

bot.on('left_chat_member', (ctx) => leaveFromChat(ctx, ctx.message.left_chat_member))

bot.on('new_chat_members', (ctx) => connectToChat(ctx, ctx.message.new_chat_members))

bot.on('text', (ctx) => allTextsHandler(ctx, ctx.message.text))

// узнать айди стикера
bot.on('sticker', (ctx) => {
    console.log(ctx.message.sticker.file_id)
})

bot.launch().then(() => {
    console.info(`Bot ${bot.botInfo.username} is up and running`)
})

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))
