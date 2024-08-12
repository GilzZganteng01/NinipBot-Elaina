import moment from 'moment-timezone'
let handler = m => m

handler.before = async function(m, {
    conn,
    isROwner,
    isPrems
}) {

    if (m.chat.endsWith('broadcast')) return
    if (m.fromMe) return
    if (m.isGroup) return
    let user = global.db.data.users[m.sender]
    let username = conn.getName(m.sender)
    
    if (new Date - user.pc < 86400000) return

    let pesan = `Hai ${ucapan()} *${username.replace(/@.+/, '')}* 👋
${user.banned ? `📢 Kamu tidak dapat mengakses fitur ❗\nBeli premium untuk dapat mengakses Bot di PC\nowner: wa.me/${global.nomerown}\n${global.wm}` : `Ada yang bisa ${global.namebot} bantu?`}`

    await m.reply(pesan)
    user.pc = new Date * 1
}

export default handler

function ucapan() {
    const hour_now = moment.tz('Asia/Jakarta').format('HH')
    var ucapanWaktu = 'Pagi kak'
    if (hour_now >= '03' && hour_now <= '10') {
        ucapanWaktu = 'Pagi kak'
    } else if (hour_now >= '10' && hour_now <= '15') {
        ucapanWaktu = 'Siang kak'
    } else if (hour_now >= '15' && hour_now <= '17') {
        ucapanWaktu = 'Sore kak'
    } else if (hour_now >= '17' && hour_now <= '18') {
        ucapanWaktu = 'Selamat Petang kak'
    } else if (hour_now >= '18' && hour_now <= '23') {
        ucapanWaktu = 'Malam kak'
    } else {
        ucapanWaktu = 'Selamat Malam!'
    }
    return ucapanWaktu
}