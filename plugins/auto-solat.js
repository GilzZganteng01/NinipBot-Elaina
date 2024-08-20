export async function before(m) {
    this.autosholat = this.autosholat || {};
    const who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? this.user.jid : m.sender;
    const id = m.chat;
  
    if (id in this.autosholat && this.autosholat[id].sent) {
      return false;
    }
  
    const jadwalSholat = {
      Imsyak: "04:18",
      Subuh: "04:28-05:00",
      Terbit: "05:43",
      Dhuha: "06:07-7:37",
      Dzuhur: "11:43-12:41",
      Ashar: "15:04-16:02",
      Maghrib: "17:40-18:38",
      Isha: "18:51-19:59",
    };
  
    const date = new Date();
    const timezoneOffset = date.getTimezoneOffset() * 60000; // in milliseconds
    const indonesiaTime = new Date(date.getTime() + timezoneOffset + 7 * 60 * 60 * 1000); // add 7 hours for Jakarta time
    const hours = indonesiaTime.getHours();
    const minutes = indonesiaTime.getMinutes();
    const timeNow = `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;
  
    for (const [sholat, waktu] of Object.entries(jadwalSholat)) {
      const waktuParts = waktu.split("-");
      const startTime = waktuParts[0];
      const endTime = waktuParts[1] || startTime;
  
      const startTimeHours = parseInt(startTime.split(":")[0]);
      const startTimeMinutes = parseInt(startTime.split(":")[1]);
      const endTimeHours = parseInt(endTime.split(":")[0]);
      const endTimeMinutes = parseInt(endTime.split(":")[1]);
  
      const timeNowHours = parseInt(timeNow.split(":")[0]);
      const timeNowMinutes = parseInt(timeNow.split(":")[1]);
  
      const timeNowTotalMinutes = timeNowHours * 60 + timeNowMinutes;
      const startTimeTotalMinutes = startTimeHours * 60 + startTimeMinutes;
      const endTimeTotalMinutes = endTimeHours * 60 + endTimeMinutes;
  
      if (timeNowTotalMinutes >= startTimeTotalMinutes && timeNowTotalMinutes <= endTimeTotalMinutes) {
        let caption;
        switch (sholat) {
          case 'Imsyak':
            caption = `Hai kak @${who.split`@`[0]},\nWaktu *${sholat} telah tiba, segera minum dan selesaikan niat untuk berpuasa (bagi yang berpuasa) 🙂\n\n*${waktu}*\n_untuk wilayah Yogyakarta dan sekitarnya._`;
            break;
          case 'Terbit':
            caption = `Hai kak @${who.split`@`[0]},\nWaktu *Terbit* telah tiba, mari kita berdoa dan memulai hari dengan penuh semangat! 🌟\n\n*${waktu}*\n_untuk wilayah Yogyakarta dan sekitarnya._`;
            break;
          default:
            caption = `Hai kak @${who.split`@`[0]}, Sudah Sholat Belum??\n\nWaktu *${sholat}* telah tiba, ambilah air wudhu dan segeralah shalat sebelum waktunya habis 🙂.\n\n*${waktu}*\n_untuk wilayah Yogyakarta dan sekitarnya._`;
        }
  
        if (!this.autosholat[id] || !this.autosholat[id].sent || this.autosholat[id].timeout) {
          this.autosholat[id] = {
            sent: true,
            timeout: setTimeout(() => {
              delete this.autosholat[id];
            }, 60000) // 1 minute timeout
          };
  
          this.reply(m.chat, caption, null, {
            contextInfo: {
              mentionedJid: [who]
            }
          });
        }
      }
    }
  }
  
  export const disabled = false;