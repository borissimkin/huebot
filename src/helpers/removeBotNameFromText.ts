import { appealToBot } from '@/helpers/isAddressingToBot'

export const removeBotNameFromText = (botName: string, text: string) => {
  return text.replace(appealToBot(botName), '');
}
