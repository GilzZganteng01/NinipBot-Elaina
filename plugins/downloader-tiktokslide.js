import fetch from 'node-fetch';

let handler = async (m, {
  conn,
  text,
  usedPrefix,
  command
}) => {
  if (command == 'tiktokslide' || command == 'ttslide') { 
    if (!text) throw `Masukkan URL!`;
    try {
      const api = await fetch(`https://api.betabotz.eu.org/api/download/ttslide?url=${text}&apikey=${lann}`);
      const res = await api.json();
      for (let i of res.result.images) {
        await sleep(3000);
        conn.sendMessage(m.chat,{ image :{ url : i } , caption : `*Title*: ${res.result.title}` }, { quoted: m });
        //await sleep(5000);
        //conn.sendMessage(m.chat, { audio: { url: res.result.audio[0] }, mimetype: 'audio/mpeg' }, { quoted: m });         
      }
    } catch (e) {
      console.log(e);
      throw `🚩 *Terjadi kesalahan!*`;
    }
  }
};

handler.command = [ttslide|tiktokslide]
handler.help = ['tiktokslide'];
handler.tags = ['downloader'];
handler.limit = true;

async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export default handler;