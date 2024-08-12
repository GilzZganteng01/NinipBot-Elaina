
//import fetch from "node-fetch"
export async function before(m) {
    this.autosholat = this.autosholat ? this.autosholat : {}
    let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? this.user.jid : m.sender
    let id = m.chat
    if (id in this.autosholat) {
        return false
    }
    //let data = await (await fetch("https://api.aladhan.com/v1/timingsByCity?city=Makassar&country=Indonesia&method=8")).json();
    //let jadwalSholat = data.data.timings;
    let jadwalSholat = {
        Imsyak: "04:23",
        Subuh: "04:33",
        Terbit: "05:51",
        Dhuha: "06:15",
        Dzuhur: "11:47",
        Ashar: "15:08",
        Maghrib: "17:39",
        Isha: "18:53",
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
