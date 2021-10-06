import { Context } from 'telegraf'
import { actionWithBotTyping } from '@/helpers/actionWithBotTyping'
import { messages } from '@/handlers/leaveFromChat/messages'
import { getCatPriemlimo } from '@/helpers/getCatPriemlimo'
import { isBot, isJonis } from '@/helpers/recognizeUserUstrica'
import { GACHI_STICKERS } from '@/stickers/gachimuchi'
import { User } from 'telegraf/typings/core/types/typegram'

export const leaveFromChat = async (ctx: Context, leftChatMember: User) => {
  if (isBot(leftChatMember.id, ctx.botInfo)) {
    return
  }

  const isJonis_ = isJonis(leftChatMember.id)

  const message = isJonis_ ? messages.leaveFromChatJonis : messages.leaveFromChat

  const sticker = isJonis_ ? getCatPriemlimo() : GACHI_STICKERS.idiNahui

  await actionWithBotTyping(ctx)
  await ctx.reply(message)

  await ctx.replyWithSticker(sticker)
}
