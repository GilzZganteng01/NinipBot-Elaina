
//import fetch from "node-fetch"
export async function before(m) {
    this.autosholat = this.autosholat ? this.autosholat : {}
    let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? this.user.jid : m.sender
    let id = m.chat
    if (id in this.autosholat) {
        return false
    }
    //let data = await (await fetch("https://www.jadwalsholat.org/adzan/monthly.php?id=307")).json();
    //let jadwalSholat = data.data.timings;
    let jadwalSholat = {
        Imsyak: "04:18",
        Subuh: "04:28",
        Terbit: "05:43",
        Dhuha: "06:07",
        Dzuhur: "11:43",
        Ashar: "15:04",
        Maghrib: "17:40",
        Isha: "18:51",
    }
    const date = new Date((new Date).toLocaleString("en-US", {
        timeZone: "Asia/Jakarta"
    }));
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const timeNow = `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;
    for (const [sholat, waktu] of Object.entries(jadwalSholat)) {
        if (timeNow === waktu) {
            let caption;
            if (sholat === 'Imsyak') {
                caption = `Hai kak @${who.split`@`[0]},\nWaktu *${sholat} telah tiba, segera minum dan selesaikan niat untuk berpuasa (bagi yang berpuasa) 🙂\n\n*${waktu}*\n_untuk wilayah Yogyakarta dan sekitarnya._`
            } else if (sholat === 'Terbit') {
                caption = `Hai kak @${who.split`@`[0]},\nWaktu *Terbit* telah tiba, mari kita berdoa dan memulai hari dengan penuh semangat! 🌟\n\n*${waktu}*\n_untuk wilayah Yogyakarta dan sekitarnya._`
            } else {
                caption = `Hai kak @${who.split`@`[0]},\nWaktu *${sholat}* telah tiba, ambilah air wudhu dan segeralah shalat 🙂.\n\n*${waktu}*\n_untuk wilayah Yogyakarta dan sekitarnya._`
            }
            this.autosholat[id] = [
                this.reply(m.chat, caption, null, {
    contextInfo: {
      mentionedJid: [who]
    }
  }),
                setTimeout(() => {
                    delete this.autosholat[id]
                }, 57000)
            ]
        }
    }
}
export const disabled = false
