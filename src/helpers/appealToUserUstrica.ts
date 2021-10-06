import { isJonis, isJoris, isJuban } from '@/helpers/recognizeUserUstrica'

export const appealToUserUstrica = (text: string, telegramId: number | undefined) => {
  if (!telegramId) {
    return text
  }
  const appealName = getNameUserUstrica(telegramId)
  return appealName ? `${text}, ${appealName}?` : text
}

const getNameUserUstrica = (telegramId: number) => {
  if (isJonis(telegramId)) {
    return 'жонис'
  } else if (isJoris(telegramId)) {
    return 'жорис'
  } else if (isJuban(telegramId)) {
    return 'жубан'
  }
  return ''
}
