
let handler = async(m, { conn, usedPrefix, command }) => {

  let don = `
❏──「 *Donasi* 」
│ • Seikhlasnya:v 
│ • Terimakasih Yang Sudah Donasi <3
❏──────────────๑

*© 2024 NinipBot ™*
`
let img = 'https://telegra.ph/file/5b2401c227e4d95da7b75.jpg'
conn.sendFile(m.chat, img, 'img.jpg', don, m, null)
//conn.sendPayment(m.chat, '2000', 'USD', don, m.sender, m)
}

handler.help = ['donasi']
handler.tags = ['main']
handler.command = ['donasi', 'donate'] 

export default handler

