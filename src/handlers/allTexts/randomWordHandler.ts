import { isHitToStatistics } from '@/helpers/isHitToStatistics'
import { actionWithBotTyping } from '@/helpers/actionWithBotTyping'
import { processLineToHuiWords } from '@/wordHuiConversion/processLine'
import { Context } from 'telegraf'
import { OTHER_STICKERS } from '@/stickers/other'
import { getRandomInt } from '@/helpers/getRandomSticker'

const someStickers = [
  OTHER_STICKERS.sukaAgainYou,
  OTHER_STICKERS.osuzhdausheSmotryu,

]

const processedRandomMessage = async (ctx: Context, text: string) => {
  await actionWithBotTyping(ctx, 300)
  ctx.reply(processLineToHuiWords(text), {reply_to_message_id: ctx.message.message_id})
}

export const randomWordHandler = (ctx: Context, text: string) => {
  if (!isHitToStatistics(0.1)) {
    return
  }

  if (isHitToStatistics(0.5)) {
    processedRandomMessage(ctx, text)
    return
  }

  ctx.replyWithSticker(someStickers[getRandomInt(someStickers.length)], {reply_to_message_id: ctx.message.message_id})
}
