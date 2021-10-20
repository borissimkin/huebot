import { Context } from 'telegraf'
import { isAddressingToBot } from '@/helpers/isAddressingToBot'
import { processLineToHuiWords } from '@/wordHuiConversion/processLine'
import { actionWithBotTyping } from '@/helpers/actionWithBotTyping'
import { getCatPriemlimo } from '@/helpers/getCatPriemlimo'
import { CAT_STICKERS } from '@/stickers/cats'
import { stateMachine } from '@/handlers/allTexts/stateMachine'
import { isHitToStatistics } from '@/helpers/isHitToStatistics'
import { removeBotNameFromText } from '@/helpers/removeBotNameFromText'
import { GACHI_STICKERS } from '@/stickers/gachimuchi'
import { randomWordHandler } from '@/handlers/allTexts/randomWordHandler'
import { OTHER_STICKERS } from '@/stickers/other'
import { getRandomInt } from '@/helpers/getRandomSticker'

const isSunday = () => {
  return new Date().getDay() === 0
}

const someStickersAppealToBot = [
  OTHER_STICKERS.sukaAgainYou,
  OTHER_STICKERS.shaUebu
]

const runStateMachine = (ctx: Context, text: string) => {
  for (const state of stateMachine) {
    if (state.statement.test(text)) {
      state.handler(ctx)
      return true
    }
  }
  return false
}

export const allTextsHandler = async (ctx: Context, text: string) => {
  if (isAddressingToBot(ctx.botInfo.username, text)) {
    return handlerAddressingBotText(ctx, text)
  }
  const stateMachineWasUsed = runStateMachine(ctx, text)
  if (stateMachineWasUsed) {
    return
  }
  randomWordHandler(ctx, text)
}

const handlerAddressingBotText = (ctx: Context, text: string) => {
  if (/жорис|жоримс|борис|жорим/i.test(text)) {
    return ctx.replyWithSticker(getCatPriemlimo())
  }

  if (isSunday()) {
    return ctx.replyWithSticker(CAT_STICKERS.weekend)
  }

  if (isHitToStatistics(0.1)) {
    ctx.replyWithSticker(
      someStickersAppealToBot[getRandomInt(someStickersAppealToBot.length)],
      {reply_to_message_id: ctx.message.message_id}
    )
    return
  }

  const clearedText = removeBotNameFromText(ctx.botInfo.username, text)

  if (!clearedText.replace(' ', '')) {
    return ctx.replyWithSticker(GACHI_STICKERS.oshibsaDveriu)
  }

  const processedText = processLineToHuiWords(clearedText)

  ctx.reply(processedText)
}

