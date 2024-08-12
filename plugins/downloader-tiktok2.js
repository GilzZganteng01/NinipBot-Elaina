import fetch from 'node-fetch'

let handler = async (m, { conn, usedPrefix, args, command, text }) => {
if (!text) throw `Linknya Mana?`
m.reply(wait)
try {
let anu = await fetch(`https://ssa-api.vercel.app/api/tiktok?url=${text}`)
let result = await anu.json()
await conn.sendFile(m.chat, result.data.response.nowm, 'anu.mp4', `*Description:* ${result.data.response.title}`, m)
conn.sendFile(m.chat, result.data.response.audio, 'anu.mp3', null, m)
} catch (e) {
conn.sendFile(m.chat, eror, "anu.mp3", null, m, true, {
		type: "audioMessage",
		ptt: true,
	})
}
}
handler.help = ['tiktok']
handler.tags = ['downloader']
handler.command = /^(tiktok|tt|ttdl|tiktokdl)$/i
handler.limit = true

export default handler