import { Context } from 'telegraf'
import { actionWithBotTyping } from '@/helpers/actionWithBotTyping'
import { messages } from '@/handlers/connectToChat/messages'
import { isJonis } from '@/helpers/recognizeUserUstrica'
import { User } from 'telegraf/typings/core/types/typegram'

export const connectToChat = (ctx: Context, newChatMembers: User[]) => {
  const newUser = newChatMembers.pop()

  const message = isJonis(newUser.id) ? messages.connectJonis : messages.connect

  actionWithBotTyping(ctx, () => ctx.reply(message))
}
