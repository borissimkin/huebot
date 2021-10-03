import { config } from '@/config'

export const isJonis = (telegramId: number) => {
  return telegramId === config.jonisTelegramId
}

export const isJoris = (telegramId: number) => {
  return telegramId === config.jorisTelegramId

}

export const isJuban = (telegramId: number) => {
  return telegramId === config.jubanTelegramId
}
