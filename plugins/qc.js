import { sticker } from '../lib/sticker.js';
import uploadFile from '../lib/uploadFile.js';

const handler = async (m, { conn, text, args }) => {
  var pp = 'https://i.ibb.co/2WzLyGk/profile.jpg'
  if (!args[0] && !m.quoted)
    return m.reply(`Please provide a text (Type or mention a message) !`)
  if (m.quoted && !text) {
    try {
      userPfp = await conn.profilePictureUrl(m.sender, "image");
    } catch (e) {
      userPfp = pp;
    }
  } else {
    try {
      userpp = await conn.profilePictureUrl(m.sender, "image");
    } catch (e) {
      userp = pp;
    }
  }
  var trimtext = text.length > 50 ? text.substring(0, 50 - 3) + "..." : text,
    trimqtext
  if (m.quoted && m.quoted.text) {
    trimqtext = m.quoted.text.length > 50 ? m.quoted.text.substring(0, 50 - 3) + "..." : m.quoted.text
  }
  var q = m.quoted ? m.quoted : m
  var mime = (q.msg || q).mimetype || q.mediaType || ''
  var media, img
  if (/image/.test(mime)) {
    img = await q.download?.()
    if (img) media = await uploadFile(img)
  }
  var tkw = !trimtext && m.quoted && m.quoted.text ? trimqtext : trimtext
  var qwe = trimtext && m.quoted && m.quoted.text ? {
    qname: m.quoted.name,
    qtext: trimqtext
  } : {}
  try {
    var json = await axios.get(API('xzn', 'api/qc', {
      text: tkw,
      username: !trimtext && m.quoted ? m.quoted.name : m.name,
      avatar: await uploadFile(await getbuffer(userPfp)),
      ...(media ? {
        "media": media
      } : {}),
      ...qwe
    }, 'apikey'), {
      responseType: "arraybuffer"
    })
    var stiker = await sticker(json.data, global.packname, global.author)
    if (stiker) return conn.sendFile(m.chat, stiker, 'Quotly.webp', '', m)
  } catch (e) {
    log({
      e
    })
    return e.toString()
  }
}

handler.help = ['quotly']
handler.tags = ['sticker']
handler.command = /^(qc|quoted|quotly)$/i

export default handler