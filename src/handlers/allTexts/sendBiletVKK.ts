import { Context } from 'telegraf'
const path = require('path')

export const sendBiletVKK = (ctx: Context) => {
  const path_ = path.join(process.cwd(), '/assets/bilet_v_kk.jpg')

  console.log({ path_ })

  ctx.replyWithPhoto({source: path_})
}
