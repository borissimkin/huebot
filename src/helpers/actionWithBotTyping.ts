import { Context } from 'telegraf'

export const actionWithBotTyping = (ctx: Context, callback: () => void, timeout = 500) => {
  ctx.replyWithChatAction('typing').then(() => {
    setTimeout(callback, timeout)
  })
}
