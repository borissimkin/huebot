import { Context } from 'telegraf'
import { actionWithBotTyping } from '@/helpers/actionWithBotTyping'
import { messages } from '@/handlers/connectToChat/messages'
import { isBot, isJonis } from '@/helpers/recognizeUserUstrica'
import { User } from 'telegraf/typings/core/types/typegram'

export const connectToChat = async (ctx: Context, newChatMembers: User[]) => {
  const newUser = newChatMembers.pop()

  const message = isJonis(newUser.id) ? messages.connectJonis : messages.connect

  await actionWithBotTyping(ctx, 1000)
  await ctx.reply(message)

  if (isBot(newUser.id, ctx.botInfo)) {
    await actionWithBotTyping(ctx, 2000)
    await ctx.reply(messages.connectBot)
  }
}
