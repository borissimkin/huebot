
export const getRandomSticker = (stickerPack: Object) => {
  const keys = Object.keys(stickerPack)

  return stickerPack[keys[getRandomInt(keys.length)]]
}



const getRandomInt = (max: number) => {
  return Math.floor(Math.random() * max);
}
