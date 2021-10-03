import { CAT_STICKERS } from '@/stickers/cats'
import { isHitToStatistics } from '@/helpers/isHitToStatistics'

export const getCatPriemlimo = () => {
  return isHitToStatistics() ?
    CAT_STICKERS.priemlimo :
    CAT_STICKERS.priemlimoWithBackground
}
