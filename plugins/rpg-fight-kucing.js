
let handler = async (m, { conn, usedPrefix, participants }) => {

conn.level = global.db.data.users[m.sender]
  conn.fightcat = conn.fightcat ? conn.fightcat : {}
  const delay = time => new Promise(res=>setTimeout(res,time));

  if (typeof conn.fightcat[m.sender] != "undefined" && conn.fightcat[m.sender] == true) return m.reply(`*Tidak bisa melakukan battle karena arena yg kamu miliki sedang kamu pakai .*`)

  let users = participants.map(u => u.id)
  var lawan
	lawan = users[Math.floor(users.length * Math.random())]
  while (typeof global.db.data.users[lawan] == "undefined" || lawan == m.sender){
    lawan = users[Math.floor(users.length * Math.random())]
  }

  let lamaPertarungan = Acakin(8,20)

  m.reply(`*Pet Kamu* (🐱Kucing ${global.db.data.users[m.sender].cat}) menantang 🐈Kucingnya *${conn.getName(lawan)}* (🐱Kucing ${global.db.data.users[lawan].cat}) lagi kelahi rebutin bini.\n\nTunggu ${lamaPertarungan} menit lagi dan lihat siapa yg menang🎮.`)

  conn.fightcat[m.sender] = true

  await delay(1000 * 60 * lamaPertarungan)

  let alasanKalah = ['Naikin lagi levelnya😐','Cupu','Kurang hebat','Ampas Petnya','Pet gembel']
  let alasanMenang = ['Hebat','Pro','Ganas Pet','Legenda Pet','Sangat Pro','Rajin Ngasi Makan Pet']

  let kesempatan = []
  for (i=0;i<global.db.data.users[m.sender].cat;i++) kesempatan.push(m.sender)
  for (i=0;i<global.db.data.users[lawan].cat;i++) kesempatan.push(lawan)

  let pointPemain = 0
  let pointLawan = 0
  for (i=0;i<10;i++){
    unggul = Acakin(0,kesempatan.length-1)
    if (kesempatan[unggul] == m.sender) pointPemain += 1
    else pointLawan += 1
  }

  if (pointPemain > pointLawan){
    let hadiah = (pointPemain - pointLawan) * 20000
    global.db.data.users[m.sender].money += hadiah
    global.db.data.users[m.sender].tiketcoin += 1
    m.reply(`*${conn.getName(m.sender)}* [${pointPemain * 10}] - [${pointLawan * 10}] *${conn.getName(lawan)}*\n\n*Pet🐈Kamu* (Kucing ${global.db.data.users[m.sender].cat}) MENANG melawan 🐈Kucingnya *${conn.getName(lawan)}* (cat ${global.db.data.users[lawan].cat}) karena Kucing🐈kamu ${alasanMenang[Acakin(0,alasanMenang.length-1)]}\n\nHadiah Rp. ${hadiah.toLocaleString()}\n+1 Tiketcoin`)
  }else if (pointPemain < pointLawan){
    let denda = (pointLawan - pointPemain) * 100000
    global.db.data.users[m.sender].money -= denda
    global.db.data.users[m.sender].tiketcoin += 1
    m.reply(`*${conn.getName(m.sender)}* [${pointPemain * 10}] - [${pointLawan * 10}] *${conn.getName(lawan)}*\n\n*Pet🐈Kamu* (Kucing ${global.db.data.users[m.sender].cat}) KALAH melawan 🐈Kucingnya *${conn.getName(lawan)}* (cat ${global.db.data.users[lawan].cat}) karena pet kamu ${alasanKalah[Acakin(0,alasanKalah.length-1)]}\n\nUang kamu berkurang Rp. ${denda.toLocaleString()}\n+1 Tiketcoin`)
  }else {
    m.reply(`*${conn.getName(m.sender)}* [${pointPemain * 10}] - [${pointLawan * 10}] *${conn.getName(lawan)}*\n\nHasil imbang kak, ga dapet apa apa 😂`)
  }

  delete conn.fightcat[m.sender]
}
handler.help = ['fightcat']
handler.tags = ['game']
handler.command = /^(fightcat)$/i
handler.limit = true
handler.group = true

export default handler

function Acakin(min,max){
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random()*(max-min+1)) + min
}
