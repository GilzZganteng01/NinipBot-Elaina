let handler  = async (m, { conn, usedPrefix: _p }) => {
let info = `
     bjir tobat bro🗿!
`.trim()

conn.fakeReply(m.chat, info, '0@s.whatsapp.net', 'bro caught in 4k', 'status@broadcast')
}
handler.help = ['bokepfree']
handler.tags = ['asupan']
handler.command = /^(bokepfree)$/i
export default handler 