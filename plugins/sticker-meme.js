import uploadImage from '../lib/uploadImage.js'
import { sticker } from '../lib/sticker.js'

let handler = async (m, { conn, text, usedPrefix, command }) => {
    let [atas, bawah] = text.split('|')
    let q = m.quoted ? m.quoted : m
    let mime = (q.msg || q).mimetype || ''
    
    if (!mime) throw `balas gambar dengan perintah\n\n${usedPrefix + command} <${bawah ? bawah : 'teks bawah'}>|<${atas ? atas : 'atas'}>\n${usedPrefix + command} <|${atas ? atas : 'teks atas'}>\n${usedPrefix + command} <${bawah ? bawah : 'teks bawah'}>`
    
    let img = await q.download()
    let url = await uploadImage(img)
    
    if (!atas && bawah) {
        atas = ' '
    }
    
    let meme = `https://api.memegen.link/images/custom/${encodeURIComponent(bawah ? bawah : '')}/${encodeURIComponent(atas ? atas : '')}.png?background=${url}`
    
    let stiker = await sticker(false, meme, global.author, global.packname)
    if (stiker) await conn.sendFile(m.chat, stiker, '', author, m, '', { asSticker: 1 })
}

handler.help = ['smeme <teks bawah>|<teks atas>']
handler.tags = ['tools']
handler.command = /^(smeme)$/i

export default handler
