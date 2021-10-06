import { Context, deunionize } from 'telegraf'
import { isHitToStatistics } from '@/helpers/isHitToStatistics'
import { POHUI_STICKERS } from '@/stickers/pohui'
import { getRandomSticker } from '@/helpers/getRandomSticker'
import { GACHI_STICKERS } from '@/stickers/gachimuchi'
import { CAT_STICKERS } from '@/stickers/cats'
import { actionWithBotTyping } from '@/helpers/actionWithBotTyping'
import { appealToUserUstrica } from '@/helpers/appealToUserUstrica'
import { OTHER_STICKERS } from '@/stickers/other'

type State = {
  statement: RegExp,
  handler: Function,
}

export const stateMachine: State[] = [
  {
    statement: /^да[.,!@?]?$/i,
    handler: (ctx: Context) => {
      if (isHitToStatistics(0.7)) {
        ctx.reply('пизда!', {reply_to_message_id: ctx.message.message_id})
      }
    }
  },
  {
    statement: /^нет[.,!@?]?$/i,
    handler: (ctx: Context) => {
      if (isHitToStatistics(0.7)) {
        ctx.reply('пидора ответ!', {reply_to_message_id: ctx.message.message_id})
      }
    }
  },
  {
    statement: /^похуй[.!]?$/i,
    handler: (ctx: Context) => {
      if (isHitToStatistics()) {
        ctx.reply('согласен', {reply_to_message_id: ctx.message.message_id})
      } else {
        ctx.replyWithSticker(getRandomSticker(POHUI_STICKERS))
      }
    }
  },
  {
    statement: /говори|скажи/i,
    handler: (ctx: Context) => {
      if (isHitToStatistics(0.3)) {
        ctx.replyWithSticker(GACHI_STICKERS.govori)
      }
    }
  },
  {
    statement: /^кк$/i,
    handler: (ctx) => ctx.replyWithSticker(CAT_STICKERS.tutb)
  },
  {
    statement: /пары/i,
    handler: async (ctx: Context) => {
      await actionWithBotTyping(ctx)
      ctx.reply(appealToUserUstrica('какие нахуй пары', ctx.message.from.id), {reply_to_message_id: ctx.message.message_id})
    }
  },
  {
    statement: /^🏀|🎰|🎯|🎲$/i,
    handler: (ctx: Context) => {
      if (isHitToStatistics(0.8)) {
        ctx.reply(deunionize(ctx.message).text)
      }
    }
  },
  {
    statement: /^пиздец[.!?]?$/i,
    handler: (ctx: Context) => {
      if (isHitToStatistics(0.8)) {
        if (isHitToStatistics()) {
          ctx.replyWithSticker(OTHER_STICKERS.pizdec)
        } else {
          ctx.reply('еще какой', {reply_to_message_id: ctx.message.message_id})
        }
      }
    }
  },
  {
    statement: /^заебись[.!?]?$/i,
    handler: (ctx: Context) => {
      if (isHitToStatistics(0.8)) {
        ctx.replyWithSticker(CAT_STICKERS.huinja)
      }
    }
  },
  {
    statement: /го в зал/i,
    handler: (ctx: Context) => ctx.replyWithSticker(GACHI_STICKERS.goVZal)
  },
  {
    statement: /^унижен[.!]?$/i,
    handler: (ctx: Context) => ctx.replyWithSticker(GACHI_STICKERS.unizhen)
  }
]
