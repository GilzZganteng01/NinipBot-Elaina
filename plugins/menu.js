import fetch from 'node-fetch'
const {
    proto,
    generateWAMessageFromContent,
    prepareWAMessageMedia
  } = (await import('@adiwajshing/baileys')).default
import { googleImage } from '@bochilteam/scraper'
var handler = async (m, { conn, usedPrefix, command }) => {
    if (!command) throw `menu`
    try {
let msgs = generateWAMessageFromContent(m.chat, {
  viewOnceMessage: {
    message: {
        "messageContextInfo": {
          "deviceListMetadata": {},
          "deviceListMetadataVersion": 2
        },
        interactiveMessage: proto.Message.InteractiveMessage.create({
          body: proto.Message.InteractiveMessage.Body.create({
            text: "ʜᴀɪ ɴᴀᴍᴀ ꜱᴀyᴀ ᴀᴅᴀʟᴀʜ 𝘕𝘪𝘯𝘪𝘱𝘉𝘰𝘵 × 𝘌𝘭𝘢𝘪𝘯𝘢-𝘔𝘋\n\nʙᴏᴛ ɪɴɪ ᴅᴀᴘᴀᴛ ᴅɪɢᴜɴᴀᴋᴀɴ sᴇʙᴀɢᴀɪ *ᴇᴅᴜᴋᴀsɪ ᴘᴇʟᴀᴊᴀʀᴀɴ*, *ᴜɴᴅᴜʜᴀɴ ᴍᴇᴅɪᴀ*, *ɢᴀᴍᴇ*, *ᴘᴇɴᴊᴀɢᴀ ɢʀᴜᴘ*, *ᴅᴀɴ ʟᴀɪɴɴʏᴀ* ʏᴀɴɢ ᴅᴀᴘᴀᴛ ᴍᴇᴍʙᴜᴀᴛ ᴋᴀᴍᴜ ʟᴇʙɪʜ ᴍᴜᴅᴀʜ ᴜɴᴛᴜᴋ ᴍᴇɴᴊᴀʟᴀɴɪ ʜᴀʀɪ-ʜᴀʀɪ"
          }),
          footer: proto.Message.InteractiveMessage.Footer.create({
            text: wm
          }),
          header: proto.Message.InteractiveMessage.Header.create({
          hasMediaAttachment: false,
          ...await prepareWAMessageMedia({ image: { url: "https://telegra.ph/file/8345a7d4161c3eb472a39.jpg" } }, { upload: conn.waUploadToServer })
          }),
          nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({
            buttons: [
            {
                "name": "quick_reply",
                "buttonParamsJson": "{\"display_text\":\"Tampilkan Semua Menu\",\"id\":\".allmenu\"}"
              }, 
{
                "name": "quick_reply",
                "buttonParamsJson": "{\"display_text\":\"Script Nya\",\"id\":\".sc\"}"
              }, 
              {
                "name": "quick_reply",
                "buttonParamsJson": "{\"display_text\":\"Pemilik Bot Ini\",\"id\":\".owner\"}"
              },
                            {
                "name": "quick_reply",
                "buttonParamsJson": "{\"display_text\":\"Credit\",\"id\":\".tqto\"}"
              },                         
            ],
          })
       })
    }
  }
}, { quoted: m })

return await conn.relayMessage(m.chat, msgs.message, {})
} catch (e) {
conn.sendFile(m.chat, eror, "anu.mp3", null, m, true, {
		type: "audioMessage",
		ptt: true,
	})
}}
handler.help = ['menu']
handler.tags = ['menu']
handler.command = /^(menu|help|bot)$/i
handler.limit = false
handler.register = true

export default handler