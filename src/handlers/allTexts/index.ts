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

const isSunday = () => {
  return new Date().getDay() === 0
}

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
  if (!stateMachineWasUsed) {
    if (isHitToStatistics(0.1)) {
      await actionWithBotTyping(ctx, 300)
      ctx.reply(processLineToHuiWords(text), {reply_to_message_id: ctx.message.message_id})
    }
  }
}

const handlerAddressingBotText = (ctx: Context, text: string) => {
  if (/жорис|жоримс/i.test(text)) {
    return ctx.replyWithSticker(getCatPriemlimo())
  }
  if (isSunday()) {
    return ctx.replyWithSticker(CAT_STICKERS.weekend)
  }
  const clearedText = removeBotNameFromText(ctx.botInfo.username, text)
  if (!clearedText.replace(' ', '')) {
    return ctx.replyWithSticker(GACHI_STICKERS.oshibsaDveriu)
  }

  const processedText = processLineToHuiWords(clearedText)

  ctx.reply(processedText)
}

