export const isAddressingToBot = (botUserName: string, text: string) => {
  return text.includes(appealToBot(botUserName))
}

export const appealToBot = (botUserName) => {
  return `@${botUserName}`
}
