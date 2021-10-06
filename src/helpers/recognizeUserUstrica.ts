import { config } from '@/config'
import { UserFromGetMe } from 'telegraf/typings/core/types/typegram'

export const isJonis = (telegramId: number) => {
  return telegramId === config.jonisTelegramId
}

export const isJoris = (telegramId: number) => {
  return telegramId === config.jorisTelegramId
}

export const isJuban = (telegramId: number) => {
  return telegramId === config.jubanTelegramId
}

export const isBot = (telegramId: number, botInfo: UserFromGetMe) => {
  return telegramId === botInfo.id
}
