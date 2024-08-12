
//import fetch from "node-fetch"
export async function before(m) {
    this.automakan = this.automakan ? this.automakan : {}
    let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? this.user.jid : m.sender
    let id = m.chat
    if (id in this.automakan) {
        return false
    }
    //let data = await (await fetch("https://api.aladhan.com/v1/timingsByCity?city=Makassar&country=Indonesia&method=8")).json();
    //let jadwalmakan = data.data.timings;
    let jadwalMakan = {
      Sarapan: "06:15",
      Cemilan: "10:00",
      Siang: "13:00",
      Malam: "18:00",
    }
    const date = new Date((new Date).toLocaleString("en-US", {
        timeZone: "Asia/Jakarta"
    }));
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const timeNow = `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;
    for (const [makan, waktu] of Object.entries(jadwalMakan)) {
        if (timeNow === waktu) {
            let caption;
            if (makan === 'Sarapan') {
                caption = `Halo kak @${who.split`@`[0]},\nWaktu Sarapan telah tiba! Isi piringmu dengan karbohidrat dari nasi, protein dari telur atau tempe, serat dari sayuran, dan jangan lupa vitamin dan juga air. Tubuhmu butuh nutrisi lengkap untuk beraktivitas! 🙂.\n`
            } else if (makan === 'Cemilan') {
                caption = `Halo kak @${who.split`@`[0]},\nWaktu Cemilan telah tiba! Pilihlah jajanan yang ringan dan seimbang, seperti buah atau kacang-kacangan. Jangan lupa minum air untuk menjaga hidrasi tubuhmu! 🙂.\n`
            } else if (makan === 'Siang') {
                caption = `Halo kak @${who.split`@`[0]},\nWaktu Makan Siang telah tiba! Bawa bekal dari rumah atau beli sendiri? Apabila beli sendiri pastikan untuk memilih makanan yang seimbang dan bergizi. Jangan lupa minum air untuk menjaga hidrasi tubuhmu! 🙂.\n`
            } else if (makan === 'Malam') {
                caption = `Halo kak @${who.split`@`[0]},\nWaktu Makan Malam telah tiba! Isi piringmu dengan makanan yang seimbang dan bergizi, dan jangan lupa minum air untuk menjaga hidrasi tubuhmu. Persiapkan dirimu untuk tidur yang nyenyak! 🙂.\n`
            }
            this.automakan[id] = [
                this.reply(m.chat, caption, null, {
    contextInfo: {
      mentionedJid: [who]
    }
  }),
                setTimeout(() => {
                    delete this.automakan[id]
                }, 57000)
            ]
        }
    }
}
export const disabled = false
