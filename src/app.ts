import 'module-alias/register'
import * as dotenv from 'dotenv'
dotenv.config({ path: `${__dirname}/../.env` })
import { bot } from '@/helpers/bot'
import { actionWithBotTyping } from '@/helpers/actionWithBotTyping'
import { leaveFromChat } from '@/handlers/leaveFromChat'
import { connectToChat } from '@/handlers/connectToChat'
/**
 * - обработать лив из чата - DONE
 * - обработать вход в чат (можно на жониса отдельно) - DONE
 * - если больше двух человек скинули стикеры кота, то тоже скинуть стикер кота
 * - обращение к боту = преобразование слова к "хуй ... " + добавить ключевые слова (например, если жорис - то отправить кота приемлимо)
 *  - (добавить очень редкое преобразование к рандомным сообщениям)
 * - на стикер "ты еблан?" отправлять "докажи" или "внатуре" можно по рандому
 * - на стикер dance жабы отправить dance жабу
 * - при обращении к боту в воскресенье отправлять стикер у меня выходной)
 * - на слово говори - отправить стикер ГОВОРИ!
 * **/

/**
 * Обработка слов:
 * похуй - (отправлять стикер с ваще похуй, или отправить согласен, ага,
 * иди нахуй (отправлять гачи мучи стикер с иди нахуй)
 *
 * **/

/**
 * На эмодзи казино, кубика, дартса, баскетбола кидать иногда тоже его
 * **/

bot.on('left_chat_member', (ctx) => leaveFromChat(ctx, ctx.message.left_chat_member))

bot.on('new_chat_members', (ctx) => connectToChat(ctx, ctx.message.new_chat_members))

bot.command('quit', (ctx) => {
    // Explicit usage
    // ctx.telegram.leaveChat(ctx.message.chat.id)

    // Using context shortcut
    ctx.leaveChat()
})

bot.on('sticker', (ctx) => {
    console.log(ctx.message.sticker.file_id)
    actionWithBotTyping(ctx, () => {
        ctx.replyWithSticker('CAACAgIAAxkBAAMWYVluGftGavvJ6YTyWfXWb-ygUFAAAooAA5f0xhTz-oPGjmOYNSEE')
    })
})

bot.hears('hi', (ctx) => ctx.reply('Hey there'))

bot.command('test', (ctx) => {
    ctx.reply('awdawdd')
})

bot.on('text', (ctx) => {
    // Explicit usage
    ctx.telegram.sendMessage(ctx.message.chat.id, `Hello ${ctx.state.role}`)
    // Using context shortcut
    ctx.reply(`Hello ${ctx.state.role}`)
})


bot.launch().then(() => {
    console.info(`Bot ${bot.botInfo.username} is up and running`)
})

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))
