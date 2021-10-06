import { Context } from 'telegraf'

export const actionWithBotTyping = (ctx: Context, timeout = 500) => {
  return ctx.replyWithChatAction('typing').then(() => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(ctx)
      }, timeout)
    })
  })
}
