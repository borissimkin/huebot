type Vowel = {
  char: string,
  replace: string
}

type Char = {
  index: number,
  vowel: Vowel
}


const vowels: Vowel[] = [
  {
    char: 'о',
    replace: 'ё'
  },
  {
    char: 'е',
    replace: 'е',
  },
  {
    char: 'а',
    replace: 'я'
  },
  {
    char: 'ю',
    replace: 'ю'
  },
  {
    char: 'э',
    replace: 'е'
  },
  {
    char: 'у',
    replace: "ю"
  },
  {
    char: 'я',
    replace: 'я'
  },
  {
    char: 'и',
    replace: 'и'
  },
  {
    char: 'ы',
    replace: 'и'
  },
  {
    char: 'ё',
    replace: 'ё'
  }
]

export const getHuiWord = (word: string) => {
  if (!word || word === " ") {
    return ""
  }
  const word_ = word.toLowerCase()
  const chars = word_.split('');
  const foundChars: Char[] = []
  vowels.forEach((vowel) => {
    const index = chars.findIndex(value => value === vowel.char)
    if (index > -1) {
      foundChars.push({
        index,
        vowel
      })
    }
  })
  foundChars.sort((a, b) => {
    return a.index > b.index ? 1 : -1
  })
  if (foundChars.length) {
    const foundChar = foundChars[0]
    return `ху${foundChar.vowel.replace}${word.slice(foundChar.index+1)}`
  }
  return `хуй${word}`
}
