import { Context } from 'telegraf'
import { actionWithBotTyping } from '@/helpers/actionWithBotTyping'
import { messages } from '@/handlers/leaveFromChat/messages'
import { getCatPriemlimo } from '@/helpers/getCatPriemlimo'
import { isJonis } from '@/helpers/recognizeUserUstrica'
import { GACHI_STICKERS } from '@/stickers/gachimuchi'

export const leaveFromChat = (ctx: Context, leftChatMember) => {
  const isJonis_ = isJonis(leftChatMember.id)

  const message = isJonis_ ? messages.leaveFromChatJonis : messages.leaveFromChat

  const sticker = isJonis_ ? getCatPriemlimo() : GACHI_STICKERS.idiNahui

  actionWithBotTyping(ctx, async () => {
    await ctx.reply(message)
    await ctx.replyWithSticker(sticker)
  })
}
