import { getHuiWord } from '@/wordHuiConversion/processWord'

export const processLineToHuiWords = (line: string): string => {
  const lineWords = line.split(' ')

  return lineWords.map(word => getHuiWord(word)).join(' ')
}
