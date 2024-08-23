import fetch from 'node-fetch';

let handler = async (m, {
  conn,
  text,
  usedPrefix,
  command
}) => {
  if (command == 'bingimg') {
    if (!text) throw `Contoh: ${usedPrefix + command} anak berlari menggunakan pakaian merah 3d animation`;
    try {
      m.reply(wait)
      let response = await fetch('https://api.betabotz.eu.org/api/search/bing-img', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            text: text,
            apikey: lann
          })
        })
        .then(res => res.json());

      for (let i = 0; i < 4; i++) {
        let img = response.result[i]
        await sleep(3000)
        await conn.sendFile(m.chat, img, 'bing_img.png', `*PROMPT:* ${text}`, m)
      }
    } catch (error) {
      throw `Error: ${eror}`
    }
  }
}

handler.command = handler.help = ['bingimg']
handler.tags = ['internet']
handler.limit = true

async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export default handler;